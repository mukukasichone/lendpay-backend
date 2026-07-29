import prisma from "../../config/prisma";
import { Prisma } from "@prisma/client";
import { userSelect } from "../../common/selects/user.select";

class CollectionActivityRepository {
  async create(
    data: Prisma.CollectionActivityCreateInput
  ) {
    return prisma.collectionActivity.create({
      data,
      include: {
        loan: true,
        officer: {
          select: userSelect,
        },
      },
    });
  }

  async update(
    id: string,
    data: Prisma.CollectionActivityUpdateInput
  ) {
    return prisma.collectionActivity.update({
      where: {
        id,
      },
      data,
      include: {
        loan: true,
        officer: {
          select: userSelect,
        },
      },
    });
  }

  async findAll() {
    return prisma.collectionActivity.findMany({
      include: {
        loan: true,
        officer: {
          select: userSelect,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.collectionActivity.findUnique({
      where: {
        id,
      },
      include: {
        loan: true,
        officer: {
          select: userSelect,
        },
      },
    });
  }

  async findByLoan(loanId: string) {
    return prisma.collectionActivity.findMany({
      where: {
        loanId,
      },
      include: {
        officer: {
          select: userSelect,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new CollectionActivityRepository();