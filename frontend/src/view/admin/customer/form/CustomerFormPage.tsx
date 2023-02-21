import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/customer/form/customerFormActions';
import selectors from 'src/modules/customer/form/customerFormSelectors';
import CustomerForm from 'src/view/admin/customer/form/CustomerForm';
import Spinner from 'src/view/shared/Spinner';

function CustomerFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const customer = useSelector(selectors.selectCustomer);

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    dispatch(
      actions.doUpdate({
        id: id,
        ...data,
      }),
    );
  };

  return (
    <>
      {initLoading && <Spinner />}

      {dispatched && !initLoading && (
        <CustomerForm
          saveLoading={saveLoading}
          initLoading={initLoading}
          customer={customer}
          onSubmit={doSubmit}
          onCancel={() =>
            getHistory().push('/admin/customer')
          }
        />
      )}
    </>
  );
}

export default CustomerFormPage;
