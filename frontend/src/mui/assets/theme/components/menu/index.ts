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
import boxShadows from 'src/mui/assets/theme/base/boxShadows';
import typography from 'src/mui/assets/theme/base/typography';
import colors from 'src/mui/assets/theme/base/colors';
import borders from 'src/mui/assets/theme/base/borders';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';

const { lg } = boxShadows;
const { size } = typography;
const { blue, white } = colors;
const { borderRadius } = borders;

// types
type Types = any;

const menu: Types = {
  defaultProps: {
    disableAutoFocusItem: true,
  },

  styleOverrides: {
    paper: {
      minWidth: pxToRem(128),
      boxShadow: lg,
      padding: `${pxToRem(12.8)} ${pxToRem(6.4)}`,
      fontSize: size.sm,
      color: blue.main,
      textAlign: 'left',
      backgroundColor: `${white.main} !important`,
      borderRadius: borderRadius.md,
    },
  },
};

export default menu;
