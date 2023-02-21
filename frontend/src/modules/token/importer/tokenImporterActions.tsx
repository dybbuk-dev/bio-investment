import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/token/importer/tokenImporterSelectors';
import TokenService from 'src/modules/token/tokenService';
import fields from 'src/modules/token/importer/tokenImporterFields';
import { i18n } from 'src/i18n';

const tokenImporterActions = importerActions(
  'TOKEN_IMPORTER',
  selectors,
  TokenService.import,
  fields,
  i18n('token.importer.fileName'),
);

export default tokenImporterActions;
