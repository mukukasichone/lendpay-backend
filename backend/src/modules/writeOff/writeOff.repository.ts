import prisma from "../../config/prisma";
import { Prisma } from "@prisma/client";

import { userSelect } from "../../common/selects/user.select";

class WriteOffRepository {
  async create(data: Prisma.WriteOffCreateInput) {
    return prisma.writeOff.create({
      data,
      include: {
        loan: true,
        approvedBy: {
          select: userSelect,
        },
      },
    });
  }

  async findAll() {
    return prisma.writeOff.findMany({
      include: {
        loan: true,
        approvedBy: {
          select: userSelect,
        },
      },
      orderBy: {
        writtenOffAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.writeOff.findUnique({
      where: {
        id,
      },
      include: {
        loan: true,
        approvedBy: {
          select: userSelect,
        },
      },
    });
  }

  async findByLoan(loanId: string) {
    return prisma.writeOff.findUnique({
      where: {
        loanId,
      },
    });
  }
}

export default new WriteOffRepository();