import { privateProcedure, publicProcedure, trpc } from "../trpc";
import {
  UserModel,
  UserRole,
  userLoginSchema,
  userZodSchema,
} from "./user.model";
import brypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRouter = trpc.router({
  check: trpc.procedure.query(() => {
    return { msg: "it works" };
  }),

  register: publicProcedure.input(userZodSchema).mutation(async (ops) => {
    const input = ops.input;
    const existUser = await UserModel.findOne({ email: input.email });
    if (existUser) throw new Error("User already exist");
    const { password, ...rest } = input;
    const encryptedPassword = brypt.hashSync(password, 10);

    return await UserModel.create({
      ...rest,
      password: encryptedPassword,
      role: UserRole.ADMIN,
    });
  }),

  login: privateProcedure.input(userLoginSchema).mutation(async (ops) => {
    const input = ops.input;
    const user = await UserModel.findOne({ email: input.email });
    if (!user) throw new Error("Invalid credential");
    if (!brypt.compareSync(input.password, user.password)) {
      throw new Error("Invalid credential");
    }
    const token = jwt.sign({ userId: user._id.toString() }, "secret");

    return { token, user };
  }),
});
export type UserRouter = typeof userRouter;
