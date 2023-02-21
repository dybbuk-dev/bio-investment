import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { getNames } from 'country-list';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import { GOOGLE_MAPS_API_KEY } from 'src/config/common';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import MDBox from 'src/mui/components/MDBox';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import tokenEnumerators from 'src/modules/token/tokenEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

const schema = yup.object().shape({
  name: yupFormSchemas.string(i18n('token.fields.name'), {
    required: true,
    min: 1,
    max: 255,
  }),
  country: yupFormSchemas.string(
    i18n('token.fields.country'),
    {
      required: true,
      min: 1,
      max: 50,
    },
  ),
  city: yupFormSchemas.string(i18n('token.fields.city'), {
    required: true,
    min: 1,
    max: 50,
  }),
  tokenType: yupFormSchemas.enumerator(
    i18n('token.fields.tokenType'),
    {
      required: true,
      options: tokenEnumerators.tokenType,
    },
  ),
  address: yupFormSchemas.string(
    i18n('token.fields.address'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  coordinateX: yupFormSchemas.decimal(
    i18n('token.fields.coordinateX'),
    {
      required: true,
    },
  ),
  coordinateY: yupFormSchemas.decimal(
    i18n('token.fields.coordinateY'),
    {
      required: true,
    },
  ),
  tokenName: yupFormSchemas.string(
    i18n('token.fields.tokenName'),
    {
      required: true,
      min: 1,
      max: 50,
    },
  ),
  description: yupFormSchemas.string(
    i18n('token.fields.description'),
    {},
  ),
  initialRentDate: yupFormSchemas.date(
    i18n('token.fields.initialRentDate'),
    {
      required: true,
    },
  ),
  durationProjectInMonth: yupFormSchemas.integer(
    i18n('token.fields.durationProjectInMonth'),
    {
      min: 0,
      max: 200,
    },
  ),
  status: yupFormSchemas.enumerator(
    i18n('token.fields.status'),
    {
      required: true,
      options: tokenEnumerators.status,
    },
  ),
  tokenAddress: yupFormSchemas.string(
    i18n('token.fields.tokenAddress'),
    {
      required: true,
      min: 1,
      max: 50,
    },
  ),
  initialDateSTO: yupFormSchemas.date(
    i18n('token.fields.initialDateSTO'),
    {},
  ),
  endDateSTO: yupFormSchemas.date(
    i18n('token.fields.endDateSTO'),
    {},
  ),
  suppliedTokensNumber: yupFormSchemas.decimal(
    i18n('token.fields.suppliedTokensNumber'),
    {},
  ),
  investorsNumber: yupFormSchemas.integer(
    i18n('token.fields.investorsNumber'),
    {},
  ),
  tokenPrice: yupFormSchemas.decimal(
    i18n('token.fields.tokenPrice'),
    {},
  ),
  tokenizedCostAmount: yupFormSchemas.decimal(
    i18n('token.fields.tokenizedCostAmount'),
    {},
  ),
  softcap: yupFormSchemas.decimal(
    i18n('token.fields.softcap'),
    {},
  ),
  hardcap: yupFormSchemas.decimal(
    i18n('token.fields.hardcap'),
    {},
  ),
  photographs: yupFormSchemas.images(
    i18n('token.fields.photographs'),
    {
      min: 1,
      max: 10,
    },
  ),
  TIR: yupFormSchemas.decimal(i18n('token.fields.TIR'), {}),
  accumulatedAndDistributedProfits: yupFormSchemas.decimal(
    i18n('token.fields.accumulatedAndDistributedProfits'),
    {},
  ),
  APY: yupFormSchemas.decimal(i18n('token.fields.APY'), {
    required: true,
  }),
  minAmountOnSelling: yupFormSchemas.decimal(
    i18n('token.fields.minAmountOnSelling'),
    {},
  ),
});

function TokenForm(props) {
  const [coordinates, setCoordinates] = useState(() => {
    const record = props.record || {};

    if (record.coordinates) {
      return {
        lat: record.coordinates[0],
        lng: record.coordinates[1],
      };
    } else
      return {
        lat: -33.447487,
        lng: -70.673676,
      };
  });
  Geocode.setApiKey(GOOGLE_MAPS_API_KEY);
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

  const _onClick = ({ x, y, lat, lng, event }) => {
    setCoordinates({ lat, lng });
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address =
          response.results[0].formatted_address;
        let city, countryValue;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j <
            response.results[0].address_components[i].types
              .length;
            j++
          ) {
            switch (
              response.results[0].address_components[i]
                .types[j]
            ) {
              case 'locality':
                city =
                  response.results[0].address_components[i]
                    .long_name;
                break;
              case 'country':
                countryValue =
                  response.results[0].address_components[i]
                    .long_name;
                break;
            }
          }
        }

        form.setValue('country', countryValue);
        form.setValue('city', city);
        form.setValue('address', address);
        form.setValue('coordinateX', lat);
        form.setValue('coordinateY', lng);

        dispatch(formActions.doRefresh());
      },
      (error) => {
        console.error(error);
      },
    );
  };
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      country: record.country,
      city: record.city,
      tokenType: record.tokenType,
      address: record.address,
      coordinateX: record.coordinates
        ? record.coordinates[0]
        : '',
      coordinateY: record.coordinates
        ? record.coordinates[1]
        : '',
      tokenName: record.tokenName,
      description: record.description,
      initialRentDate: record.initialRentDate,
      durationProjectInMonth: record.durationProjectInMonth,
      status: record.status,
      tokenAddress: record.tokenAddress,
      initialDateSTO: record.initialDateSTO,
      endDateSTO: record.endDateSTO,
      suppliedTokensNumber: record.suppliedTokensNumber,
      investorsNumber: record.investorsNumber,
      tokenPrice: record.tokenPrice,
      tokenizedCostAmount: record.tokenizedCostAmount,
      softcap: record.softcap,
      hardcap: record.hardcap,
      photographs: record.photographs || [],
      TIR: record.TIR,
      accumulatedAndDistributedProfits:
        record.accumulatedAndDistributedProfits,
      APY: record.APY,
      minAmountOnSelling: record.minAmountOnSelling,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    const coordinates = [
      values.coordinateX,
      values.coordinateY,
    ];
    props.onSubmit(props.record?.id, {
      ...values,
      coordinates,
    });
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading, modal } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={1.6} container sx={{ mb: 3 }}>
            <Grid item md={6} xs={12}>
              <Grid container spacing={1.6}>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="name"
                    label={i18n('token.fields.name')}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <SelectFormItem
                    name="tokenType"
                    label={i18n('token.fields.tokenType')}
                    options={tokenEnumerators.tokenType.map(
                      (value) => ({
                        value,
                        label: value,
                      }),
                    )}
                    required
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <SelectFormItem
                    name="status"
                    label={i18n('token.fields.status')}
                    options={tokenEnumerators.status.map(
                      (value) => ({
                        value,
                        label: value,
                      }),
                    )}
                    required
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <SelectFormItem
                    name="country"
                    label={i18n('token.fields.country')}
                    options={getNames().map((value) => ({
                      value,
                      label: value,
                    }))}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="city"
                    label={i18n('token.fields.city')}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputFormItem
                    name="address"
                    label={i18n('token.fields.address')}
                    variant="standard"
                    onBlur={(event) => {
                      Geocode.fromAddress(
                        event.target.value,
                      ).then(
                        (response) => {
                          const { lat, lng } =
                            response.results[0].geometry
                              .location;

                          setCoordinates({ lat, lng });
                          const address =
                            response.results[0]
                              .formatted_address;

                          let city, countryValue;
                          for (
                            let i = 0;
                            i <
                            response.results[0]
                              .address_components.length;
                            i++
                          ) {
                            for (
                              let j = 0;
                              j <
                              response.results[0]
                                .address_components[i].types
                                .length;
                              j++
                            ) {
                              switch (
                                response.results[0]
                                  .address_components[i]
                                  .types[j]
                              ) {
                                case 'locality':
                                  city =
                                    response.results[0]
                                      .address_components[i]
                                      .long_name;
                                  break;
                                case 'country':
                                  countryValue =
                                    response.results[0]
                                      .address_components[i]
                                      .long_name;
                                  break;
                              }
                            }
                          }

                          form.setValue(
                            'country',
                            countryValue,
                          );
                          form.setValue('city', city);
                          form.setValue('address', address);
                          form.setValue('coordinateX', lat);
                          form.setValue('coordinateY', lng);

                          dispatch(formActions.doRefresh());
                        },
                        (error) => {
                          console.error(error);
                        },
                      );
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="coordinateX"
                    label={i18n('token.fields.coordinateX')}
                    variant="standard"
                    disabled
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="coordinateY"
                    label={i18n('token.fields.coordinateY')}
                    variant="standard"
                    disabled
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
                  center={{
                    lat: coordinates.lat,
                    lng: coordinates.lng,
                  }}
                  defaultZoom={11}
                  onClick={_onClick}
                >
                  <Marker
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                  />
                </GoogleMapReact>
              </MDBox>
            </Grid>
            <Grid item xs={12} sx={{ mb: 6 }}>
              <TextAreaFormItem
                name="description"
                label={i18n('token.fields.description')}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="tokenName"
                label={i18n('token.fields.tokenName')}
                variant="standard"
                required
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="tokenAddress"
                label={i18n('token.fields.tokenAddress')}
                variant="standard"
                required
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="tokenPrice"
                label={i18n('token.fields.tokenPrice')}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="tokenizedCostAmount"
                label={i18n(
                  'token.fields.tokenizedCostAmount',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="softcap"
                label={i18n('token.fields.softcap')}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12} sx={{ mb: 6 }}>
              <InputFormItem
                name="hardcap"
                label={i18n('token.fields.hardcap')}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container spacing={1.6}>
                <Grid item md={6} xs={12}>
                  <DatePickerFormItem
                    name="initialRentDate"
                    label={i18n(
                      'token.fields.initialRentDate',
                    )}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="durationProjectInMonth"
                    label={i18n(
                      'token.fields.durationProjectInMonth',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <DatePickerFormItem
                    name="initialDateSTO"
                    label={i18n(
                      'token.fields.initialDateSTO',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <DatePickerFormItem
                    name="endDateSTO"
                    label={i18n('token.fields.endDateSTO')}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="suppliedTokensNumber"
                    label={i18n(
                      'token.fields.suppliedTokensNumber',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="investorsNumber"
                    label={i18n(
                      'token.fields.investorsNumber',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="TIR"
                    label={i18n('token.fields.TIR')}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="accumulatedAndDistributedProfits"
                    label={i18n(
                      'token.fields.accumulatedAndDistributedProfits',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="APY"
                    label={i18n('token.fields.APY')}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="minAmountOnSelling"
                    label={i18n(
                      'token.fields.minAmountOnSelling',
                    )}
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={12}>
              <ImagesFormItem
                name="photographs"
                label={i18n('token.fields.photographs')}
                storage={Storage.values.tokenPhotographs}
                max={10}
              />
            </Grid>
          </Grid>
          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </MDButton>

            <MDButton
              variant="outlined"
              color={sidenavColor}
              disabled={saveLoading}
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </MDButton>

            {props.onCancel ? (
              <MDButton
                variant="outlined"
                color={sidenavColor}
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </MDButton>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default TokenForm;
