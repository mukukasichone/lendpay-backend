import { NextFunction, Request, Response } from "express";
import loanProductService from "./loanProduct.service";

class LoanProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const loanProduct = await loanProductService.create(req.body);

      res.status(201).json({
        success: true,
        message: "Loan product created successfully.",
        data: loanProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await loanProductService.findAll();

      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const product = await loanProductService.findById(id);

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const product = await loanProductService.update(id, req.body);

      res.status(200).json({
        success: true,
        message: "Loan product updated successfully.",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const product = await loanProductService.deactivate(id);

      res.status(200).json({
        success: true,
        message: "Loan product deactivated successfully.",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const product = await loanProductService.activate(id);

      res.status(200).json({
        success: true,
        message: "Loan product activated successfully.",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LoanProductController();
