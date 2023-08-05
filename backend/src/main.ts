import express from "express";

const server = express();
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./app";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { UploadedFile } from "express-fileupload";
import path from "path";
import "dotenv/config";

import zod from "zod";

const envSchema = zod.object({
  MONGO_URI: zod.string(),
  FILE_PATH: zod.string().default(__dirname),
});

const ENV = envSchema.parse(process.env);

server.use(cors());

// setup mongoose

mongoose.connect(ENV.MONGO_URI);

server.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

server.use(fileUpload);

server.post("/file", (req, res) => {
  const file = req.body.file as UploadedFile;
  if (!file) res.status(400).json({ message: "File not attached" });
  const timeStamp = new Date().getTime();
  file.mv(
    path.join(
      ENV.FILE_PATH,
      encodeURI(file.name.toString().trim()) + "" + timeStamp
    ),
    (err) => {
      if (!err) {
        res.json({ success: true });
      } else {
        console.error(err);
        res.status(400).json({ success: false, error: "Unable to upload" });
      }
    }
  );
});

server.get("/file/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(ENV.FILE_PATH, filename), (err) => {
    if (err) {
      console.log(err);
    }
    res.end();
  });
});

server.listen(4000, () => {
  console.log("Server is listening at http://localhost:4000");
});
