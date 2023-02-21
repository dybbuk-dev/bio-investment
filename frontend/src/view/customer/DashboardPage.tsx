import { Card } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import selectors from 'src/modules/auth/authSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { i18n } from 'src/i18n';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_MAPS_API_KEY } from 'src/config/common';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function DashboardPage(props) {
  const { sidenavColor } = selectMuiSettings();

  const status = useSelector(selectors.selectStatus);

  const Marker = (lat, lng) => (
    <LocationOnIcon
      color="primary"
      fontSize="large"
      sx={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
      }}
    />
  );

  return (
    <MDBox p={2.4}>
      <Grid container spacing={2.4}>
        {status !== 'active' && (
          <Grid item xs={12}>
            <Card>
              <MDBox p={2.4}>
                <Grid container spacing={1.6}>
                  <Grid item xs={12}>
                    <MDTypography variant="h5">
                      {i18n(
                        `customer.verification.${status}.title`,
                      )}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12}>
                    <MDBox px={2.4}>
                      <Grid container spacing={1.6}>
                        <Grid
                          item
                          md={
                            status === 'requested' ? 12 : 10
                          }
                          xs={12}
                        >
                          <MDTypography>
                            {i18n(
                              `customer.verification.${status}.description`,
                            )}
                          </MDTypography>
                        </Grid>
                        {status !== 'requested' && (
                          <Grid item md={2} xs={12}>
                            <MDBox
                              display="flex"
                              justifyContent="flex-end"
                              alignItems="end"
                            >
                              <MDButton
                                component={Link}
                                to={`/customer/verification`}
                                variant="gradient"
                                color={sidenavColor}
                                type="button"
                                size="large"
                                sx={{ px: 4, py: 2 }}
                              >
                                {i18n(
                                  `customer.verification.${status}.button`,
                                )}
                              </MDButton>
                            </MDBox>
                          </Grid>
                        )}
                      </Grid>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        )}
        <Grid item md={6} xs={12}>
          <Grid container spacing={2.4}>
            <Grid item lg={6} xs={12}>
              <Card sx={{ pt: 1, pl: 2 }}>
                <MDTypography
                  color="red"
                  variant="subtitle2"
                >
                  {i18n('dashboard.totalInvested')}
                </MDTypography>
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: '100%',
                    py: 4,
                  }}
                >
                  <MDTypography variant="d5">
                    USD 100
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Card sx={{ pt: 1, pl: 2 }}>
                <MDTypography
                  color="red"
                  variant="subtitle2"
                >
                  {i18n('dashboard.token')}
                </MDTypography>
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: '100%',
                    py: 4,
                  }}
                >
                  <MDTypography variant="d5">
                    3
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Card sx={{ pt: 1, pl: 2 }}>
                <MDTypography
                  color="red"
                  variant="subtitle2"
                >
                  {i18n('dashboard.dividendsReceived')}
                </MDTypography>
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: '100%',
                    py: 4,
                  }}
                >
                  <MDTypography variant="d5">
                    USD 5.5
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Card sx={{ pt: 1, pl: 2 }}>
                <MDTypography
                  color="red"
                  variant="subtitle2"
                >
                  {i18n('dashboard.profit')}
                </MDTypography>
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: '100%',
                    py: 4,
                  }}
                >
                  <MDTypography variant="d5">
                    5.5%
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card sx={{ px: 2, py: 1 }}>
            <MDTypography color="red" variant="subtitle2">
              {i18n('dashboard.investmentLocations')}
            </MDTypography>
            <MDBox
              width={'100%'}
              height={300}
              sx={{ p: 1 }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: GOOGLE_MAPS_API_KEY,
                  language: 'en',
                }}
                defaultCenter={{
                  lat: 0,
                  lng: -20,
                }}
                defaultZoom={-30}
                options={{
                  disableDefaultUI: true,
                }}
              >
                <Marker lat={-33.449282} lng={-70.64908} />
              </GoogleMapReact>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default DashboardPage;
