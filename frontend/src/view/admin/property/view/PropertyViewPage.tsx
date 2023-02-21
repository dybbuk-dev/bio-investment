import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/property/view/propertyViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/property/view/propertyViewSelectors';
import PropertyView from 'src/view/admin/property/view/PropertyView';
import PropertyViewToolbar from 'src/view/admin/property/view/PropertyViewToolbar';

function PropertyPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Card>
      <MDBox py={2.4} px={2.4}>
        <MDBox
          pb={6}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h3" mb={2.4}>
            {i18n('property.view.title')}
          </MDTypography>
          <PropertyViewToolbar match={match} />
        </MDBox>
        <PropertyView loading={loading} record={record} />
      </MDBox>
    </Card>
  );
}

export default PropertyPage;
