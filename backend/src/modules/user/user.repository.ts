import { Prisma, User } from "@prisma/client";
import prisma from "../../config/prisma";

class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findActiveById(id: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  }
  async countActiveSuperAdmins(): Promise<number> {
    return prisma.user.count({
      where: {
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });
  } 

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deactivate(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }

  async activate(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  async updateLastLogin(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        lastLogin: new Date(),
      },
    });
  }
}

export default new UserRepository();