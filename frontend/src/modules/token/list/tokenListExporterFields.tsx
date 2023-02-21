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
    name: 'country',
    label: i18n('token.fields.country'),
  },
  {
    name: 'city',
    label: i18n('token.fields.city'),
  },
  {
    name: 'address',
    label: i18n('token.fields.address'),
  },
  {
    name: 'tokenName',
    label: i18n('token.fields.tokenName'),
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
