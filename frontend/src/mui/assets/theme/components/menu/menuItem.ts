/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';
import borders from 'src/mui/assets/theme/base/borders';
import typography from 'src/mui/assets/theme/base/typography';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';

const { light, blue, dark } = colors;
const { borderRadius } = borders;
const { size } = typography;

// types
type Types = any;

const menuItem: Types = {
  styleOverrides: {
    root: {
      minWidth: pxToRem(128),
      minHeight: 'unset',
      padding: `${pxToRem(3.84)} ${pxToRem(12.8)}`,
      borderRadius: borderRadius.md,
      fontSize: size.sm,
      color: blue.main,
      transition:
        'background-color 300ms ease, color 300ms ease',

      '&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus':
        {
          backgroundColor: light.main,
          color: dark.main,
        },
    },
  },
};

export default menuItem;
