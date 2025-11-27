/**
 * File Upload Middleware
 */

const multer = require('multer');
const path = require('path');
const { AppError } = require('../shared/errors');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|csv/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only images and documents are allowed.', 400));
  }
};

// Upload configurations
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: fileFilter
});

const uploadSingle = upload.single('file');
const uploadMultiple = upload.array('files', 10);
const uploadFields = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'documents', maxCount: 5 }
]);

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields
};
