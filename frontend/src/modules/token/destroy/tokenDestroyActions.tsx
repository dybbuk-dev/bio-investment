import listActions from 'src/modules/token/list/tokenListActions';
import TokenService from 'src/modules/token/tokenService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'TOKEN_DESTROY';

const tokenDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: tokenDestroyActions.DESTROY_STARTED,
      });

      await TokenService.destroyAll([id]);

      dispatch({
        type: tokenDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('token.doDestroySuccess'));

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/token');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: tokenDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: tokenDestroyActions.DESTROY_ALL_STARTED,
      });

      await TokenService.destroyAll(ids);

      dispatch({
        type: tokenDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('token.doDestroyAllSelectedSuccess'),
      );

      getHistory().push('/admin/token');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: tokenDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default tokenDestroyActions;
