import { initTRPC } from "@trpc/server";
import { trpc } from "./trpc";
import { userRouter } from "./user";
import { categoryRouter } from "./category";
import { authorRouter } from "./author";

export const appRouter = trpc.router({
  user: userRouter,
  category: categoryRouter,
  author: authorRouter,
});

export type AppRouter = typeof appRouter;
