import authAxios from 'src/modules/shared/axios/authAxios';

export default class CustomerService {
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

  static async find(id) {
    const response = await authAxios.get(`/user/${id}`);
    return response.data;
  }

  static async fetchCustomers(
    filter,
    orderBy,
    limit,
    offset,
  ) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const response = await authAxios.get(`/customer`, {
      params,
    });

    return response.data;
  }

  static async fetchCustomerAutocomplete(query, limit) {
    const role = 'customer';
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

  static async accept(id) {
    const body = {
      id,
    };

    const response = await authAxios.put(
      `/user/accept`,
      body,
    );

    return response.data;
  }

  static async reject(id) {
    const body = {
      id,
    };

    const response = await authAxios.put(
      `/user/reject`,
      body,
    );

    return response.data;
  }
}
