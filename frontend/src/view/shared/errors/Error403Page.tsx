import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import selectors from 'src/modules/auth/authSelectors';
import MDButton from 'src/mui/components/MDButton';
import { Card } from '@mui/material';
import BrandLogo from 'src/view/auth/components/BrandLogo';
import MDBox from 'src/mui/components/MDBox';
import BasicLayout from 'src/mui/shared/Layouts/BasicLayout';
import MDTypography from 'src/mui/components/MDTypography';
import { useSelector } from 'react-redux';

const Error403Page = () => {
  const { sidenavColor } = selectMuiSettings();

  return (
    <>
      <BasicLayout>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="white"
            borderRadius="lg"
            coloredShadow="dark"
            mx={1.6}
            mt={-2.4}
            p={1.6}
            mb={0.8}
            textAlign="center"
          >
            <MDBox
              display="flex"
              justifyContent="center"
              py={1.6}
            >
              <BrandLogo width="80%" />
            </MDBox>
          </MDBox>
          <MDBox pt={3.2} pb={3.2} px={2.4}>
            <MDTypography variant="h3" textAlign="center">
              403
            </MDTypography>
            <MDTypography
              variant="h6"
              textAlign="center"
              my={2.4}
            >
              {i18n('errors.403')}
            </MDTypography>
            <MDButton
              component={Link}
              to="/admin"
              variant="gradient"
              color="blue"
              type="button"
              fullWidth
            >
              {i18n('errors.backToHome')}
            </MDButton>
          </MDBox>
        </Card>
      </BasicLayout>
    </>
  );
};

export default Error403Page;
