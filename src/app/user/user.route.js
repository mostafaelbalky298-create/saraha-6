import { Router } from "express";
import { uploadArrayOfFiles, uploadSingleFile } from "../../lib/media/multer";
import { fileValidation } from "../../lib/media/file.validation";

const userRouter = new Router()

userRouter.post(
  "/upload-profile-pic",
  uploadSingleFile("pp"),
  fileValidation(),
  (req, res, next) => {
    // get user old image
    // delete old image from server
    // update
  }
);

userRouter.post(
  "/upload-cv",
  uploadSingleFile("cv", allowedFields.files),
  fileValidation(allowedFields.files),
  (req, res, next) => {
    res.json({ body: "ok" });
  }
);

userRouter.post(
  "/upload-cover-images",
  uploadArrayOfFiles("cover-images", 3),
  (req, res, next) => {
    console.log(req.files);
    res.json({ body: "ok" });
  }
);

export default userRouter