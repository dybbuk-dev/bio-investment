import TokenService from 'src/modules/token/tokenService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'TOKEN_VIEW';

const tokenViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: tokenViewActions.FIND_STARTED,
      });

      const record = await TokenService.find(id);

      dispatch({
        type: tokenViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tokenViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/token');
    }
  },
};

export default tokenViewActions;
