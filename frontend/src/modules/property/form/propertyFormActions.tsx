import PropertyService from 'src/modules/property/propertyService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PROPERTY_FORM';

const propertyFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: propertyFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PropertyService.find(id);
      }

      dispatch({
        type: propertyFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: propertyFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/property');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: propertyFormActions.CREATE_STARTED,
      });

      await PropertyService.create(values);

      dispatch({
        type: propertyFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('property.doAddSuccess'));

      getHistory().push('/admin/property');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: propertyFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: propertyFormActions.UPDATE_STARTED,
      });

      await PropertyService.update(id, values);

      dispatch({
        type: propertyFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('property.doUpdateSuccess'));

      getHistory().push('/admin/property');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: propertyFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default propertyFormActions;
