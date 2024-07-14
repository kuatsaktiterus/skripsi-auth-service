import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { env } from "process";
import bcryptjs from "bcryptjs";
import controller from "../Controller";

const JWT_SECRET = env.JWT_SECRET || "secret";
const KID = env.KID || "secret";
const prisma = new PrismaClient();

/**
 * Asynchronous function for user login.
 *
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @return {Promise<void>} Promise that resolves to void
 */
async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        username,
      },
    });

    const validatePassword = (inputPassword: string): Promise<boolean> => {
      return bcryptjs.compare(inputPassword, user.password);
    };

    if (await validatePassword(password)) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: "1d",
        header: { alg: "HS256", typ: "JWT", kid: KID },
      });

      if (user.role === "USER") {
        const mahasiswa = await prisma.mahasiswa.findFirstOrThrow({
          where: {
            userId: user.id,
          },
        });
        res.status(200).json(controller.responseMhs(mahasiswa, token));
        return;
      }

      res.status(200).json(controller.response(token));
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(400).json(
      controller.responseError(400, {
        error: "Invalid username or password",
      })
    );
  }
}

export default { login };
