import { Box, Grid, Typography } from "@mui/material";
import { CategoryWiseBook } from "./homepage.component";
import { BookCard } from "../book/book-card.component";

interface CategoryWithBookProps {
  data: CategoryWiseBook;
}

export function CategoryWithBook({ data }: CategoryWithBookProps) {
  const books = data.books.slice(0, 6);
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{}}>
        {data.category.name}
      </Typography>
      <Grid container gap={3} sx={{ mt: 2 }}>
        {books.map((book) => (
          <Grid item key={book._id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
