import list from 'src/modules/property/list/propertyListReducers';
import form from 'src/modules/property/form/propertyFormReducers';
import view from 'src/modules/property/view/propertyViewReducers';
import destroy from 'src/modules/property/destroy/propertyDestroyReducers';
import importerReducer from 'src/modules/property/importer/propertyImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
