import mongoose, { Types } from "mongoose";
import zod from "zod";
import { authorOutputSchema } from "../author/author.model";
import { categoryOutputSchema } from "../category/category.model";
export const bookValidationSchema = zod.object({
  name: zod.string(),
  description: zod.string().default("").optional(),
  fileUrl: zod.string(),
  imageUrl: zod.string(),
  authorId: zod.string(),
  categoryId: zod.string(),
});

export const bookOutputSchema = zod.object({
  _id: zod.instanceof(Types.ObjectId),
  name: zod.string(),
  description: zod.string().optional(),
  fileUrl: zod.string(),
  imageUrl: zod.string(),
  authorId: zod.string(),
  categoryId: zod.string(),
  author: authorOutputSchema,
  category: categoryOutputSchema,
});

export type IBook = Omit<zod.infer<typeof bookOutputSchema>, "_id"> & {
  _id: string;
};

export const bookMongoSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    fileUrl: String,
    imageUrl: String,
    authorId: { type: String, ref: "author" },
    categoryId: { type: String, ref: "category" },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

bookMongoSchema.virtual("author", {
  ref: "author",
  localField: "authorId",
  foreignField: "_id",
  justOne: true,
  autopopulate: true,
});
bookMongoSchema.virtual("category", {
  ref: "category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
  autopopulate: true,
});

bookMongoSchema.plugin(require("mongoose-autopopulate"));

export const BookModel = mongoose.model("book", bookMongoSchema);
