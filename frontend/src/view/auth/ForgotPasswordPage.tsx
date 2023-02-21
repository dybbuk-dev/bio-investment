import BrandLogo from './components/BrandLogo';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/auth/authActions';
import Card from '@mui/material/Card';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import BasicLayout from 'src/mui/shared/Layouts/BasicLayout';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
    max: 255,
  }),
});

function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const loading = useSelector(
    selectors.selectLoadingPasswordResetEmail,
  );

  const [initialValues] = useState(() => ({ email: '' }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = async ({ email }) => {
    await dispatch(actions.doSendPasswordResetEmail(email));
    Object.keys(initialValues).forEach((key: any) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <BasicLayout>
      <Card>
        <GradientTitle>
          <MDBox
            display="flex"
            justifyContent="center"
            py={1.6}
          >
            <BrandLogo width="80%" />
          </MDBox>
        </GradientTitle>
        <MDBox pt={3.2} pb={2.4} px={2.4}>
          <FormProvider {...form}>
            <MDBox
              component="form"
              role="form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <MDBox mb={1.6}>
                <InputFormItem
                  name={'email'}
                  label={i18n('user.fields.email')}
                  autoComplete={'email'}
                  disabled={loading}
                  autoFocus
                />
              </MDBox>
              <MDBox mt={1.6} mb={0.8}>
                <MDButton
                  style={{ marginTop: '12.8px' }}
                  variant="gradient"
                  color="blue"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {i18n('auth.passwordResetEmail.message')}
                </MDButton>
              </MDBox>
              <MDBox mt={2.4} mb={0.8} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    to="/admin/auth/signin"
                    variant="button"
                    color="blue"
                    fontWeight="medium"
                    textGradient
                  >
                    {i18n('common.cancel')}
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </FormProvider>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default ForgotPasswordPage;
