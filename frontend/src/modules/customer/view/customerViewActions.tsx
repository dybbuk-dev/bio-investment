import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import CustomerService from 'src/modules/customer/customerService';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';

const prefix = 'CUSTOMER_VIEW';

const customerViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  ACCEPT_STARTED: `${prefix}_ACCEPT_STARTED`,
  ACCEPT_SUCCESS: `${prefix}_ACCEPT_SUCCESS`,
  ACCEPT_ERROR: `${prefix}_ACCEPT_ERROR`,

  REJECT_STARTED: `${prefix}_REJECT_STARTED`,
  REJECT_SUCCESS: `${prefix}_REJECT_SUCCESS`,
  REJECT_ERROR: `${prefix}_REJECT_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: customerViewActions.FIND_STARTED,
      });

      const customer = await CustomerService.find(id);

      dispatch({
        type: customerViewActions.FIND_SUCCESS,
        payload: customer,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: customerViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/customer');
    }
  },

  doAccept: (id) => async (dispatch) => {
    try {
      dispatch({
        type: customerViewActions.ACCEPT_STARTED,
      });

      await CustomerService.accept(id);

      dispatch({
        type: customerViewActions.ACCEPT_SUCCESS,
      });

      Message.success(i18n('customer.doAcceptSuccess'));

      getHistory().push('/admin/customer');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: customerViewActions.ACCEPT_ERROR,
      });

      getHistory().push('/admin/customer');
    }
  },

  doReject: (id) => async (dispatch) => {
    try {
      dispatch({
        type: customerViewActions.REJECT_STARTED,
      });

      await CustomerService.reject(id);

      dispatch({
        type: customerViewActions.REJECT_SUCCESS,
      });

      Message.success(i18n('customer.doRejectSuccess'));

      getHistory().push('/admin/customer');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: customerViewActions.REJECT_ERROR,
      });

      getHistory().push('/admin/customer');
    }
  },
};

export default customerViewActions;
