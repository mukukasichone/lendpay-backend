import { Request, Response, NextFunction } from "express";
import creditAssessmentService from "./creditAssessment.service";

class CreditAssessmentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const assessment = await creditAssessmentService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Credit assessment created successfully.",
        data: assessment,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const assessments = await creditAssessmentService.findAll();

      return res.status(200).json({
        success: true,
        data: assessments,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const assessment = await creditAssessmentService.findById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: assessment,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const assessment = await creditAssessmentService.update(
        String(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Credit assessment updated successfully.",
        data: assessment,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await creditAssessmentService.delete(String(req.params.id));

      return res.status(200).json({
        success: true,
        message: "Credit assessment deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CreditAssessmentController();