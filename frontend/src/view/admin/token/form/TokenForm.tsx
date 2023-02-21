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
  category: yupFormSchemas.enumerator(
    i18n('token.fields.category'),
    {
      required: true,
      options: tokenEnumerators.category,
    },
  ),
  description: yupFormSchemas.string(
    i18n('token.fields.description'),
    {},
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
  tokenDuration: yupFormSchemas.integer(
    i18n('token.fields.tokenDuration'),
    {},
  ),
  monthlyProfit: yupFormSchemas.decimal(
    i18n('token.fields.monthlyProfit'),
    {},
  ),
  tokenImage: yupFormSchemas.images(
    i18n('token.fields.tokenImage'),
    {
      min: 1,
      max: 10,
    },
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
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      category: record.category,
      description: record.description,
      status: record.status,
      tokenAddress: record.tokenAddress,
      suppliedTokensNumber: record.suppliedTokensNumber,
      investorsNumber: record.investorsNumber,
      tokenPrice: record.tokenPrice,
      tokenizedCostAmount: record.tokenizedCostAmount,
      softcap: record.softcap,
      hardcap: record.hardcap,
      tokenImage: record.tokenImage || [],
      tokenDuration: record.tokenDuration,
      monthlyProfit: record.monthlyProfit,
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
            <Grid item md={4} xs={12}>
              <ImagesFormItem
                name="tokenImage"
                label={i18n('token.fields.tokenImage')}
                storage={Storage.values.tokenImage}
                max={1}
              />
            </Grid>
            <Grid item md={8} xs={12} sx={{ mb: 6 }}>
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
                    name="category"
                    label={i18n('token.fields.category')}
                    options={tokenEnumerators.category.map(
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
                  <InputFormItem
                    name="tokenAddress"
                    label={i18n(
                      'token.fields.tokenAddress',
                    )}
                    variant="standard"
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="tokenPrice"
                    label={i18n('token.fields.tokenPrice')}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="tokenizedCostAmount"
                    label={i18n(
                      'token.fields.tokenizedCostAmount',
                    )}
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="softcap"
                label={i18n('token.fields.softcap')}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="hardcap"
                label={i18n('token.fields.hardcap')}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="suppliedTokensNumber"
                label={i18n(
                  'token.fields.suppliedTokensNumber',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="investorsNumber"
                label={i18n('token.fields.investorsNumber')}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="tokenDuration"
                label={i18n('token.fields.tokenDuration')}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="monthlyProfit"
                label={i18n('token.fields.monthlyProfit')}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <InputFormItem
                name="APY"
                label={i18n('token.fields.APY')}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12} sx={{ mb: 6 }}>
              <InputFormItem
                name="minAmountOnSelling"
                label={i18n(
                  'token.fields.minAmountOnSelling',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextAreaFormItem
                name="description"
                label={i18n('token.fields.description')}
                variant="standard"
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
