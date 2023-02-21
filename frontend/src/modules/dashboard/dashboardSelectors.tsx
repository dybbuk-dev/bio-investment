import { createSelector } from 'reselect';

const selectRaw = (state) => state.dashboard;

const selectLoadingCountTotalCustomer = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loadingCountTotalCustomer),
);

const selectLoadingCountVerifiedCustomer = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loadingCountVerifiedCustomer),
);

const selectLoadingCountRequestedCustomer = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loadingCountRequestedCustomer),
);

const selectLoadingCountCountry = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loadingCountCountry),
);

const selectCountTotalCustomer = createSelector(
  [selectRaw],
  (raw) => raw.countTotalCustomer,
);

const selectCountVerifiedCustomer = createSelector(
  [selectRaw],
  (raw) => raw.countVerifiedCustomer,
);

const selectCountRequestedCustomer = createSelector(
  [selectRaw],
  (raw) => raw.countRequestedCustomer,
);

const selectCountCountry = createSelector(
  [selectRaw],
  (raw) => raw.countCountry,
);

const dashboardSelectors = {
  selectRaw,
  selectLoadingCountTotalCustomer,
  selectLoadingCountVerifiedCustomer,
  selectLoadingCountRequestedCustomer,
  selectLoadingCountCountry,
  selectCountTotalCustomer,
  selectCountVerifiedCustomer,
  selectCountRequestedCustomer,
  selectCountCountry,
};

export default dashboardSelectors;
