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

import { FC, forwardRef } from 'react';

// Material Dashboard 2 PRO React TS components
import MDTypography from 'src/mui/components/MDTypography';

// Custom styles for MDProgress
import MDProgressRoot from 'src/mui/components/MDProgress/MDProgressRoot';

// Delcare props types for MDProgress
interface Props {
  variant?: 'contained' | 'gradient';
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'blue'
    | 'red';
  value: number;
  height?: number;
  label?: string;
  labelcolor?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'blue'
    | 'red';
  [key: string]: any;
}

const MDProgress: FC<Props> = forwardRef(
  (
    {
      variant,
      color,
      value,
      height,
      label,
      labelcolor,
      ...rest
    },
    ref,
  ) => (
    <>
      {label && (
        <MDTypography
          variant="button"
          fontWeight="medium"
          color={labelcolor}
        >
          {value}% {label}
        </MDTypography>
      )}
      <MDProgressRoot
        {...rest}
        ref={ref}
        variant="determinate"
        value={value}
        ownerState={{ color, value, height, variant }}
      />
    </>
  ),
);

// Declaring default props for MDProgress
MDProgress.defaultProps = {
  variant: 'contained',
  color: 'info',
  value: 0,
  label: null,
  labelcolor: 'red',
};

export default MDProgress;
