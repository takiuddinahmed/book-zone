import { Types } from "mongoose";
import { privateProcedure, publicProcedure, trpc } from "../trpc";
import { AuthorModel, authorZodSchema } from "./author.model";
import zod from "zod";

export const authorRouter = trpc.router({
  create: privateProcedure
    .output(
      zod.object({ _id: zod.instanceof(Types.ObjectId), name: zod.string() })
    )
    .input(authorZodSchema)
    .mutation(async (ops) => {
      const input = ops.input;
      const newCategory = await AuthorModel.create(input);

      return newCategory.toJSON();
    }),

  delete: privateProcedure
    .input(zod.object({ _id: zod.string() }))
    .output(
      zod.object({ _id: zod.instanceof(Types.ObjectId), name: zod.string() })
    )
    .mutation(async (opt) => {
      const id = opt.input._id;
      const author = await AuthorModel.findByIdAndDelete(id);
      if (!author) throw new Error("Author not found");
      return author.toJSON();
    }),

  getAll: publicProcedure
    .output(
      zod
        .object({ _id: zod.instanceof(Types.ObjectId), name: zod.string() })
        .array()
    )
    .query(async (opt) => {
      return await AuthorModel.find();
    }),
});
