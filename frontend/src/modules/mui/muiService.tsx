import authAxios from 'src/modules/shared/axios/authAxios';

export default class MuiService {
  static async find() {
    const response = await authAxios.get(`/mui`);

    return response.data;
  }

  static async save(mui) {
    const body = {
      mui,
    };

    const response = await authAxios.put(`/mui`, body);
    return response.data;
  }
}
