import list from 'src/modules/customer/list/customerListReducers';
import form from 'src/modules/customer/form/customerFormReducers';
import view from 'src/modules/customer/view/customerViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  form,
  list,
  view,
});
