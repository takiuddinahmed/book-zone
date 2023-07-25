import { privateProcedure, publicProcedure, trpc } from "../trpc";
import { AuthorModel, authorZodSchema } from "./author.model";
import zod from "zod";

export const authorRouter = trpc.router({
  create: privateProcedure.input(authorZodSchema).mutation(async (ops) => {
    const input = ops.input;
    const newCategory = await AuthorModel.create(input);

    return newCategory;
  }),

  delete: privateProcedure
    .input(zod.object({ _id: zod.string() }))
    .mutation(async (opt) => {
      const id = opt.input._id;
      return await AuthorModel.findByIdAndDelete(id);
    }),

  getAll: publicProcedure.query(async (opt) => {
    return await AuthorModel.find();
  }),
});
