import prisma from "../../config/prisma";
import { Prisma } from "@prisma/client";

import { userSelect } from "../../common/selects/user.select";

class ApprovalRepository {
  async create(data: Prisma.ApprovalCreateInput) {
    return prisma.approval.create({
      data,
      include: {
        application: true,
        approver: {
          select: userSelect,
        },
      },
    });
  }

  async findAll() {
    return prisma.approval.findMany({
      include: {
        application: true,
        approver: {
          select: userSelect,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.approval.findUnique({
      where: { id },
      include: {
        application: true,
        approver: {
          select: userSelect,
        },
      },
    });
  }
}

export default new ApprovalRepository();