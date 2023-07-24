import express from "express";

const server = express();
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./app";
import cors from "cors";
import mongoose from "mongoose";
server.use(cors());

// setup mongoose

mongoose.connect("mongodb://localhost:27017/book-zone");

server.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

server.listen(4000, () => {
  console.log("Server is listening at http://localhost:4000");
});
