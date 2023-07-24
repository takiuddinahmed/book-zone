import zod from "zod";
import mongoose from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  ROLE = "USER",
}

export const userZodSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string(),
  password: zod.string(),
  role: zod.enum(["ADMIN", "USER"]).optional(),
});

export const userLoginSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

export type IUser = zod.infer<typeof userZodSchema> & {
  _id?: string;
};

export const userMongoSchema = new mongoose.Schema<IUser>({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: UserRole },
});

export const UserModel = mongoose.model("users", userMongoSchema);
