import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/property/destroy/propertyDestroyActions';
import destroySelectors from 'src/modules/property/destroy/propertyDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import MDButton from 'src/mui/components/MDButton';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import propertySelectors from 'src/modules/property/propertySelectors';

function PropertyViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const [destroyConfirmVisible, setDestroyConfirmVisible] =
    useState(false);

  const dispatch = useDispatch();

  const id = props.match.params.id;

  const hasPermissionToEdit = useSelector(
    propertySelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    propertySelectors.selectPermissionToDestroy,
  );
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const doOpenDestroyConfirmModal = () => {
    setDestroyConfirmVisible(true);
  };

  const doCloseDestroyConfirmModal = () => {
    setDestroyConfirmVisible(false);
  };

  const doDestroy = () => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          component={Link}
          to={`/admin/property/${id}/edit`}
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<EditIcon />}
          size="small"
        >
          {i18n('common.edit')}
        </MDButton>
      )}

      {hasPermissionToDestroy && (
        <MDButton
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<DeleteIcon />}
          disabled={destroyLoading}
          onClick={doOpenDestroyConfirmModal}
          size="small"
        >
          {i18n('common.destroy')}
        </MDButton>
      )}

      <MDButton
        variant="outlined"
        color={sidenavColor}
        component={Link}
        to={'/admin/property'}
        startIcon={<ArrowBackIcon />}
        size="small"
      >
        {i18n('common.back')}
      </MDButton>

      {destroyConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy()}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </ToolbarWrapper>
  );
}

export default PropertyViewToolbar;
