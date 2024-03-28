import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.floor(
        Math.random() * (9999 - 1000 + 1) + 1000
      )}-${Math.floor(Math.random() * (99 - 10 + 1) + 10)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage: storage });

// subir foto de usuario

export const subirFoto = upload.single("foto");
