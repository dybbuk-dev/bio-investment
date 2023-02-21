import BrandLogo from './components/BrandLogo';
import { Card } from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authActions from 'src/modules/auth/authActions';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import queryString from 'query-string';
import selectors from 'src/modules/auth/authSelectors';
import Spinner from 'src/view/shared/Spinner';
import BasicLayout from 'src/mui/shared/Layouts/BasicLayout';

function InvitationPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const loading = useSelector(
    selectors.selectLoadingInvitation,
  );
  const warningMessage = useSelector(
    selectors.selectWarningMessage,
  );

  const token = queryString.parse(location.search).token;

  useEffect(() => {
    dispatch(authActions.doAcceptFromAuth(token));
  }, [dispatch, token]);

  const doAcceptWithWrongEmail = () => {
    dispatch(authActions.doAcceptFromAuth(token, true));
  };

  const doSignout = async () => {
    await dispatch(authActions.doSignout());
    getHistory().push('/admin');
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
          {loading && <Spinner />}

          {Boolean(warningMessage) && (
            <MDTypography variant="h6" align="center">
              {warningMessage}
            </MDTypography>
          )}

          <MDBox
            mt={2.4}
            display="flex"
            justifyContent="center"
          >
            {Boolean(warningMessage) && (
              <MDButton
                variant="gradient"
                color="blue"
                type="button"
                fullWidth
                onClick={doAcceptWithWrongEmail}
              >
                {i18n('auth.invitation.acceptWrongEmail')}
              </MDButton>
            )}

            {!loading && (
              <MDTypography
                variant="button"
                color="blue"
                component={Link}
                to="#"
                onClick={doSignout}
                fontWeight="medium"
                textGradient
              >
                {i18n('auth.signout')}
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default InvitationPage;
