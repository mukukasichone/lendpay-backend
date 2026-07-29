import { User } from "@prisma/client";
import jwtUtil from "../../utils/jwt";
import passwordUtil from "../../utils/password";
import { UnauthorizedError } from "../../common/errors";
import authRepository from "./auth.repository";
import { LoginDto } from "./auth.validation";

export interface LoginResponse {
  accessToken: string;
  user: Omit<User, "password">;
}

class AuthService {
  async login(data: LoginDto): Promise<LoginResponse> {
    const user = await authRepository.findUserByEmail(data.email);

    if (!user || !user.isActive) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    const passwordMatches = await passwordUtil.compare(
      data.password,
      user.password
    );

    if (!passwordMatches) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    await authRepository.updateLastLogin(user.id);

    const accessToken = jwtUtil.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password, ...safeUser } = user;

    return {
      accessToken,
      user: safeUser,
    };
  }
}

export default new AuthService();