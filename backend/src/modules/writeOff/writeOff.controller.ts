import { Request, Response, NextFunction } from "express";

import writeOffService from "./writeOff.service";

class WriteOffController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const writeOff = await writeOffService.create(
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Loan written off successfully.",
        data: writeOff,
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
      const writeOffs =
        await writeOffService.findAll();

      return res.status(200).json({
        success: true,
        count: writeOffs.length,
        data: writeOffs,
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
      const writeOff =
        await writeOffService.findById(
          String(req.params.id)
        );

      return res.status(200).json({
        success: true,
        data: writeOff,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new WriteOffController();