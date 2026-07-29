import {
  Loan,
  NotificationStatus,
  NotificationType,
  Prisma,
} from "@prisma/client";
import {
  ConflictError,
  NotFoundError,
} from "../../common/errors";
import loanRepository from "./loan.repository";
import notificationService from "../notification/notification.service";

class LoanService {
  async create(data: Prisma.LoanCreateInput): Promise<Loan> {
    const existingLoan = await loanRepository.findByLoanNumber(
      data.loanNumber
    );

    if (existingLoan) {
      throw new ConflictError(
        `Loan with number "${data.loanNumber}" already exists.`
      );
    }

    const loan = await loanRepository.create(data);

    // Create notification
    if (loan.customerId) {
      await notificationService.create({
        userId: loan.customerId,
        type: NotificationType.PUSH,
        subject: "Loan Created",
        message: `Loan ${loan.loanNumber} has been created successfully.`,
        status: NotificationStatus.SENT,
        sentAt: new Date(),
      });
    }

    return loan;
  }

  async findAll(): Promise<Loan[]> {
    return loanRepository.findAll();
  }

  async findById(id: string): Promise<Loan | null> {
    return loanRepository.findById(id);
  }

  async findByLoanNumber(loanNumber: string): Promise<Loan | null> {
    return loanRepository.findByLoanNumber(loanNumber);
  }

  async findByCustomer(customerId: string): Promise<Loan[]> {
    return loanRepository.findByCustomer(customerId);
  }

  async update(
    id: string,
    data: Prisma.LoanUpdateInput
  ): Promise<Loan> {
    const existingLoan = await loanRepository.findById(id);

    if (!existingLoan) {
      throw new NotFoundError("Loan not found.");
    }

    return loanRepository.update(id, data);
  }

  async activate(id: string): Promise<Loan> {
    const existingLoan = await loanRepository.findById(id);

    if (!existingLoan) {
      throw new NotFoundError("Loan not found.");
    }

    return loanRepository.activate(id);
  }

  async deactivate(id: string): Promise<Loan> {
    const existingLoan = await loanRepository.findById(id);

    if (!existingLoan) {
      throw new NotFoundError("Loan not found.");
    }

    return loanRepository.deactivate(id);
  }
}

export default new LoanService();