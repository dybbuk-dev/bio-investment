import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/customer/view/customerViewActions';
import selectors from 'src/modules/customer/view/customerViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import CustomerView from 'src/view/admin/customer/view/CustomerView';
import CustomerViewToolbar from 'src/view/admin/customer/view/CustomerViewToolbar';

function CustomerViewPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const customer = useSelector(selectors.selectCustomer);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <MDBox>
        <MDBox
          mb={0.6}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h4">
            {i18n('customer.verify.title')}
          </MDTypography>
          <CustomerViewToolbar match={match} />
        </MDBox>
        <CustomerView
          loading={loading}
          customer={customer}
        />
      </MDBox>
    </>
  );
}

export default CustomerViewPage;
