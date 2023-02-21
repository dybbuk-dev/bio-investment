import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'src/modules/customer/view/customerViewActions';
import customerSelectors from 'src/modules/customer/customerSelectors';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function CustomerViewToolbar(props) {
  const dispatch = useDispatch();
  const { sidenavColor } = selectMuiSettings();
  const { match } = props;

  const hasPermissionToEdit = useSelector(
    customerSelectors.selectPermissionToEdit,
  );

  const id = match.params.id;

  const doAccept = () => {
    dispatch(actions.doAccept(id));
  };

  const doReject = () => {
    dispatch(actions.doReject(id));
  };
  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          onClick={doAccept}
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<CheckIcon />}
          size="small"
        >
          {i18n('common.accept')}
        </MDButton>
      )}
      {hasPermissionToEdit && (
        <MDButton
          onClick={doReject}
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<CloseIcon />}
          size="small"
        >
          {i18n('common.reject')}
        </MDButton>
      )}
      <MDButton
        component={Link}
        to={`/admin/customer`}
        variant="outlined"
        color={sidenavColor}
        type="button"
        startIcon={<KeyboardBackspaceIcon />}
        size="small"
      >
        {i18n('common.back')}
      </MDButton>
    </ToolbarWrapper>
  );
}

export default CustomerViewToolbar;
