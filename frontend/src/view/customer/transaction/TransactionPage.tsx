import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TransactionFilter from 'src/view/customer/transaction/TransactionFilter';
import TransactionTable from 'src/view/customer/transaction/TransactionTable';
import TransactionToolbar from 'src/view/customer/transaction/TransactionToolbar';

function TransactionPage(props) {
  return (
    <>
      <Card>
        <MDBox pt={2.4} px={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n('customer.transaction.title')}
            </MDTypography>
            <TransactionToolbar />
          </MDBox>
        </MDBox>
        <MDBox px={2.4}>
          <TransactionFilter />
        </MDBox>
        <TransactionTable />
      </Card>
    </>
  );
}

export default TransactionPage;
