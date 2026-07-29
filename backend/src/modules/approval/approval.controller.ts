import { Request, Response, NextFunction } from "express";
import approvalService from "./approval.service";

class ApprovalController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const approval = await approvalService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Application processed successfully.",
        data: approval,
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
      const approvals = await approvalService.findAll();

      return res.status(200).json({
        success: true,
        data: approvals,
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
      const approval = await approvalService.findById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: approval,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ApprovalController();