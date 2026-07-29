import { randomUUID } from "crypto";
import { NotFoundError } from "../../common/errors";

import customerRepository from "../customer/customer.repository";
import guarantorRepository from "../guarantor/guarantor.repository";
import loanProductRepository from "../loanProduct/loanProduct.repository";

import loanApplicationRepository from "./loanApplication.repository";

import {
  AddGuarantorDto,
  CreateLoanApplicationDto,
  UpdateLoanApplicationDto,
} from "./loanApplication.validation";

class LoanApplicationService {
  async create(data: CreateLoanApplicationDto) {
    const customer = await customerRepository.findCustomerById(data.customerId);

    if (!customer) {
      throw new NotFoundError("Customer not found.");
    }

    const product = await loanProductRepository.findById(
      data.loanProductId
    );

    if (!product) {
      throw new NotFoundError("Loan product not found.");
    }

    const applicationNumber = `APP-${Date.now()}-${randomUUID()
      .substring(0, 6)
      .toUpperCase()}`;

    return loanApplicationRepository.create({
      ...data,
      applicationNumber,
    });
  }

  async findAll() {
    return loanApplicationRepository.findAll();
  }

  async findById(id: string) {
    const application = await loanApplicationRepository.findById(id);

    if (!application) {
      throw new NotFoundError("Loan application not found.");
    }

    return application;
  }

  async update(id: string, data: UpdateLoanApplicationDto) {
    await this.findById(id);

    return loanApplicationRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return loanApplicationRepository.delete(id);
  }

  async addGuarantor(
    applicationId: string,
    data: AddGuarantorDto
  ) {
    await this.findById(applicationId);

    const guarantor = await guarantorRepository.findById(
      data.guarantorId
    );

    if (!guarantor) {
      throw new NotFoundError("Guarantor not found.");
    }

    return loanApplicationRepository.addGuarantor(
      applicationId,
      data.guarantorId,
      data.relationship
    );
  }
}

export default new LoanApplicationService();