import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/dashboard/dashboardSelectors';
import actions from 'src/modules/dashboard/dashboardActions';
import Spinner from 'src/view/shared/Spinner';

function DashboardPage(props) {
  const dispatch = useDispatch();

  const loadingCountTotalCustomer = useSelector(
    selectors.selectLoadingCountTotalCustomer,
  );
  const loadingCountVerifiedCustomer = useSelector(
    selectors.selectLoadingCountVerifiedCustomer,
  );
  const loadingCountRequestedCustomer = useSelector(
    selectors.selectLoadingCountRequestedCustomer,
  );
  const loadingCountCountry = useSelector(
    selectors.selectLoadingCountCountry,
  );

  const loading =
    loadingCountTotalCustomer ||
    loadingCountVerifiedCustomer ||
    loadingCountRequestedCustomer ||
    loadingCountCountry;

  const countTotalCustomer = useSelector(
    selectors.selectCountTotalCustomer,
  );
  const countVerifiedCustomer = useSelector(
    selectors.selectCountVerifiedCustomer,
  );
  const countRequestedCustomer = useSelector(
    selectors.selectCountRequestedCustomer,
  );
  const countCountry = useSelector(
    selectors.selectCountCountry,
  );

  useEffect(() => {
    dispatch(actions.doCountTotalCustomer());
    dispatch(actions.doCountVerifiedCustomer());
    dispatch(actions.doCountRequestedCustomer());
    dispatch(actions.doCountCountry());
  }, [dispatch]);

  if (loading) {
    return (
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt={6}
      >
        <Spinner />
      </MDBox>
    );
  }

  return (
    <MDBox p={2.4}>
      <Grid container spacing={12.4}>
        <Grid item md={6} xs={12}>
          <Card sx={{ pt: 1, pl: 2 }}>
            <MDTypography color="red">
              {i18n('dashboard.totalCustomer')}
            </MDTypography>
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '100%',
                py: 6,
              }}
            >
              <MDTypography variant="d1">
                {countTotalCustomer}
              </MDTypography>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ pt: 1, pl: 2 }}>
            <MDTypography color="red">
              {i18n('dashboard.country')}
            </MDTypography>
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '100%',
                py: 6,
              }}
            >
              <MDTypography variant="d1">
                {countCountry}
              </MDTypography>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ pt: 1, pl: 2 }}>
            <MDTypography color="red">
              {i18n('dashboard.verifiedCustomer')}
            </MDTypography>
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '100%',
                py: 6,
              }}
            >
              <MDTypography variant="d1">
                {countVerifiedCustomer}
              </MDTypography>
            </MDBox>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ pt: 1, pl: 2 }}>
            <MDTypography color="red">
              {i18n('dashboard.requestedCustomer')}
            </MDTypography>
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '100%',
                py: 6,
              }}
            >
              <MDTypography variant="d1">
                {countRequestedCustomer}
              </MDTypography>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default DashboardPage;
