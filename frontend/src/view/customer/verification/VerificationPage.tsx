import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import VerificationForm from 'src/view/customer/verification/VerificationForm';
import Spinner from 'src/view/shared/Spinner';

function VerificationPage(props) {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const saveLoading = useSelector(
    selectors.selectLoadingUpdateProfile,
  );

  const status = useSelector(selectors.selectStatus);

  const customer = useSelector(selectors.selectCurrentUser);

  const doSubmit = (data) => {
    dispatch(actions.doRequestVerification(data));
  };

  return (
    <>
      {loading && <Spinner />}

      {!loading && (
        <VerificationForm
          loading={saveLoading || status === 'active'}
          customer={customer}
          title={i18n('customer.kyc.title')}
          isEditing={false}
          onSubmit={doSubmit}
          onCancel={() => getHistory().push('/customer')}
        />
      )}
    </>
  );
}

export default VerificationPage;
