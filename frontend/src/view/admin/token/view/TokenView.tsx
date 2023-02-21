import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import Spinner from 'src/view/shared/Spinner';
import MDBox from 'src/mui/components/MDBox';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';

function TokenView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container sx={{ mb: 3 }}>
        <Grid item md={4} xs={12}>
          <MDBox
            display="flex"
            justifyContent="center"
            px={4}
          >
            <ImagesViewItem
              value={record.tokenImage}
              max={1}
            />
          </MDBox>
        </Grid>
        <Grid item md={8} xs={12} sx={{ mb: 6 }}>
          <Grid container spacing={1.6}>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.tokenNumber')}
                value={record.tokenNumber}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.name')}
                value={record.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.category')}
                value={record.category}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.status')}
                value={record.status}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.tokenAddress')}
                value={record.tokenAddress}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n('token.fields.tokenPrice')}
                value={record.tokenPrice}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextViewItem
                label={i18n(
                  'token.fields.tokenizedCostAmount',
                )}
                value={record.tokenizedCostAmount}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.softcap')}
            value={record.softcap}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.hardcap')}
            value={record.hardcap}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n(
              'token.fields.suppliedTokensNumber',
            )}
            value={record.suppliedTokensNumber}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.investorsNumber')}
            value={record.investorsNumber}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.tokenDuration')}
            value={record.tokenDuration}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.monthlyProfit')}
            value={record.monthlyProfit}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextViewItem
            label={i18n('token.fields.APY')}
            value={record.APY}
          />
        </Grid>
        <Grid item md={4} xs={12} sx={{ mb: 6 }}>
          <TextViewItem
            label={i18n('token.fields.minAmountOnSelling')}
            value={record.minAmountOnSelling}
          />
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n('token.fields.description')}
            value={record.description}
          />
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default TokenView;
