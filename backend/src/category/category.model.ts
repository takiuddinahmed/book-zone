import mongoose, { Types } from "mongoose";
import zod from "zod";
export const categoryZodSchema = zod.object({
  name: zod.string(),
});

export type ICategory = zod.infer<typeof categoryZodSchema> & {
  _id: string;
};

export const categoryOutputSchema = zod.object({
  _id: zod.string(),
  name: zod.string(),
});

export const categoryMongoSchema = new mongoose.Schema({
  name: String,
});

export const CategoryModel = mongoose.model("category", categoryMongoSchema);
