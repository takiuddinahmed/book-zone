import { PublicRoute } from "../parent/public-route.component";
import { trpc } from "../lib/trpc";
import { useEffect, useState } from "react";
import { ICategory } from "backend/src/category/category.model";
import { IBook } from "backend/src/book";
import { CategoryWithBook } from "./category-with-book.component";

export interface CategoryWiseBook {
  category: ICategory;
  books: IBook[];
}

export function Homepage() {
  const bookListQuery = trpc.book.get.useQuery({});

  const [categoryWiseBookList, setCategoryWiseBookList] = useState<
    CategoryWiseBook[]
  >([]);

  useEffect(() => {
    if (bookListQuery.data) {
      const list: CategoryWiseBook[] = (bookListQuery.data as IBook[]).reduce(
        (prev: CategoryWiseBook[], book) => {
          // check if category exist
          const exist = prev.find((b) => b.category._id === book.categoryId);
          if (exist) {
            // if exist then update the book
            exist.books.push(book);
          } else {
            // if not exists, then add new entry add the book
            prev.push({
              category: book.category,
              books: [book],
            });
          }
          return prev;
        },
        []
      );

      setCategoryWiseBookList(list);
    }
  }, [bookListQuery.data]);

  return (
    <PublicRoute>
      {categoryWiseBookList.map((cwb) => (
        <CategoryWithBook data={cwb} key={cwb.category._id} />
      ))}
    </PublicRoute>
  );
}
