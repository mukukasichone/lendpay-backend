import prisma from "../../config/prisma";
import { Prisma } from "@prisma/client";

import { userSelect } from "../../common/selects/user.select";

class AuditLogRepository {
  async create(data: Prisma.AuditLogCreateInput) {
    return prisma.auditLog.create({
      data,
      include: {
        user: {
          select: userSelect,
        },
      },
    });
  }

  async findAll() {
    return prisma.auditLog.findMany({
      include: {
        user: {
          select: userSelect,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.auditLog.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: userSelect,
        },
      },
    });
  }
}

export default new AuditLogRepository();