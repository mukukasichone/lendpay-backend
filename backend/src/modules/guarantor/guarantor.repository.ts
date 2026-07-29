import prisma from "../../config/prisma";
import {
  CreateGuarantorDto,
  UpdateGuarantorDto,
} from "./guarantor.validation";

class GuarantorRepository {
  async create(data: CreateGuarantorDto) {
    return prisma.guarantor.create({
      data,
    });
  }

  async findAll() {
    return prisma.guarantor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.guarantor.findUnique({
      where: { id },
    });
  }

  async findByNrc(nrc: string) {
    return prisma.guarantor.findUnique({
      where: { nrc },
    });
  }

  async update(id: string, data: UpdateGuarantorDto) {
    return prisma.guarantor.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.guarantor.delete({
      where: { id },
    });
  }
}

export default new GuarantorRepository();
