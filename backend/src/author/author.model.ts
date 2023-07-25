import mongoose from "mongoose";
import zod from "zod";
export const authorZodSchema = zod.object({
  name: zod.string(),
});

export type IAuthor = zod.infer<typeof authorZodSchema> & {
  _id: string;
};

export const authorMongoSchema = new mongoose.Schema({
  name: String,
});

export const AuthorModel = mongoose.model("author", authorMongoSchema);
