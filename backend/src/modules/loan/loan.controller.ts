import { NextFunction, Request, Response } from "express";
import loanService from "./loan.service";

class LoanController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const loan = await loanService.create(req.body);

      res.status(201).json({
        success: true,
        message: "Loan created successfully.",
        data: loan,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const loans = await loanService.findAll();

      res.status(200).json({
        success: true,
        count: loans.length,
        data: loans,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const loan = await loanService.findById(id);

      res.status(200).json({
        success: true,
        data: loan,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByLoanNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const loanNumber = req.params.loanNumber as string;
      const loan = await loanService.findByLoanNumber(loanNumber);

      res.status(200).json({
        success: true,
        data: loan,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.customerId as string;
      const loans = await loanService.findByCustomer(customerId);

      res.status(200).json({
        success: true,
        count: loans.length,
        data: loans,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const loan = await loanService.update(id, req.body);

      res.status(200).json({
        success: true,
        message: "Loan updated successfully.",
        data: loan,
      });
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const loan = await loanService.activate(id);

      res.status(200).json({
        success: true,
        message: "Loan activated successfully.",
        data: loan,
      });
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const loan = await loanService.deactivate(id);

      res.status(200).json({
        success: true,
        message: "Loan deactivated successfully.",
        data: loan,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LoanController();
