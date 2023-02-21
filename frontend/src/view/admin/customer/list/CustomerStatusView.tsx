import { i18n } from 'src/i18n';
import MDBadge from 'src/mui/components/MDBadge';

function CustomerStatusView(props) {
  const { value } = props;

  switch (value) {
    case 'active':
      return (
        <MDBadge
          variant="contained"
          color="success"
          badgeContent={i18n('user.status.active')}
          container
        />
      );
    case 'pending':
      return (
        <MDBadge
          variant="contained"
          color="warning"
          badgeContent={i18n('user.status.pending')}
          container
        />
      );
    case 'requested':
      return (
        <MDBadge
          variant="contained"
          color="info"
          badgeContent={i18n('user.status.requested')}
          container
        />
      );
    case 'rejected':
      return (
        <MDBadge
          variant="contained"
          color="primary"
          badgeContent={i18n('user.status.rejected')}
          container
        />
      );
    default:
      return null;
  }
}

export default CustomerStatusView;
