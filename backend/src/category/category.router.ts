import { privateProcedure, publicProcedure, trpc } from "../trpc";
import { CategoryModel, categoryZodSchema, ICategory } from "./category.model";
import zod from "zod";
import { Types } from "mongoose";

export const categoryRouter = trpc.router({
  create: privateProcedure
    .output(
      zod.object({ _id: zod.instanceof(Types.ObjectId), name: zod.string() })
    )
    .input(categoryZodSchema)
    .mutation(async (ops) => {
      const input = ops.input;
      const newCategory = await CategoryModel.create(input);

      return newCategory.toJSON();
    }),

  delete: privateProcedure
    .input(zod.object({ _id: zod.string() }))
    .output(
      zod.object({ _id: zod.instanceof(Types.ObjectId), name: zod.string() })
    )
    .mutation(async (opt) => {
      const id = opt.input._id;

      const deletedCategory = await CategoryModel.findByIdAndDelete(id);
      if (!deletedCategory) throw new Error("Category not found");
      return deletedCategory.toJSON();
    }),

  getAll: publicProcedure
    .output(
      zod
        .object({ _id: zod.instanceof(Types.ObjectId), name: zod.string() })
        .array()
    )
    .query(async (opt) => {
      return await CategoryModel.find();
    }),
});
