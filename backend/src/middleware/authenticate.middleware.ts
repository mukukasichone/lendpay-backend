import { NextFunction, Request, Response } from "express";
import jwtUtil from "../utils/jwt";
import userRepository from "../modules/user/user.repository";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Authorization header is missing.",
      });
      return;
    }

    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization header.",
      });
      return;
    }

    const token = authHeader.substring(7);

    const payload = jwtUtil.verifyAccessToken(token);

    const user = await userRepository.findActiveById(payload.id);

    if (!user) {
      res.status(401).json({
        success: false,
        message:
          "Your account has been deactivated or no longer exists.",
      });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}