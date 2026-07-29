import { Request, Response, NextFunction } from "express";
import loanTransactionService from "./loanTransaction.service";

class LoanTransactionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await loanTransactionService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Loan transaction created successfully.",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const transactions = await loanTransactionService.findAll();

      return res.status(200).json({
        success: true,
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const transaction = await loanTransactionService.findById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByLoan(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const transactions =
        await loanTransactionService.findByLoan(
          String(req.params.loanId)
        );

      return res.status(200).json({
        success: true,
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LoanTransactionController();