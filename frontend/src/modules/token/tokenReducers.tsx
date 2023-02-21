import list from 'src/modules/token/list/tokenListReducers';
import form from 'src/modules/token/form/tokenFormReducers';
import view from 'src/modules/token/view/tokenViewReducers';
import destroy from 'src/modules/token/destroy/tokenDestroyReducers';
import importerReducer from 'src/modules/token/importer/tokenImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
