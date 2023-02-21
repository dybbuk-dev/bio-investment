import authAxios from 'src/modules/shared/axios/authAxios';

export default class DashboardService {
  static async countTotalCustomer() {
    const response = await authAxios.get(
      `/statistics/countTotalCustomer`,
    );

    return response.data;
  }

  static async countVerifiedCustomer() {
    const response = await authAxios.get(
      `/statistics/countVerifiedCustomer`,
    );

    return response.data;
  }

  static async countRequestedCustomer() {
    const response = await authAxios.get(
      `/statistics/countRequestedCustomer`,
    );

    return response.data;
  }

  static async countCountry() {
    const response = await authAxios.get(
      `/statistics/countCountry`,
    );

    return response.data;
  }
}
