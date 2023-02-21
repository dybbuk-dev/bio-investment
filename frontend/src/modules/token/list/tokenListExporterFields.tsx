import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'tokenNumber',
    label: i18n('token.fields.tokenNumber'),
  },
  {
    name: 'name',
    label: i18n('token.fields.name'),
  },
  {
    name: 'category',
    label: i18n('token.fields.category'),
  },
  {
    name: 'tokenPrice',
    label: i18n('token.fields.tokenPrice'),
  },
  {
    name: 'status',
    label: i18n('token.fields.status'),
  },
  {
    name: 'tokenAddress',
    label: i18n('token.fields.tokenAddress'),
  },
  {
    name: 'createdAt',
    label: i18n('token.fields.createdAt'),
    render: exporterRenders.date(),
  },
  {
    name: 'updatedAt',
    label: i18n('token.fields.updatedAt'),
    render: exporterRenders.date(),
  },
];
