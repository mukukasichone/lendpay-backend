import { LoanProduct, Prisma } from "@prisma/client";
import {
  ConflictError,
  NotFoundError,
} from "../../common/errors";
import loanProductRepository from "./loanProduct.repository";

class LoanProductService {
  async create(data: Prisma.LoanProductCreateInput): Promise<LoanProduct> {
    const existingCode = await loanProductRepository.findByCode(
      data.productCode
    );

    if (existingCode) {
      throw new ConflictError(
        `Loan product with code "${data.productCode}" already exists.`
      );
    }

    const existingName = await loanProductRepository.findByName(
      data.productName
    );

    if (existingName) {
      throw new ConflictError(
        `Loan product "${data.productName}" already exists.`
      );
    }

    return loanProductRepository.create(data);
  }

  async findAll(): Promise<LoanProduct[]> {
    return loanProductRepository.findAll();
  }

  async findById(id: string): Promise<LoanProduct | null> {
    return loanProductRepository.findById(id);
  }

  async update(
    id: string,
    data: Prisma.LoanProductUpdateInput
  ): Promise<LoanProduct> {
    const existingProduct = await loanProductRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundError("Loan product not found.");
    }

    return loanProductRepository.update(id, data);
  }

  async deactivate(id: string): Promise<LoanProduct> {
    const existingProduct = await loanProductRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundError("Loan product not found.");
    }

    return loanProductRepository.deactivate(id);
  }

  async activate(id: string): Promise<LoanProduct> {
    const existingProduct = await loanProductRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundError("Loan product not found.");
    }

    return loanProductRepository.activate(id);
  }
}

export default new LoanProductService();