import express from "express";

const server = express();
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./app";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { UploadedFile } from "express-fileupload";
import path, { resolve } from "path";
import os from "os";
import "dotenv/config";
import { ENV } from "./utils/env.util";
import { uploadFile } from "./utils/upload.util";
import fs from "fs/promises";
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

fs.mkdir(path.join(ENV.FILE_PATH, "file"), { recursive: true });
fs.mkdir(path.join(ENV.FILE_PATH, "image"), { recursive: true });

server.get("/api", (req, res) => {
  res.json({ message: "It works" });
});

server.post("/api/file", async (req, res) => {
  const file = req.files?.file as UploadedFile;
  const image = req.files?.image as UploadedFile;
  if (!file) res.status(400).json({ message: "File not attached" });

  try {
    const fileUrl = await uploadFile(file, "file");
    const imageUrl = await uploadFile(image, "image");
    res.json({ success: true, fileUrl, imageUrl });
  } catch (err) {
    console.log(err);
  }
});

server.get("/api/file/:subfolder/:filename", (req, res) => {
  const { filename, subfolder } = req.params;

  res.sendFile(path.join(ENV.FILE_PATH, subfolder, filename), (err) => {
    if (err) {
      console.log(err);
    }
    res.end();
  });
});

server.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

server.listen(4000, () => {
  console.log("Server is listening at http://localhost:4000");
});
