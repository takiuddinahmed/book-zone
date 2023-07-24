import { initTRPC } from "@trpc/server";
import { trpc } from "./trpc";
import { userRouter } from "./user";

export const appRouter = trpc.router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
