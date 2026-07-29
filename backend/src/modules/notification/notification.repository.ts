import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class NotificationRepository {
  async findAll() {
    return prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string) {
    return prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(data: {
    userId: string;
    type: any;
    subject?: string;
    message: string;
    status?: any;
    sentAt?: Date;
  }) {
    return prisma.notification.create({
      data,
    });
  }

  async markAsRead(id: string) {
    return prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    return prisma.notification.delete({
      where: {
        id,
      },
    });
  }
}

export default new NotificationRepository();