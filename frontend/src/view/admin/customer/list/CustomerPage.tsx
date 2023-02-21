import { i18n } from 'src/i18n';
import Card from '@mui/material/Card';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import CustomerFilter from 'src/view/admin/customer/list/CustomerFilter';
import CustomerTable from 'src/view/admin/customer/list/CustomerTable';
import CustomerToolbar from 'src/view/admin/customer/list/CustomerToolbar';

function CustomerPage() {
  return (
    <>
      <Card sx={{ px: '20px' }}>
        <MDBox pt={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n('customer.title')}
            </MDTypography>
            <CustomerToolbar />
          </MDBox>
          <CustomerFilter />
        </MDBox>
        <CustomerTable />
      </Card>
    </>
  );
}

export default CustomerPage;
