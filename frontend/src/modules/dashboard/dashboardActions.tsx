import { getHistory } from 'src/modules/store';
import authSelectors from 'src/modules/auth/authSelectors';
import Errors from 'src/modules/shared/error/errors';
import dashboardSelectors from 'src/modules/dashboard/dashboardSelectors';
import DashboardService from 'src/modules/dashboard/dashboardService';

const prefix = 'DASHBOARD_ACTIONS';

const dashboardActions = {
  COUNT_TOTAL_CUSTOMER_STARTED: `${prefix}_COUNT_TOTAL_CUSTOMER_STARTED`,
  COUNT_TOTAL_CUSTOMER_SUCCESS: `${prefix}_COUNT_TOTAL_CUSTOMER_SUCCESS`,
  COUNT_TOTAL_CUSTOMER_ERROR: `${prefix}_COUNT_TOTAL_CUSTOMER_ERROR`,

  COUNT_VERIFIED_CUSTOMER_STARTED: `${prefix}_COUNT_VERIFIED_CUSTOMER_STARTED`,
  COUNT_VERIFIED_CUSTOMER_SUCCESS: `${prefix}_COUNT_VERIFIED_CUSTOMER_SUCCESS`,
  COUNT_VERIFIED_CUSTOMER_ERROR: `${prefix}_COUNT_VERIFIED_CUSTOMER_ERROR`,

  COUNT_REQUESTED_CUSTOMER_STARTED: `${prefix}_COUNT_REQUESTED_CUSTOMER_STARTED`,
  COUNT_REQUESTED_CUSTOMER_SUCCESS: `${prefix}_COUNT_REQUESTED_CUSTOMER_SUCCESS`,
  COUNT_REQUESTED_CUSTOMER_ERROR: `${prefix}_COUNT_REQUESTED_CUSTOMER_ERROR`,

  COUNT_COUNTRY_STARTED: `${prefix}_COUNT_COUNTRY_STARTED`,
  COUNT_COUNTRY_SUCCESS: `${prefix}_COUNT_COUNTRY_SUCCESS`,
  COUNT_COUNTRY_ERROR: `${prefix}_COUNT_COUNTRY_ERROR`,

  doCountTotalCustomer: () => async (dispatch) => {
    try {
      dispatch({
        type: dashboardActions.COUNT_TOTAL_CUSTOMER_STARTED,
      });

      const count =
        await DashboardService.countTotalCustomer();

      dispatch({
        type: dashboardActions.COUNT_TOTAL_CUSTOMER_SUCCESS,
        payload: count,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: dashboardActions.COUNT_TOTAL_CUSTOMER_ERROR,
      });
    }
  },

  doCountVerifiedCustomer: () => async (dispatch) => {
    try {
      dispatch({
        type: dashboardActions.COUNT_VERIFIED_CUSTOMER_STARTED,
      });

      const count =
        await DashboardService.countVerifiedCustomer();

      dispatch({
        type: dashboardActions.COUNT_VERIFIED_CUSTOMER_SUCCESS,
        payload: count,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: dashboardActions.COUNT_VERIFIED_CUSTOMER_ERROR,
      });
    }
  },

  doCountRequestedCustomer: () => async (dispatch) => {
    try {
      dispatch({
        type: dashboardActions.COUNT_REQUESTED_CUSTOMER_STARTED,
      });

      const count =
        await DashboardService.countRequestedCustomer();

      dispatch({
        type: dashboardActions.COUNT_REQUESTED_CUSTOMER_SUCCESS,
        payload: count,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: dashboardActions.COUNT_REQUESTED_CUSTOMER_ERROR,
      });
    }
  },

  doCountCountry: () => async (dispatch) => {
    try {
      dispatch({
        type: dashboardActions.COUNT_TOTAL_CUSTOMER_STARTED,
      });

      const count = await DashboardService.countCountry();

      dispatch({
        type: dashboardActions.COUNT_COUNTRY_SUCCESS,
        payload: count,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: dashboardActions.COUNT_COUNTRY_ERROR,
      });
    }
  },
};

export default dashboardActions;
