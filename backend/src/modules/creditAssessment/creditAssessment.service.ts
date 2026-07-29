import { NotFoundError } from "../../common/errors";

import loanApplicationRepository from "../loanApplication/loanApplication.repository";
import userRepository from "../user/user.repository";

import creditAssessmentRepository from "./creditAssessment.repository";

import {
  CreateCreditAssessmentDto,
  UpdateCreditAssessmentDto,
} from "./creditAssessment.validation";

class CreditAssessmentService {
  async create(data: CreateCreditAssessmentDto) {
    const application = await loanApplicationRepository.findById(
      data.applicationId
    );

    if (!application) {
      throw new NotFoundError("Loan application not found.");
    }

    const assessor = await userRepository.findById(data.assessorId);

    if (!assessor) {
      throw new NotFoundError("Assessor not found.");
    }

    return creditAssessmentRepository.create(data);
  }

  async findAll() {
    return creditAssessmentRepository.findAll();
  }

  async findById(id: string) {
    const assessment = await creditAssessmentRepository.findById(id);

    if (!assessment) {
      throw new NotFoundError("Credit assessment not found.");
    }

    return assessment;
  }

  async update(id: string, data: UpdateCreditAssessmentDto) {
    await this.findById(id);

    return creditAssessmentRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return creditAssessmentRepository.delete(id);
  }
}

export default new CreditAssessmentService();