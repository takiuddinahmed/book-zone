import mongoose, { Types } from "mongoose";
import zod from "zod";
export const authorZodSchema = zod.object({
  name: zod.string(),
});

export type IAuthor = zod.infer<typeof authorZodSchema> & {
  _id: string;
};

export const authorOutputSchema = zod.object({
  _id: zod.instanceof(Types.ObjectId),
  name: zod.string(),
});

export const authorMongoSchema = new mongoose.Schema({
  name: String,
});

export const AuthorModel = mongoose.model("author", authorMongoSchema);
