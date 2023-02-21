import actions from 'src/modules/customer/view/customerViewActions';

const initialData = {
  loading: false,
  customer: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      customer: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
