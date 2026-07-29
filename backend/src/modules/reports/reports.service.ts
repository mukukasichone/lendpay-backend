import reportsRepository from "./reports.repository";

class ReportsService {
  async getReports() {
    return await reportsRepository.getReports();
  }
}

export default new ReportsService();