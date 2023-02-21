import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import CustomerFormLayout from 'src/view/admin/customer/form/CustomerFormLayout';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

const schema = yup.object().shape({
  firstName: yupFormSchemas.string(
    i18n('user.fields.firstName'),
    {
      required: true,
      max: 80,
    },
  ),
  lastName: yupFormSchemas.string(
    i18n('user.fields.lastName'),
    {
      required: true,
      max: 175,
    },
  ),
  phoneNumber: yupFormSchemas.string(
    i18n('user.fields.phoneNumber'),
    {
      required: true,
      matches: /^[0-9]/,
      max: 24,
    },
  ),
  birthday: yupFormSchemas.date(
    i18n('user.fields.birthday'),
    {
      required: true,
    },
  ),
  address: yupFormSchemas.string(
    i18n('user.fields.address'),
    {
      required: true,
    },
  ),
  state: yupFormSchemas.string(i18n('user.fields.state'), {
    required: true,
  }),
  city: yupFormSchemas.string(i18n('user.fields.city'), {
    required: true,
  }),
  country: yupFormSchemas.string(
    i18n('user.fields.country'),
    {
      required: true,
    },
  ),
  nationality: yupFormSchemas.string(
    i18n('user.fields.nationality'),
    {
      required: true,
    },
  ),
  avatars: yupFormSchemas.images(
    i18n('user.fields.avatars'),
    {
      required: true,
      max: 1,
    },
  ),
});

function CustomerForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const customer = props.customer || {};

  const [initialValues] = useState(() => {
    return {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      birthday: customer.birthday,
      avatars: customer.avatars || [],
      address: customer.address,
      state: customer.state,
      city: customer.city,
      country: customer.country,
      nationality: customer.nationality,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    console.log(values);

    props.onSubmit(props.customer?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading } = props;

  const makeFormButtons = () => {
    return (
      <FormButtons>
        <MDButton
          variant="gradient"
          color={sidenavColor}
          disabled={saveLoading}
          type="submit"
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
    );
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h4">
              {i18n('customer.edit.title')}
            </MDTypography>
            {makeFormButtons()}
          </MDBox>
          <CustomerFormLayout email={customer.email} />
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default CustomerForm;
