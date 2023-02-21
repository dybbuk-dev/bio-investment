import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'fullName',
    label: i18n('user.fields.fullName'),
  },
  {
    name: 'avatars',
    label: i18n('user.fields.avatars'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'email',
    label: i18n('user.fields.email'),
  },
  {
    name: 'birthday',
    label: i18n('user.fields.birthday'),
    render: exporterRenders.date(),
  },
  {
    name: 'phoneNumber',
    label: i18n('user.fields.phoneNumber'),
  },
  {
    name: 'status',
    label: i18n('user.fields.status'),
  },
  {
    name: 'nationality',
    label: i18n('user.fields.nationality'),
  },
  {
    name: 'address',
    label: i18n('user.fields.address'),
  },
  {
    name: 'state',
    label: i18n('user.fields.state'),
  },
  {
    name: 'city',
    label: i18n('user.fields.city'),
  },
  {
    name: 'country',
    label: i18n('user.fields.country'),
  },
  {
    name: 'createdAt',
    label: i18n('user.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
];
