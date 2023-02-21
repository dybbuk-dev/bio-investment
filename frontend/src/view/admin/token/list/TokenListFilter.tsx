import {
  AccordionDetails,
  AccordionSummary,
  Grid,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/token/list/tokenListActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import formActions from 'src/modules/form/formActions';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/token/list/tokenListSelectors';
import UndoIcon from '@mui/icons-material/Undo';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import { getNames } from 'country-list';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import tokenEnumerators from 'src/modules/token/tokenEnumerators';
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import DatePickerRangeFormItem from 'src/view/shared/form/items/DatePickerRangeFormItem';

const schema = yup.object().shape({
  tokenNumber: yupFilterSchemas.integer(
    i18n('token.fields.tokenNumber'),
  ),
  country: yupFilterSchemas.string(
    i18n('token.fields.country'),
  ),
  city: yupFilterSchemas.string(i18n('token.fields.city')),
  tokenType: yupFilterSchemas.string(
    i18n('token.fields.tokenType'),
  ),
  tokenName: yupFilterSchemas.string(
    i18n('token.fields.tokenName'),
  ),
  name: yupFilterSchemas.string(i18n('token.fields.name')),
  initialRentDate: yupFilterSchemas.date(
    i18n('token.fields.initialRentDate'),
  ),
  status: yupFilterSchemas.string(
    i18n('token.fields.status'),
  ),
  tokenAddress: yupFilterSchemas.string(
    i18n('token.fields.tokenAddress'),
  ),
});

const emptyValues = {
  tokenNumber: '',
  country: '',
  city: '',
  tokenType: '',
  tokenName: '',
  name: '',
  initialRentDate: '',
  status: '',
  tokenAddress: '',
};

const previewRenders = {
  tokenNumber: {
    label: i18n('token.fields.tokenNumber'),
    render: filterRenders.decimal(),
  },
  country: {
    label: i18n('token.fields.country'),
    render: filterRenders.generic(),
  },
  city: {
    label: i18n('token.fields.city'),
    render: filterRenders.generic(),
  },
  tokenType: {
    label: i18n('token.fields.tokenType'),
    render: filterRenders.enumerator(
      'token.fields.tokenType',
    ),
  },
  tokenName: {
    label: i18n('token.fields.tokenName'),
    render: filterRenders.generic(),
  },
  name: {
    label: i18n('token.fields.name'),
    render: filterRenders.generic(),
  },
  initialRentDate: {
    label: i18n('token.fields.initialRentDate'),
    render: filterRenders.date(),
  },
  status: {
    label: i18n('token.fields.status'),
    render: filterRenders.enumerator('token.fields.status'),
  },
  tokenAddress: {
    label: i18n('token.fields.tokenAddress'),
    render: filterRenders.generic(),
  },
};

function TokenListFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        initialValues,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues, false));
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    dispatch(formActions.doRefresh());
    return form.handleSubmit(onSubmit)();
  };

  return (
    <FilterWrapper>
      <FilterAccordion
        expanded={expanded}
        onChange={(event, isExpanded) =>
          setExpanded(isExpanded)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
        >
          <FilterPreview
            values={rawFilter}
            renders={previewRenders}
            expanded={expanded}
            onRemove={onRemove}
          />
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container spacing={1.6}>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name="name"
                    label={i18n('token.fields.name')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name="tokenNumber"
                    label={i18n('token.fields.tokenNumber')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <SelectFormItem
                    name="country"
                    label={i18n('token.fields.country')}
                    options={getNames().map((value) => ({
                      value,
                      label: value,
                    }))}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name="city"
                    label={i18n('token.fields.city')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <SelectFormItem
                    name="tokenType"
                    label={i18n('token.fields.tokenType')}
                    options={tokenEnumerators.tokenType.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `token.fields.tokenType.${value}`,
                        ),
                      }),
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name="tokenName"
                    label={i18n('token.fields.tokenName')}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <DatePickerFormItem
                    name="initialRentDate"
                    label={i18n(
                      'token.fields.initialRentDate',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <SelectFormItem
                    name="status"
                    label={i18n('token.fields.status')}
                    options={tokenEnumerators.status.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `token.fields.status.${value}`,
                        ),
                      }),
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <InputFormItem
                    name="tokenAddress"
                    label={i18n(
                      'token.fields.tokenAddress',
                    )}
                    variant="standard"
                  />
                </Grid>
              </Grid>

              <FilterButtons>
                <MDButton
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
                  disabled={props.loading}
                  startIcon={<SearchIcon />}
                  size="small"
                >
                  {i18n('common.search')}
                </MDButton>

                <MDButton
                  variant="outlined"
                  color={sidenavColor}
                  type="button"
                  onClick={onReset}
                  disabled={props.loading}
                  startIcon={<UndoIcon />}
                  size="small"
                >
                  {i18n('common.reset')}
                </MDButton>
              </FilterButtons>
            </form>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default TokenListFilter;
