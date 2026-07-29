import prisma from "../../config/prisma";
import { Prisma } from "@prisma/client";

class DisbursementRepository {
  async create(data: Prisma.DisbursementCreateInput) {
    return prisma.disbursement.create({
      data,
      include: {
        application: true,
        disbursedBy: true,
      },
    });
  }

  async findAll() {
    return prisma.disbursement.findMany({
      include: {
        application: true,
        disbursedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.disbursement.findUnique({
      where: { id },
    });
  }
}

export default new DisbursementRepository();