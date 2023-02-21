import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/property/importer/propertyImporterSelectors';
import PropertyService from 'src/modules/property/propertyService';
import fields from 'src/modules/property/importer/propertyImporterFields';
import { i18n } from 'src/i18n';

const propertyImporterActions = importerActions(
  'PROPERTY_IMPORTER',
  selectors,
  PropertyService.import,
  fields,
  i18n('property.importer.fileName'),
);

export default propertyImporterActions;
