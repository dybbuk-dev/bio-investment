import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/token/importer/tokenImporterActions';
import fields from 'src/modules/token/importer/tokenImporterFields';
import importerHoc from 'src/view/shared/importer/Importer';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/token/importer/tokenImporterSelectors';

function TokenImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('token.importer.hint'),
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
          {i18n('token.importer.title')}
        </MDTypography>
      </MDBox>
      <Importer />
    </Card>
  );
}

export default TokenImportPage;
