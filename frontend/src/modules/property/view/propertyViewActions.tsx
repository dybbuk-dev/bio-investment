import PropertyService from 'src/modules/property/propertyService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PROPERTY_VIEW';

const propertyViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: propertyViewActions.FIND_STARTED,
      });

      const record = await PropertyService.find(id);

      dispatch({
        type: propertyViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: propertyViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/property');
    }
  },
};

export default propertyViewActions;
