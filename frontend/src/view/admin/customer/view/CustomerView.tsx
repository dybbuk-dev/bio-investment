import {
  Grid,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBox from 'src/mui/components/MDBox';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import MDTypography from 'src/mui/components/MDTypography';
import customerEnumerators from 'src/modules/customer/customerEnumerators';

function CustomerView(props) {
  const { customer, loading } = props;

  if (loading || !customer) {
    return <Spinner />;
  }

  return (
    <Card>
      <MDBox p={2.4}>
        <Grid spacing={1.6} container>
          <Grid item xs={12}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n('customer.subTitle.generalInfo')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  />
                </MDBox>
              </Grid>
              <Grid item md={4} xs={12}>
                <MDBox p={2.4}>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <MDBox
                        display="flex"
                        justifyContent="center"
                        px={4}
                      >
                        <LogoViewItem
                          value={customer.avatars}
                          max={1}
                          hiddenLabel
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
              <Grid item md={8} xs={12}>
                <MDBox p={2.4}>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <Grid container spacing={1.6}>
                        <Grid item md={6} xs={12}>
                          <TextViewItem
                            label={i18n('user.fields.name')}
                            value={customer.fullName}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'user.fields.email',
                            )}
                            value={customer.email}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'user.fields.birthday',
                            )}
                            value={moment(
                              customer.birthday,
                            ).format(
                              DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                            )}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'user.fields.phoneNumber',
                            )}
                            value={customer.phoneNumber}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextViewItem
                            label={i18n(
                              'user.fields.nationality',
                            )}
                            value={customer.nationality}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n(
                      'customer.subTitle.identityDocument',
                    )}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  />
                </MDBox>
              </Grid>
              <Grid item md={6} xs={12}>
                <MDBox p={2.4}>
                  <Grid container spacing={1.6}>
                    <Grid item xs={12}>
                      <TextViewItem
                        label={i18n(
                          'user.fields.identityType.label',
                        )}
                        value={
                          customer.identityType
                            ? i18n(
                                `user.fields.identityType.${customer.identityType}`,
                              )
                            : ''
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextViewItem
                        label={i18n('user.fields.address')}
                        value={customer.address}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextViewItem
                        label={i18n('user.fields.country')}
                        value={customer.country}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextViewItem
                        label={i18n('user.fields.state')}
                        value={customer.state}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextViewItem
                        label={i18n('user.fields.city')}
                        value={customer.city}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextViewItem
                        label={i18n(
                          'users.fields.nationality',
                        )}
                        value={customer.nationality}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
              <Grid item md={6} xs={12}>
                <MDBox p={2.4}>
                  <LogoViewItem
                    value={customer.identityImages}
                    max={2}
                    hiddenLabel
                  />
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default CustomerView;
