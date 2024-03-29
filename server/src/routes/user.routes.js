import { Router } from "express";
import * as fs from "node:fs/promises";
import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

import { subirFoto } from "../middleware/multer.js";
import {
  userEmailValidator,
  userFotoValidator,
  userLoginValidator,
  userRegisterBodyValidator,
} from "../middleware/userDataValidator.js";
import {
  userLoginSchemaZ,
  userRegisterSchemaZ,
} from "../schemas/userSchema.js";
import { URL_CLIENT, URL_SEVER } from "../config/config.js";
import { createToken } from "../libs/jwt.js";
import { authValidator } from "../middleware/authValidator.js";

const router = Router();

router.post(
  "/users",
  subirFoto,
  userFotoValidator,
  userRegisterBodyValidator(userRegisterSchemaZ),
  userEmailValidator,
  async (req, res) => {
    try {
      const { nombre, apellido, email, clave } = req.body;
      const claveHash = await bcrypt.hash(clave, 10);

      const newUser = await prisma.users.create({
        data: {
          id: uuid(),
          nombre,
          apellido,
          email,
          clave: claveHash,
          foto: `/uploads/${req.file.filename}`,
        },
      });

      console.log(req.body);
      console.log(req.file);

      res.status(201).json(newUser);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: [error.message] });
    }
  }
);

router.post(
  "/users/login",
  userLoginValidator(userLoginSchemaZ),
  async (req, res) => {
    try {
      const { email, clave } = req.body;

      const userFound = await prisma.users.findFirst({ where: { email } });
      if (!userFound) {
        return res.status(400).json({ message: ["usuario mo encontrado"] });
      }

      const claveIsMatch = await bcrypt.compare(clave, userFound.clave);
      if (!claveIsMatch) {
        return res.status(400).json({ message: ["clave no coincide"] });
      }

      const token = await createToken({ id: userFound.id });

      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        id: userFound.id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        email: userFound.email,
        foto: `${URL_SEVER}${userFound.foto}`,
        isAdmin: userFound.isAdmin,
        token: token,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: [error.message] });
    }
  }
);

router.get("/users/profile", authValidator, async (req, res) => {
  try {
    const { id } = req.user;
    const userFound = await prisma.users.findFirst({ where: { id } });

    res.status(200).json({
      id: userFound.id,
      nombre: userFound.nombre,
      apellido: userFound.apellido,
      email: userFound.email,
      foto: `${URL_SEVER}${userFound.foto}`,
      isAdmin: userFound.isAdmin,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: [error.message] });
  }
});

router.get("/users", authValidator, async (req, res) => {
  try {
    const rows = await prisma.users.findMany();

    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: [error.message] });
  }
});

router.delete("/users/:id", authValidator, async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await prisma.users.delete({ where: { id } });

    await fs.unlink(`./public${userDelete.foto}`);

    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: [error.message] });
  }
});

router.put(
  "/users/:id",
  userLoginValidator(userRegisterSchemaZ),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, email, clave } = req.body;

      const claveHash = await bcrypt.hash(clave, 10);

      const userUpdate = await prisma.users.update({
        where: {
          id,
        },
        data: {
          nombre,
          apellido,
          email,
          clave: claveHash,
        },
      });

      res.status(200).json(userUpdate);
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({ message: [error.message] });
    }
  }
);

router.put(
  "/users/foto/:id",
  subirFoto,
  userFotoValidator,
  async (req, res) => {
    try {
      const { id } = req.params;

      const userF = await prisma.users.findFirst({ where: { id } });

      await fs.unlink(`./public${userF.foto}`);

      const userUpdate = await prisma.users.update({
        where: {
          id,
        },
        data: {
          foto: `/uploads/${req.file.filename}`,
        },
      });

      res.status(200).json(userUpdate);
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({ message: [error.message] });
    }
  }
);

router.post("/users/logout", authValidator, (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: [error.message] });
  }
});

router.get("/users/:id", authValidator, async (req, res) => {
  try {
    const { id } = req.params;

    const row = await prisma.users.findFirst({ where: { id } });
    res.status(200).json({
      id: row.id,
      nombre: row.nombre,
      apellido: row.apellido,
      email: row.email,
      clave: row.clave,
      foto: `${URL_SEVER}${row.foto}`,
      isAdmin: row.isAdmin,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: [error.message] });
  }
});

export default router;
