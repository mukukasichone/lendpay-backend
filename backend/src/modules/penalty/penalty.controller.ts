import { Request, Response, NextFunction } from "express";
import penaltyService from "./penalty.service";

class PenaltyController {
  async run(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await penaltyService.run(req.user?.id);

      return res.status(200).json({
        success: true,
        message: "Penalty process completed successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PenaltyController();