import { MongooseQueryOptions } from "mongoose";
import { privateProcedure, publicProcedure, trpc } from "../trpc";
import {
  BookModel,
  bookValidationSchema,
  bookOutputSchema,
  bookMongoSchema,
} from "./book.model";
import zod from "zod";

export const bookRouter = trpc.router({
  create: privateProcedure
    .input(bookValidationSchema)
    .output(bookOutputSchema)
    .mutation(async ({ input }) => {
      const newBook = await BookModel.create(input);
      console.log({ newBook });
      return newBook.toJSON();
    }),

  delete: privateProcedure
    .input(zod.object({ _id: zod.string() }))
    .output(bookOutputSchema)
    .mutation(async ({ input }) => {
      const id = input._id;
      const book = await BookModel.findByIdAndDelete(id);
      if (!book) throw new Error("Author not found");
      return book.toJSON();
    }),

  get: publicProcedure
    // .output(bookOutputSchema.array())
    .input(
      zod.object({
        authorId: zod.string().optional(),
        categoryId: zod.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const filter: Record<string, string> = {};

      if (input.authorId) {
        filter.authorId = input.authorId;
      }
      if (input.categoryId) {
        filter.categoryId = input.categoryId;
      }

      return await BookModel.find(filter);
    }),

  getById: publicProcedure
    .output(bookOutputSchema)
    .input(zod.object({ _id: zod.string() }))
    .query(async ({ input }) => {
      const book = await BookModel.findById(input._id);
      if (!book) throw new Error("Book not found");
      return book.toJSON();
    }),
});
