import { createSelector } from 'reselect';

const selectRaw = (state) => state.customer.form;

const selectCustomer = createSelector(
  [selectRaw],
  (raw) => raw.customer,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const customerFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectCustomer,
  selectRaw,
};

export default customerFormSelectors;
