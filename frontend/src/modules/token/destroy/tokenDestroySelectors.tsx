import { createSelector } from 'reselect';

const selectRaw = (state) => state.token.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const tokenDestroySelectors = {
  selectLoading,
};

export default tokenDestroySelectors;
