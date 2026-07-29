import prisma from "../../config/prisma";
import {
  CreateLoanApplicationDto,
  UpdateLoanApplicationDto,
} from "./loanApplication.validation";

class LoanApplicationRepository {
  async create(data: CreateLoanApplicationDto & { applicationNumber: string }) {
    return prisma.loanApplication.create({
      data,
      include: {
        customer: true,
        loanProduct: true,
      },
    });
  }

  async findAll() {
    return prisma.loanApplication.findMany({
      include: {
        customer: true,
        loanProduct: true,
        guarantors: {
          include: {
            guarantor: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.loanApplication.findUnique({
      where: { id },
      include: {
        customer: true,
        loanProduct: true,
        guarantors: {
          include: {
            guarantor: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateLoanApplicationDto) {
    return prisma.loanApplication.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.loanApplication.delete({
      where: { id },
    });
  }

  async addGuarantor(
    applicationId: string,
    guarantorId: string,
    relationship: any
  ) {
    return prisma.applicationGuarantor.create({
      data: {
        applicationId,
        guarantorId,
        relationship,
      },
    });
  }
}

export default new LoanApplicationRepository();