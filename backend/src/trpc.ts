import { initTRPC } from "@trpc/server";

export const trpc = initTRPC.create();

export const privateProcedure = trpc.procedure;
export const publicProcedure = trpc.procedure;