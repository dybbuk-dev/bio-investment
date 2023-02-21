import {
  Button,
  CardMedia,
  Icon,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import { getLanguage, getLanguages } from 'src/i18n';
import actions from 'src/modules/layout/layoutActions';

// Custom styles for Header
import { navbarIconButton } from 'src/mui/shared/Navbars/DashboardNavbar/styles';
import NotificationItem from 'src/mui/shared/Items/NotificationItem';
import MDButton from 'src/mui/components/MDButton';
import MDBox from 'src/mui/components/MDBox';

// Declaring prop types for Header
interface Props {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
  size?: 'sm' | 'lg';
}

function I18nSelect({
  absolute,
  light,
  isMini,
  size,
}: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = useState(null);

  const doChangeLanguage = (language) => {
    actions.doChangeLanguage(language);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MDBox mr={1} display="inline-block">
      <MDButton
        variant="text"
        onClick={handleClick}
        sx={navbarIconButton}
        size="medium"
        color="secondary"
        iconOnly
        circular
      >
        {
          <img
            src={getLanguage().flag}
            alt={getLanguage().label}
            width={size === 'sm' ? '22' : '24'}
          />
        }
      </MDButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {getLanguages().map((language) => (
          <NotificationItem
            key={language.id}
            onClick={(event) =>
              doChangeLanguage(language.id)
            }
            icon={
              <img
                src={language.flag}
                alt={language.label}
                width="22"
              />
            }
            title={language.label}
          />
        ))}
      </Menu>
    </MDBox>
  );
}

// Declaring default props for I18nSelect
I18nSelect.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  size: 'sm',
};

export default I18nSelect;
