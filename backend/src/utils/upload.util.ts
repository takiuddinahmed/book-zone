import { UploadedFile } from "express-fileupload";
import path from "path";
import { ENV } from "./env.util";
export const uploadFile = async (file: UploadedFile, subfolder: string) => {
  return new Promise((resolve, reject) => {
    const timeStamp = new Date().getTime();
    const fileName = timeStamp + "-" + encodeURI(file.name.toString().trim());
    file.mv(path.join(ENV.FILE_PATH, subfolder, fileName), (err) => {
      if (!err) {
        resolve("/file/" + subfolder + "/" + fileName);
      } else {
        reject("Unable to upload");
      }
    });
  });
};
