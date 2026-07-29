import { Request, Response, NextFunction } from "express";
import guarantorService from "./guarantor.service";

class GuarantorController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const guarantor = await guarantorService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Guarantor created successfully.",
        data: guarantor,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const guarantors = await guarantorService.findAll();

      return res.status(200).json({
        success: true,
        data: guarantors,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const guarantor = await guarantorService.findById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: guarantor,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const guarantor = await guarantorService.update(
        String(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Guarantor updated successfully.",
        data: guarantor,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await guarantorService.delete(String(req.params.id));

      return res.status(200).json({
        success: true,
        message: "Guarantor deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new GuarantorController();