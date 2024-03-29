import { Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/admin/view/adminViewActions';
import selectors from 'src/modules/admin/view/adminViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import AdminView from 'src/view/admin/admin/view/AdminView';
import AdminViewToolbar from 'src/view/admin/admin/view/AdminViewToolbar';

function AdminViewPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const admin = useSelector(selectors.selectAdmin);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Card>
        <MDBox px={2.4} pt={2.4}>
          <MDBox
            pb={2.4}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3" mb={2.4}>
              {i18n('user.view.title')}
            </MDTypography>
            <AdminViewToolbar match={match} />
          </MDBox>
          <AdminView loading={loading} admin={admin} />
        </MDBox>
      </Card>
    </>
  );
}

export default AdminViewPage;
