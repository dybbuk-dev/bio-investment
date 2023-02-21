import DashboardLayout from 'src/mui/shared/Layouts/DashboardLayout';
import Footer from 'src/mui/shared/Footer';
import Header from 'src/view/layout/Header';
import MDBox from 'src/mui/components/MDBox';
import React from 'react';

function Layout(props) {
  return (
    <DashboardLayout isCustomer={props.isCustomer}>
      <Header isCustomer={props.isCustomer} {...props} />
      <MDBox py={2.4}>{props.children}</MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Layout;
