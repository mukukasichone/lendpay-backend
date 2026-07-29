import { NextFunction, Request, Response } from "express";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { AppError } from "../common/errors";

export default function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // ==========================================
  // Custom Application Errors
  // ==========================================
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  // ==========================================
  // Prisma Known Errors
  // ==========================================
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        res.status(409).json({
          success: false,
          message: "A record with the same unique value already exists.",
          field: (error.meta?.target as string[]) ?? [],
        });
        return;

      case "P2025":
        res.status(404).json({
          success: false,
          message: "The requested record was not found.",
        });
        return;

      case "P2003":
        res.status(409).json({
          success: false,
          message:
            "Operation failed because the record is referenced by another resource.",
        });
        return;

      default:
        console.error("Prisma Error:", error);

        res.status(500).json({
          success: false,
          message:
            process.env.NODE_ENV === "production"
              ? "Database operation failed."
              : error.message,
        });
        return;
    }
  }

  // ==========================================
  // Prisma Validation Errors
  // ==========================================
  if (error instanceof PrismaClientValidationError) {
    res.status(400).json({
      success: false,
      message: "Invalid data supplied.",
    });
    return;
  }

  // ==========================================
  // Unknown Errors
  // ==========================================
  console.error("Unhandled Error:", error);

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: error.stack,
    }),
  });
}