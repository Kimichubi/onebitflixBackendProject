// src/controllers/authController.ts

import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";
import { error } from "console";
import bcrypt from "bcrypt";
const authController = {
  // POST /auth/register
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, phone, birth, email, password } = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(email);

      if (userAlreadyExists) {
        console.error("Este e-mail já está cadastrado.");
        return;
      }

      const user = await userService.create({
        firstName,
        lastName,
        phone,
        birth,
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
      });

      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "E-mail não registrado" });
      }

      user.checkPassword(password, (err, isSame) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        if (!isSame) {
          return res.status(401).json({ message: "Senha incorreta" });
        }

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };

        const token = jwtService.signToken(payload, "7d");

        return res.json({ authenticated: true, user, token });
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};

export { authController };
