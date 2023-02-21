import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropertyListFilter from 'src/view/admin/property/list/PropertyListFilter';
import PropertyListTable from 'src/view/admin/property/list/PropertyListTable';
import PropertyListToolbar from 'src/view/admin/property/list/PropertyListToolbar';

function PropertyListPage(props) {
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
            {i18n('property.title')}
          </MDTypography>
          <PropertyListToolbar />
        </MDBox>
        <PropertyListFilter />
      </MDBox>
      <PropertyListTable />
    </Card>
  );
}

export default PropertyListPage;
