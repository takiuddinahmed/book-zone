import { privateProcedure, publicProcedure, trpc } from "../trpc";
import { CategoryModel, categoryZodSchema } from "./category.model";
import zod from "zod";

export const categoryRouter = trpc.router({
  create: privateProcedure.input(categoryZodSchema).mutation(async (ops) => {
    const input = ops.input;
    const newCategory = await CategoryModel.create(input);

    return newCategory;
  }),

  delete: privateProcedure
    .input(zod.object({ _id: zod.string() }))
    .mutation(async (opt) => {
      const id = opt.input._id;
      return await CategoryModel.findByIdAndDelete(id);
    }),

  getAll: publicProcedure.query(async (opt) => {
    return await CategoryModel.find();
  }),
});
