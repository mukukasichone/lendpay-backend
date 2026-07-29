import { Request, Response, NextFunction } from "express";
import loanApplicationService from "./loanApplication.service";

class LoanApplicationController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const application = await loanApplicationService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Loan application created successfully.",
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const applications = await loanApplicationService.findAll();

      return res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const application = await loanApplicationService.findById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const application = await loanApplicationService.update(
        String(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Loan application updated successfully.",
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await loanApplicationService.delete(String(req.params.id));

      return res.status(200).json({
        success: true,
        message: "Loan application deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  async addGuarantor(req: Request, res: Response, next: NextFunction) {
    try {
      const guarantor = await loanApplicationService.addGuarantor(
        String(req.params.id),
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Guarantor added successfully.",
        data: guarantor,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LoanApplicationController();