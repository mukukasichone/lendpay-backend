import { Request, Response } from "express";
import overdueService from "./overdue.service";

class OverdueController {
  async run(req: Request, res: Response): Promise<void> {
    const result = await overdueService.run();

    res.status(200).json({
      success: true,
      message: "Overdue process completed successfully.",
      data: result,
    });
  }
}

export default new OverdueController();