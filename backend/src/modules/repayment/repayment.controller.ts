import { NextFunction, Request, Response } from "express";
import repaymentService from "./repayment.service";

class RepaymentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const repayment = await repaymentService.create(req.body);

      res.status(201).json({
        success: true,
        data: repayment,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const repayments = await repaymentService.findAll();

      res.status(200).json({
        success: true,
        count: repayments.length,
        data: repayments,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const repayment = await repaymentService.findById(id);

      res.status(200).json({
        success: true,
        data: repayment,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByReceiptNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const receiptNumber = req.params.receiptNumber as string;
      const repayment = await repaymentService.findByReceiptNumber(receiptNumber);

      res.status(200).json({
        success: true,
        data: repayment,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByLoan(req: Request, res: Response, next: NextFunction) {
    try {
      const loanId = req.params.loanId as string;
      const repayments = await repaymentService.findByLoan(loanId);

      res.status(200).json({
        success: true,
        count: repayments.length,
        data: repayments,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RepaymentController();
