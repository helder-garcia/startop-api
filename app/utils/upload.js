const util = require("util");
const multer = require("multer");
const maxSize = 50 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFiles =  multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).fields([
  { name: 'businessPlan', maxCount: 1 }, { name: 'videoPitch', maxCount: 1 }, { name: 'presentation', maxCount: 1 }
]);

let uploadFileMiddleware = util.promisify(uploadFiles);
module.exports = uploadFileMiddleware;
