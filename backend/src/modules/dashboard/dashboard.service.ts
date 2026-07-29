import dashboardRepository from "./dashboard.repository";

class DashboardService {
  async getSummary() {
    return await dashboardRepository.getSummary();
  }
}

export default new DashboardService();