import { Request, Response } from "express";
import reportsService from "./reports.service";

class ReportsController {
  async getReports(req: Request, res: Response) {
    const data = await reportsService.getReports();

    return res.status(200).json({
      success: true,
      message: "Reports retrieved successfully.",
      data,
    });
  }
}

export default new ReportsController();