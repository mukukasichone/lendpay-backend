import prisma from "../../config/prisma";

class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        branch: true,
      },
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        branch: true,
      },
    });
  }

  async updateLastLogin(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        lastLogin: new Date(),
      },
    });
  }

  async updatePassword(userId: string, password: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        password,
      },
    });
  }
}

export default new AuthRepository();