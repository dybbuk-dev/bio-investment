import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TokenListFilter from 'src/view/admin/token/list/TokenListFilter';
import TokenListTable from 'src/view/admin/token/list/TokenListTable';
import TokenListToolbar from 'src/view/admin/token/list/TokenListToolbar';

function TokenListPage(props) {
  return (
    <Card>
      <MDBox pt={2.4} px={2.4}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          pb={2.4}
        >
          <MDTypography variant="h3">
            {i18n('token.title')}
          </MDTypography>
          <TokenListToolbar />
        </MDBox>
        <TokenListFilter />
      </MDBox>
      <TokenListTable />
    </Card>
  );
}

export default TokenListPage;
