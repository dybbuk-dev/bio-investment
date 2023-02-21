import { createSelector } from 'reselect';

const selectRaw = (state) => state.property.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const propertyDestroySelectors = {
  selectLoading,
};

export default propertyDestroySelectors;
