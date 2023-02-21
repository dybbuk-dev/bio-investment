import { createSelector } from 'reselect';

const selectRaw = (state) => state.property.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const propertyViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default propertyViewSelectors;
