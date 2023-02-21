import listActions from 'src/modules/property/list/propertyListActions';
import PropertyService from 'src/modules/property/propertyService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PROPERTY_DESTROY';

const propertyDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: propertyDestroyActions.DESTROY_STARTED,
      });

      await PropertyService.destroyAll([id]);

      dispatch({
        type: propertyDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('property.doDestroySuccess'));

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/property');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: propertyDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: propertyDestroyActions.DESTROY_ALL_STARTED,
      });

      await PropertyService.destroyAll(ids);

      dispatch({
        type: propertyDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('property.doDestroyAllSelectedSuccess'),
      );

      getHistory().push('/admin/property');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: propertyDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default propertyDestroyActions;
