import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function authGuard(req, res, next) {
  try {
    // Logic to check token
    const token = req.cookies.access_token;

    if (!token) {
      throw new AppError("no token provided", 403);
    }

    req.user = jwt.verify(token, env.jwt.secret);
    // req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
}