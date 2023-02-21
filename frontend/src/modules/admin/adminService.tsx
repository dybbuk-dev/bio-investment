import authAxios from 'src/modules/shared/axios/authAxios';

export default class AdminService {
  static async edit(data) {
    const body = {
      data,
    };

    const response = await authAxios.put(`/user`, body);

    return response.data;
  }

  static async destroy(ids) {
    const params = {
      ids,
    };

    const response = await authAxios.delete(`/user`, {
      params,
    });

    return response.data;
  }

  static async invite(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      `/userInvite`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const response = await authAxios.get(`/user/${id}`);
    return response.data;
  }

  static async fetchAdmins(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const response = await authAxios.get(`/admin`, {
      params,
    });

    return response.data;
  }

  static async fetchAdminAutocomplete(query, limit) {
    const role = 'admin';
    const params = {
      role,
      query,
      limit,
    };

    const response = await authAxios.get(
      `/user/autocomplete`,
      {
        params,
      },
    );
    return response.data;
  }
}
