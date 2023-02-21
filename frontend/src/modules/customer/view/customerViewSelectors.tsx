import { createSelector } from 'reselect';

const selectRaw = (state) => state.customer.view;

const selectCustomer = createSelector(
  [selectRaw],
  (raw) => raw.customer,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const customerViewSelectors = {
  selectLoading,
  selectCustomer,
  selectRaw,
};

export default customerViewSelectors;
