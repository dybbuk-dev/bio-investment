import actions from 'src/modules/dashboard/dashboardActions';

const initialState = {
  countTotalCustomer: 0,
  countVerifiedCustomer: 0,
  countRequestedCustomer: 0,
  countCountry: 0,
  loadingCountTotalCustomer: false,
  loadingCountVerifiedCustomer: false,
  loadingCountRequestedCustomer: false,
  loadingCountCountry: false,
};

export default (
  state = initialState,
  { type, payload },
) => {
  if (type === actions.COUNT_TOTAL_CUSTOMER_STARTED) {
    return {
      ...state,
      loadingCountTotalCustomer: true,
    };
  }

  if (type === actions.COUNT_TOTAL_CUSTOMER_SUCCESS) {
    return {
      ...state,
      loadingCountTotalCustomer: false,
      countTotalCustomer: payload.count,
    };
  }

  if (type === actions.COUNT_TOTAL_CUSTOMER_ERROR) {
    return {
      ...state,
      loadingCountTotalCustomer: false,
    };
  }

  if (type === actions.COUNT_VERIFIED_CUSTOMER_STARTED) {
    return {
      ...state,
      loadingCountVerifiedCustomer: true,
    };
  }

  if (type === actions.COUNT_VERIFIED_CUSTOMER_SUCCESS) {
    return {
      ...state,
      loadingCountVerifiedCustomer: false,
      countVerifiedCustomer: payload.count,
    };
  }

  if (type === actions.COUNT_VERIFIED_CUSTOMER_ERROR) {
    return {
      ...state,
      loadingCountVerifiedCustomer: false,
    };
  }

  if (type === actions.COUNT_REQUESTED_CUSTOMER_STARTED) {
    return {
      ...state,
      loadingCountRequestedCustomer: true,
    };
  }

  if (type === actions.COUNT_REQUESTED_CUSTOMER_SUCCESS) {
    return {
      ...state,
      loadingCountRequestedCustomer: false,
      countRequestedCustomer: payload.count,
    };
  }

  if (type === actions.COUNT_REQUESTED_CUSTOMER_ERROR) {
    return {
      ...state,
      loadingCountRequestedCustomer: false,
    };
  }

  if (type === actions.COUNT_COUNTRY_STARTED) {
    return {
      ...state,
      loadingCountCountry: true,
    };
  }

  if (type === actions.COUNT_COUNTRY_SUCCESS) {
    return {
      ...state,
      loadingCountCountry: false,
      countCountry: payload.count,
    };
  }

  if (type === actions.COUNT_COUNTRY_ERROR) {
    return {
      ...state,
      loadingCountCountry: false,
    };
  }

  return state;
};
