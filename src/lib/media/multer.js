import multer, { diskStorage } from "multer";
import crypto from 'node:crypto'
import { AppError } from "../../pkg/error/error";
import { allowedFields } from "./file.validation";



function fileUpload(allowedTypes = allowedFields.images){
    return multer({
        fileFilter: function(req, file, cb){
            if(!allowedTypes.includes(file.mimetype)){
                return cb(new AppError('invaled file format', 400), false)
            }
            return cb(null, true)
        },
    storage: diskStorage({
        destination: 'uploads',
        filename: function(req, file, cb){
            console.log(file);
            cb(null, `${crypto.randomUUID()}-${file.originalname}`)
        }
    }),
    
})
}

export function uploadSingleFile(fieldName, allowedTypes = allowedFields.images) {
  return fileUpload(allowedTypes).single(fieldName);
}

export function uploadArrayOfFiles(fieldName, maxCount) {
  return fileUpload().array(fieldName, maxCount);
}

export function uploadFields(fields) {
  return fileUpload().fields(fields);
}

