import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'propertyNumber',
    label: i18n('property.fields.propertyNumber'),
  },
  {
    name: 'name',
    label: i18n('property.fields.name'),
  },
  {
    name: 'country',
    label: i18n('property.fields.country'),
  },
  {
    name: 'city',
    label: i18n('property.fields.city'),
  },
  {
    name: 'address',
    label: i18n('property.fields.address'),
  },
  {
    name: 'tokenName',
    label: i18n('property.fields.tokenName'),
  },
  {
    name: 'status',
    label: i18n('property.fields.status'),
  },
  {
    name: 'tokenAddress',
    label: i18n('property.fields.tokenAddress'),
  },
  {
    name: 'createdAt',
    label: i18n('property.fields.createdAt'),
    render: exporterRenders.date(),
  },
  {
    name: 'updatedAt',
    label: i18n('property.fields.updatedAt'),
    render: exporterRenders.date(),
  },
];
