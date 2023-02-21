import {
  Autocomplete,
  Box,
  Icon,
  TableContainer,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Search';
import { i18n } from 'src/i18n';
//import actions from 'src/modules/Transaction/TransactionActions';
//import selectors from 'src/modules/Transaction/TransactionSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import moment from 'moment';
import MDBox from 'src/mui/components/MDBox';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';

function TransactionTable(props) {
  const dispatch = useDispatch();
  const { sidenavColor } = selectMuiSettings();

  const download = (values) => {};

  const loading = false;
  const hasRows = false;
  const rows = [];

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>

              <DataTableHeadCell>
                {i18n(
                  'customer.transaction.fields.transactionType',
                )}
              </DataTableHeadCell>

              <DataTableHeadCell>
                {i18n('customer.transaction.fields.date')}
              </DataTableHeadCell>

              <DataTableHeadCell>
                {i18n('customer.transaction.fields.amount')}
              </DataTableHeadCell>

              <DataTableHeadCell>
                {i18n(
                  'customer.transaction.fields.account',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell>
                {i18n('customer.transaction.fields.state')}
              </DataTableHeadCell>
            </TableRow>
          </MDBox>
          <TableBody>
            {loading && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <Spinner />
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading && !hasRows && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDTypography>
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell>
                    <Tooltip
                      disableInteractive
                      title={i18n('common.view')}
                    >
                      <IconButton
                        onClick={download}
                        color={sidenavColor}
                        size="small"
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.transactionType}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {moment(row.timestamp).format(
                      DEFAULT_MOMENT_FORMAT,
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.amount}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.account}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.state}
                  </DataTableBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*<Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
        showTotalEntries
                    />*/}
      <MDBox py={2}></MDBox>
    </>
  );
}

export default TransactionTable;
