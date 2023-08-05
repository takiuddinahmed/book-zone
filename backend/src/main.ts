import express from "express";

const server = express();
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./app";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { UploadedFile } from "express-fileupload";
import path from "path";
import os from "os";
import "dotenv/config";

import zod from "zod";

const envSchema = zod.object({
  MONGO_URI: zod.string(),
  FILE_PATH: zod.string().default(__dirname),
});

const ENV = envSchema.parse(process.env);

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true, limit: "100mb" }));

// setup mongoose

mongoose.connect(ENV.MONGO_URI);

server.use(
  fileUpload({
    uriDecodeFileNames: true,
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
  })
);

server.post("/file", (req, res) => {
  const file = req.files?.file as UploadedFile;
  console.log(req.files);
  if (!file) res.status(400).json({ message: "File not attached" });
  const timeStamp = new Date().getTime();
  const fileName = timeStamp + "-" + encodeURI(file.name.toString().trim());

  file.mv(path.join(ENV.FILE_PATH, fileName), (err) => {
    if (!err) {
      res.json({ success: true, fileUrl: "/file/" + fileName });
    } else {
      console.error(err);
      res.status(400).json({ success: false, error: "Unable to upload" });
    }
  });
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

server.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

server.listen(4000, () => {
  console.log("Server is listening at http://localhost:4000");
});
