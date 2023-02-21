import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import CustomerService from 'src/modules/customer/customerService';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import authActions from 'src/modules/auth/authActions';

const prefix = 'CUSTOMER_FORM';

const customerFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id?) => async (dispatch) => {
    try {
      dispatch({
        type: customerFormActions.INIT_STARTED,
      });

      const isEdit = Boolean(id);
      let record = {};

      if (isEdit) {
        record = await CustomerService.find(id);
      }

      dispatch({
        type: customerFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: customerFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/customer');
    }
  },

  doUpdate: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: customerFormActions.UPDATE_STARTED,
      });

      await CustomerService.edit(values);

      dispatch({
        type: customerFormActions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(
        getState(),
      );

      if (currentUser.id === values.id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n('customer.doUpdateSuccess'));

      getHistory().push('/admin/customer');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: customerFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default customerFormActions;
