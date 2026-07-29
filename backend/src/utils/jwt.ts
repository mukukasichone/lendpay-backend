import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { UserRole } from "@prisma/client";

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

class JwtUtil {
  private readonly accessTokenSecret: Secret =
    process.env.JWT_ACCESS_SECRET || "1Z2wL3aQvP6yR6sT7nY9kS9iZ0bc3hF8jO6dV3NX9qE6pR9";

  private readonly accessTokenExpiry = "15m";

  generateAccessToken(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: this.accessTokenExpiry,
    };

    return jwt.sign(payload, this.accessTokenSecret, options);
  }

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(
      token,
      this.accessTokenSecret
    ) as JwtPayload;
  }
}

export default new JwtUtil();