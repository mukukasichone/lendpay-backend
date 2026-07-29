import { Request, Response, NextFunction } from "express";
import disbursementService from "./disbursement.service";

class DisbursementController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const disbursement = await disbursementService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Loan disbursed successfully.",
        data: disbursement,
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
      const disbursements = await disbursementService.findAll();

      return res.status(200).json({
        success: true,
        data: disbursements,
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
      const disbursement = await disbursementService.findById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: disbursement,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DisbursementController();