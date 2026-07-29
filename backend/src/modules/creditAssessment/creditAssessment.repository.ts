import prisma from "../../config/prisma";
import { userSelect } from "../../common/selects/user.select";

import {
  CreateCreditAssessmentDto,
  UpdateCreditAssessmentDto,
} from "./creditAssessment.validation";

class CreditAssessmentRepository {
  async create(data: CreateCreditAssessmentDto) {
    return prisma.creditAssessment.create({
      data,
      include: {
        application: true,
        assessor: {
          select: userSelect,
        },
      },
    });
  }

  async findAll() {
    return prisma.creditAssessment.findMany({
      include: {
        application: true,
        assessor: {
          select: userSelect,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.creditAssessment.findUnique({
      where: { id },
      include: {
        application: true,
        assessor: {
          select: userSelect,
        },
      },
    });
  }

  async update(id: string, data: UpdateCreditAssessmentDto) {
    return prisma.creditAssessment.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.creditAssessment.delete({
      where: { id },
    });
  }
}

export default new CreditAssessmentRepository();