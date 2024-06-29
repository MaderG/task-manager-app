import prismaClient from "../utils/prismaClient.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import InvalidCredentialsError from "../errors/InvalidCredentialsError.js";
import AppError from "../errors/AppError.js";
import jwt from "jsonwebtoken";
import transporter from "../modules/mail.js";

const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.date().optional(),
  id: z.string().optional(),
});

const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
})

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters long."),
  newPassword: z.string().min(6, "New password must be at least 6 characters long."),
});

export default class UserController {
  async auth(req, res) {
    const { email, password } = req.body;

    try {
      authSchema.parse({ email, password });

      const user = await prismaClient.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new InvalidCredentialsError("Invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new InvalidCredentialsError("Invalid credentials");
      }

      delete user.password;

      const token = jwt.sign({ user }, JWT_SECRET, {
        expiresIn: "60m",
      });

      res.status(200).send({ token });
    } catch (error) {
      res.status(401).send({ error: "Invalid credentials" });
    }
  }

  async create(req, res) {
    try {
      const { name, email, password } = userSchema.parse(req.body);

      if (await prismaClient.user.findUnique({ where: { email } })) {
        throw new InvalidCredentialsError("Email already in use");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      delete user.password;

      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await prismaClient.user.findMany();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ error: "An error occurred while fetching users" });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;

    try {
      const user = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new AppError("User not found");
      }

      delete user.password;

      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ error: "User not found" });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const { name, email, password } = userUpdateSchema.parse(req.body);

      const user = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new AppError("User not found");
      }

      const updatedData = {};
      if (name) updatedData.name = name;
      if (email) updatedData.email = email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updatedData.password = hashedPassword;
      }

      const updatedUser = await prismaClient.user.update({
        where: { id },
        data: updatedData,
      });

      delete updatedUser.password;

      const token = jwt.sign({ user: updatedUser }, JWT_SECRET, {
        expiresIn: "60m",
      });

      res.status(200).send({ user: updatedUser, token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await prismaClient.user.delete({
        where: { id },
      });

      res.status(200).send({ message: "User deleted" });
    } catch (err) {
      res.status(404).send({ error: "User not found" });
    }
  }

  async changePassword(req, res) {
    const {oldPassword, newPassword} = changePasswordSchema.parse(req.body);

    try {
      const user = await prismaClient.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user) {
        throw new AppError("User not found");
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        throw new InvalidCredentialsError("Invalid credentials");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatedUser = await prismaClient.user.update({
        where: { id: req.user.id },
        data: { password: hashedPassword },
      });

      delete updatedUser.password;


      res.status(200).send({ message: "Password updated" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const user = await prismaClient.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new AppError("User not found");
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

      const mailOptions = {
        from: `Admin <${process.env.MAIL_ADRESS}>`,
        to: email,
        subject: "Redefinição de senha",
        text: `Clique no link para resetar sua senha ${resetUrl}`,
        html: `<p>Clique no link para resetar sua senha: <a href="${resetUrl}">Resetar Senha</a></p>`,
      };

      console.log('Sending email with optios', mailOptions)

      await transporter.sendMail(mailOptions);

      res.status(200).send({ message: "Email sent" });

    } catch (err) {
      res.status(400).send({ error: "An error occurred while sending the email" });
    }
  }

  async resetPassword(req, res) {
    const {token, password} = req.body;

    try {
      const { userId } = jwt.verify(token, JWT_SECRET);

      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });


      if (!user) {
        throw new AppError("User not found");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const updatedUser = await prismaClient.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      delete updatedUser.password;

      res.status(200).send({ message: "Password updated" });
    } catch (err) {
      res.status(400).send({ error: "An error occurred while updating the password" });
    }
  }

}
