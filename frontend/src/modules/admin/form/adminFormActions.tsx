import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import AdminService from 'src/modules/admin/adminService';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import authActions from 'src/modules/auth/authActions';

const prefix = 'ADMIN_FORM';

const adminFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id?) => async (dispatch) => {
    try {
      dispatch({
        type: adminFormActions.INIT_STARTED,
      });

      const isEdit = Boolean(id);
      let record = {};

      if (isEdit) {
        record = await AdminService.find(id);
      }

      dispatch({
        type: adminFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: adminFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/admin');
    }
  },

  doAdd: (values) => async (dispatch) => {
    try {
      dispatch({
        type: adminFormActions.ADD_STARTED,
      });

      await AdminService.invite(values);

      dispatch({
        type: adminFormActions.ADD_SUCCESS,
      });

      Message.success(i18n('user.doAddSuccess'));

      getHistory().push('/admin/admin');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: adminFormActions.ADD_ERROR,
      });
    }
  },

  doUpdate: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: adminFormActions.UPDATE_STARTED,
      });

      await AdminService.edit(values);

      dispatch({
        type: adminFormActions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(
        getState(),
      );

      if (currentUser.id === values.id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n('user.doUpdateSuccess'));

      getHistory().push('/admin/admin');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: adminFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default adminFormActions;
