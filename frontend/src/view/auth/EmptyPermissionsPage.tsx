import BrandLogo from './components/BrandLogo';
import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import actions from 'src/modules/auth/authActions';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/auth/authSelectors';
import BasicLayout from 'src/mui/shared/Layouts/BasicLayout';

function EmptyPermissionsPage(props) {
  const dispatch = useDispatch();

  const doSignout = () => {
    dispatch(actions.doSignout());
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
          <MDTypography variant="h6" textAlign="center">
            {i18n('auth.emptyPermissions.message')}
          </MDTypography>
          <MDBox
            display="flex"
            pt={3.2}
            pb={1.6}
            justifyContent="center"
          >
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
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default EmptyPermissionsPage;
