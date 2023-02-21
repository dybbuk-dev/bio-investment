import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/property/importer/propertyImporterActions';
import fields from 'src/modules/property/importer/propertyImporterFields';
import importerHoc from 'src/view/shared/importer/Importer';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/property/importer/propertyImporterSelectors';

function PropertyImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('property.importer.hint'),
  );

  return (
    <Card>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        p={2.4}
      >
        <MDTypography variant="h3">
          {i18n('property.importer.title')}
        </MDTypography>
      </MDBox>
      <Importer />
    </Card>
  );
}

export default PropertyImportPage;
