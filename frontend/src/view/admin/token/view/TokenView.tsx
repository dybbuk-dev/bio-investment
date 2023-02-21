import { useState } from 'react';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GOOGLE_MAPS_API_KEY } from 'src/config/common';
import MDBox from 'src/mui/components/MDBox';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';

function TokenView(props) {
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

  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container sx={{ mb: 3 }}>
        <Grid item md={6} xs={12}>
          <Grid container spacing={1.6}>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.tokenNumber')}
                value={record.tokenNumber}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.name')}
                value={record.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.tokenType')}
                value={record.tokenType}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.status')}
                value={record.status}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.country')}
                value={record.country}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.city')}
                value={record.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextViewItem
                label={i18n('token.fields.address')}
                value={record.address}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.coordinateX')}
                value={record.coordinates[0]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.coordinateY')}
                value={record.coordinates[1]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <MDBox width={'100%'} height={280}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
              }}
              defaultCenter={{
                lat: record.coordinates[0],
                lng: record.coordinates[1],
              }}
              defaultZoom={11}
            >
              <Marker
                lat={record.coordinates[0]}
                lng={record.coordinates[1]}
              />
            </GoogleMapReact>
          </MDBox>
        </Grid>
        <Grid item xs={12} sx={{ mb: 6 }}>
          <TextViewItem
            label={i18n('token.fields.description')}
            value={record.description}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.tokenName')}
            value={record.tokenName}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.tokenAddress')}
            value={record.tokenAddress}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.tokenPrice')}
            value={record.tokenPrice}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.tokenizedCostAmount')}
            value={record.tokenizedCostAmount}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.softcap')}
            value={record.softcap}
          />
        </Grid>
        <Grid item md={4} xs={12} sx={{ mb: 6 }}>
          <TextViewItem
            label={i18n('token.fields.hardcap')}
            value={record.hardcap}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container spacing={1.6}>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.initialRentDate')}
                value={moment(
                  record.initialRentDate,
                ).format(DEFAULT_MOMENT_FORMAT_DATE_ONLY)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n(
                  'token.fields.durationProjectInMonth',
                )}
                value={record.durationProjectInMonth}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.initialDateSTO')}
                value={moment(record.initialDateSTO).format(
                  DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.endDateSTO')}
                value={moment(record.endDateSTO).format(
                  DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n(
                  'token.fields.suppliedTokensNumber',
                )}
                value={record.suppliedTokensNumber}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.investorsNumber')}
                value={record.investorsNumber}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.TIR')}
                value={record.TIR}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n(
                  'token.fields.accumulatedAndDistributedProfits',
                )}
                value={
                  record.accumulatedAndDistributedProfits
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.APY')}
                value={record.APY}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n(
                  'token.fields.minAmountOnSelling',
                )}
                value={record.minAmountOnSelling}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <ImagesViewItem
            label={i18n('token.fields.photographs')}
            value={record.photographs}
          />
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default TokenView;
