import { initTRPC } from "@trpc/server";
import { trpc } from "./trpc";
import { userRouter } from "./user";
import { categoryRouter } from "./category";

export const appRouter = trpc.router({
  user: userRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
