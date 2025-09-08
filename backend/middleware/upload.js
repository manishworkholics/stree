const multer = require("multer");
const path = require("path");

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/jewellery/"); // folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

// File filter (allow common image types + jfif)
const fileFilter = (req, file, cb) => {
  const allowedExt = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg", ".jfif"];
  const ext = path.extname(file.originalname).toLowerCase();
  const isImageMimetype = file.mimetype.startsWith("image/");

  if (isImageMimetype || allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpg, jpeg, png, gif, webp, bmp, svg, jfif)"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
