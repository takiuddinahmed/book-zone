import { initTRPC } from "@trpc/server";
import { trpc } from "./trpc";
import { userRouter } from "./user";
import { categoryRouter } from "./category";
import { authorRouter } from "./author";
import { bookRouter } from "./book";

export const appRouter = trpc.router({
  user: userRouter,
  category: categoryRouter,
  author: authorRouter,
  book: bookRouter,
});

export type AppRouter = typeof appRouter;
