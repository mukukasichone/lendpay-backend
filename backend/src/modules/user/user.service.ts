import { Prisma, User, UserRole } from "@prisma/client";
import passwordUtil from "../../utils/password";
import userRepository from "./user.repository";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../common/errors";

type SafeUser = Omit<User, "password">;

class UserService {
  private sanitizeUser(user: User): SafeUser {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async create(data: Prisma.UserCreateInput): Promise<SafeUser> {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError(
        "A user with this email already exists."
      );
    }

    const hashedPassword = await passwordUtil.hash(data.password);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return this.sanitizeUser(user);
  }

  async findAll(): Promise<SafeUser[]> {
    const users = await userRepository.findAll();
    return users.map((user) => this.sanitizeUser(user));
  }

  async findById(id: string): Promise<SafeUser | null> {
    const user = await userRepository.findById(id);

    if (!user) {
      return null;
    }

    return this.sanitizeUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return userRepository.findByEmail(email);
  }

  async update(
    id: string,
    data: Prisma.UserUpdateInput
  ): Promise<SafeUser> {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const updatedUser = await userRepository.update(id, data);

    return this.sanitizeUser(updatedUser);
  }

  async deactivate(
    currentUserId: string,
    targetUserId: string
  ): Promise<SafeUser> {
    if (currentUserId === targetUserId) {
      throw new ForbiddenError(
        "You cannot deactivate your own account."
      );
    }

    const user = await userRepository.findById(targetUserId);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (user.role === UserRole.SUPER_ADMIN) {
      const activeSuperAdmins =
        await userRepository.countActiveSuperAdmins();

      if (activeSuperAdmins <= 1) {
        throw new ForbiddenError(
          "There must always be at least one active SUPER_ADMIN."
        );
      }
    }

    const deactivatedUser =
      await userRepository.deactivate(targetUserId);

    return this.sanitizeUser(deactivatedUser);
  }

  async activate(id: string): Promise<SafeUser> {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const activatedUser = await userRepository.activate(id);

    return this.sanitizeUser(activatedUser);
  }

  async delete(
    currentUserId: string,
    targetUserId: string
  ): Promise<SafeUser> {
    if (currentUserId === targetUserId) {
      throw new ForbiddenError(
        "You cannot delete your own account."
      );
    }

    const user = await userRepository.findById(targetUserId);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (user.role === UserRole.SUPER_ADMIN) {
      const activeSuperAdmins =
        await userRepository.countActiveSuperAdmins();

      if (activeSuperAdmins <= 1) {
        throw new ForbiddenError(
          "There must always be at least one active SUPER_ADMIN."
        );
      }
    }

    const deletedUser = await userRepository.delete(targetUserId);

    return this.sanitizeUser(deletedUser);
  }

  async updateLastLogin(id: string): Promise<User> {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    return userRepository.updateLastLogin(id);
  }
}

export default new UserService();