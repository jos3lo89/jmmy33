import * as fs from "node:fs/promises";
import prisma from "../config/db.js";

// validar foto (undifined, type)
export const userFotoValidator = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: ["foto requerida"] });
    }

    const types = ["image/png", "image/jpg", "image/jpeg"];

    if (!types.includes(req.file.mimetype)) {
      await fs.unlink(`./public/uploads/${req.file.filename}`);
      return res
        .status(400)
        .json({ message: ["La extención del archivo no valida"] });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: [error.message] });
  }
};

//validar schema user
export const userRegisterBodyValidator = (schema) => async (req, res, next) => {
  try {
    schema.parse(Object.assign({}, req.body));
    next();
  } catch (error) {
    await fs.unlink(`./public/uploads/${req.file.filename}`);

    return res
      .status(400)
      .json({ message: error.errors.map((err) => err.message) });
  }
};

//validar unique email

export const userEmailValidator = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userFound = await prisma.users.findFirst({ where: { email } });

    if (userFound) {
      await fs.unlink(`./public/uploads/${req.file.filename}`);

      return res.status(400).json({ message: ["el usuario ya existe"] });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: [error.message] });
  }
};

// user Login data validator

export const userLoginValidator = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.errors.map((err) => err.message) });
  }
};
