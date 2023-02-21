import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import customerEnumerators from 'src/modules/customer/customerEnumerators';
import { getNames } from 'country-list';
import MDInput from 'src/mui/components/MDInput';

function VerificationFormLayout(props) {
  return (
    <Card>
      <MDBox p={2.4}>
        <Grid container spacing={3.2}>
          <Grid item xs={12}>
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h5">
                    {i18n('customer.subTitle.profileData')}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="text"
                    fontWeight="bold"
                  />
                </MDBox>
              </Grid>
              <Grid item md={4} xs={12}>
                <ImagesFormItem
                  name="avatars"
                  label={i18n('user.fields.avatars')}
                  storage={
                    Storage.values.userAvatarsProfiles
                  }
                  max={1}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <Grid container spacing={2.4}>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="firstName"
                      label={i18n('user.fields.firstName')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="lastName"
                      label={i18n('user.fields.lastName')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DatePickerFormItem
                      name="birthday"
                      label={i18n('user.fields.birthday')}
                      required={true}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="phoneNumber"
                      label={i18n(
                        'user.fields.phoneNumber',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <MDInput
                      id="email"
                      name="email"
                      label={i18n('user.fields.email')}
                      value={props.email}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
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
                <Grid container spacing={1.6}>
                  <Grid item xs={12}>
                    <SelectFormItem
                      name="identityType"
                      label={i18n(
                        'user.fields.identityType.label',
                      )}
                      options={customerEnumerators.identityType.map(
                        (value) => ({
                          value,
                          label: i18n(
                            `user.fields.identityType.${value}`,
                          ),
                        }),
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <InputFormItem
                      name="address"
                      label={i18n('user.fields.address')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SelectFormItem
                      name="country"
                      label={i18n('user.fields.country')}
                      options={getNames().map((value) => ({
                        value,
                        label: value,
                      }))}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="state"
                      label={i18n('user.fields.state')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputFormItem
                      name="city"
                      label={i18n('user.fields.city')}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SelectFormItem
                      name="nationality"
                      label={i18n(
                        'user.fields.nationality',
                      )}
                      options={getNames().map((value) => ({
                        value,
                        label: value,
                      }))}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6} xs={12}>
                <ImagesFormItem
                  name="identityImages"
                  label={i18n('user.fields.identityImages')}
                  storage={Storage.values.identityImages}
                  max={2}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default VerificationFormLayout;
