import authSelectors from 'src/modules/auth/authSelectors';
import authActions from 'src/modules/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import {
  adminMenu,
  adminProfileRoutes,
  userEditRoutes,
  customerMenu,
  customerProfileRoutes,
} from 'src/view/menus';

import { useEffect, useRef, useState } from 'react';

// react-router-dom components
import { useLocation, NavLink } from 'react-router-dom';

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS examples components
import SidenavCollapse from 'src/mui/shared/Sidenav/SidenavCollapse';
import SidenavList from 'src/mui/shared/Sidenav/SidenavList';
import SidenavItem from 'src/mui/shared/Sidenav/SidenavItem';

// Custom styles for the Sidenav
import SidenavRoot from 'src/mui/shared/Sidenav/SidenavRoot';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import {
  findRoute,
  matchedAdminRoutes,
  matchedCustomerRoutes,
} from 'src/view/routes';
import { Avatar, CardMedia } from '@mui/material';
import config from 'src/config';
import { BrandLogo } from 'src/assets/resources';

import Scrollbar from 'react-smooth-scrollbar-z';
import { i18n } from 'src/i18n';

// Declaring props types for Sidenav
interface Props {
  [key: string]: any;
}

function Menu({ ...rest }: Props): JSX.Element {
  const dispatch = useDispatch();

  const {
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    sidenavColor,
    darkMode,
  } = selectMuiSettings();

  const color = sidenavColor;

  const [openCollapse, setOpenCollapse] = useState<
    boolean | string
  >(false);
  const [openNestedCollapse, setOpenNestedCollapse] =
    useState<boolean | string>(false);

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );

  const permissionChecker = new PermissionChecker(
    currentUser,
  );
  const location = useLocation();
  const { pathname } = location;
  const currentRoutes = permissionChecker.isAdmin
    ? matchedAdminRoutes(pathname)
    : matchedCustomerRoutes(pathname);
  const currentRoute = findRoute(pathname, currentRoutes);
  const collapseName =
    (currentRoute && currentRoute.collapseName) || false;
  const items = pathname.split('/').slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];

  let textColor:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark'
    | 'blue'
    | 'red'
    | 'white'
    | 'inherit'
    | 'text'
    | 'light' = 'white';

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit';
  }

  const closeSidenav = () => {
    window.innerWidth >= 1200 &&
      dispatch(
        muiActions.doSave({
          miniSidenav: true,
        }),
      );
    dispatch(muiActions.doMiniSidenav(true));
  };

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, [collapseName, itemParentName]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch(
        muiActions.doMiniSidenav(
          window.innerWidth < 1200 || miniSidenav,
        ),
      );
      dispatch(
        muiActions.doTransparentSidenav(
          window.innerWidth < 1200
            ? false
            : transparentSidenav,
        ),
      );
    }

    /**
     * The event listener that's calling the handleMiniSidenav function when resizing the window.
     */
    window.addEventListener('resize', handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () =>
      window.removeEventListener(
        'resize',
        handleMiniSidenav,
      );
  }, [
    dispatch,
    pathname,
    transparentSidenav,
    whiteSidenav,
  ]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse: any) =>
    collapse.map(
      ({
        name,
        path,
        key,
        href,
        permissionRequired,
      }: any) => {
        const active = !!findRoute(path, currentRoutes);
        key = key || path;
        return href ? (
          <Link
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <SidenavItem name={name} nested />
          </Link>
        ) : (
          <NavLink
            to={path}
            key={key}
            style={{ textDecoration: 'none' }}
          >
            <SidenavItem
              name={name}
              active={active}
              nested
            />
          </NavLink>
        );
      },
    );

  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses: any) =>
    collapses.map(
      ({
        name,
        collapse,
        path,
        href,
        key,
        icon,
        permissionRequired,
      }: any) => {
        const active = !!findRoute(path, currentRoutes);

        key = key || path;

        let returnValue;

        if (collapse) {
          returnValue = (
            <SidenavItem
              key={key}
              color={color}
              name={name}
              active={
                key === itemParentName ? 'isParent' : false
              }
              open={openNestedCollapse === key}
              onClick={({ currentTarget }: any) =>
                openNestedCollapse === key &&
                currentTarget.classList.contains(
                  'MuiListItem-root',
                )
                  ? setOpenNestedCollapse(false)
                  : setOpenNestedCollapse(key)
              }
            >
              {renderNestedCollapse(collapse)}
            </SidenavItem>
          );
        } else {
          returnValue = href ? (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={active}
                icon={icon}
              />
            </Link>
          ) : (
            <NavLink
              to={path}
              key={key}
              style={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={active}
                icon={icon}
              />
            </NavLink>
          );
        }
        return (
          <SidenavList key={key}>{returnValue}</SidenavList>
        );
      },
    );

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = (routes) =>
    routes.map(
      ({
        type,
        name,
        icon,
        title,
        collapse,
        noCollapse,
        key,
        href,
        path,
        permissionRequired,
      }: any) => {
        const active = !!findRoute(path, currentRoutes);

        key = key || path;

        let returnValue;

        noCollapse = noCollapse || !collapse;

        if (type === 'collapse' || !type) {
          if (href) {
            returnValue = (
              <Link
                href={href}
                key={key}
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  color={color}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                />
              </Link>
            );
          } else if (noCollapse && path) {
            returnValue = (
              <NavLink to={path} key={key}>
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  color={color}
                  noCollapse={noCollapse}
                  active={active}
                >
                  {collapse
                    ? renderCollapse(collapse)
                    : null}
                </SidenavCollapse>
              </NavLink>
            );
          } else {
            returnValue = (
              <SidenavCollapse
                key={key}
                name={name}
                icon={icon}
                color={color}
                active={key === collapseName}
                open={openCollapse === key}
                onClick={() =>
                  openCollapse === key
                    ? setOpenCollapse(false)
                    : setOpenCollapse(key)
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            );
          }
        } else if (type === 'title') {
          returnValue = (
            <MDTypography
              key={key}
              color={textColor}
              display="block"
              variant="caption"
              fontWeight="bold"
              textTransform="uppercase"
              pl={2.4}
              mt={1.6}
              mb={0.8}
              ml={0.8}
            >
              {title}
            </MDTypography>
          );
        } else if (type === 'divider') {
          returnValue = (
            <Divider
              key={key}
              light={
                (!darkMode &&
                  !whiteSidenav &&
                  !transparentSidenav) ||
                (darkMode &&
                  !transparentSidenav &&
                  whiteSidenav)
              }
            />
          );
        }

        return returnValue;
      },
    );

  return (
    <>
      <SidenavRoot
        {...rest}
        variant="permanent"
        ownerState={{
          transparentSidenav,
          whiteSidenav,
          miniSidenav,
          darkMode,
        }}
      >
        <MDBox py={2.4}>
          <MDBox pb={0.8} px={3.2} textAlign="center">
            <MDBox
              display={{ xs: 'block', xl: 'none' }}
              position="absolute"
              top={0}
              right={0}
              p={1.3}
              onClick={closeSidenav}
              sx={{ cursor: 'pointer' }}
            >
              <MDTypography variant="h6" color="secondary">
                <Icon sx={{ fontWeight: 'bold' }}>
                  close
                </Icon>
              </MDTypography>
            </MDBox>
            <MDBox
              component={NavLink}
              to={
                permissionChecker.isAdmin
                  ? '/admin'
                  : '/customer'
              }
              display="flex"
              alignItems="center"
              sx={{ py: 2 }}
            >
              <BrandLogo sidenav={true} />
            </MDBox>
          </MDBox>
          <Divider
            light={
              (!darkMode &&
                !whiteSidenav &&
                !transparentSidenav) ||
              (darkMode &&
                !transparentSidenav &&
                whiteSidenav)
            }
          />
          <List>
            {permissionChecker.isAdmin
              ? renderRoutes([
                  {
                    name: userText,
                    key: 'my-profile',
                    icon: (
                      <Avatar
                        src={userAvatar}
                        alt={userText}
                        sx={{
                          width: '25.6px',
                          height: '25.6px',
                        }}
                      />
                    ),
                    collapse: [
                      ...adminProfileRoutes,
                    ].concat(
                      currentUser.role === 'admin'
                        ? userEditRoutes
                        : [],
                    ),
                  },
                  { type: 'divider', key: 'divider-0' },
                  ...adminMenu,
                ])
              : renderRoutes([
                  {
                    name: userText,
                    key: 'my-profile',
                    icon: (
                      <Avatar
                        src={userAvatar}
                        alt={userText}
                        sx={{
                          width: '25.6px',
                          height: '25.6px',
                        }}
                      />
                    ),
                    collapse: [...customerProfileRoutes],
                  },
                  { type: 'divider', key: 'divider-0' },
                  ...customerMenu,
                ])}
            <Divider />
            <NavLink to={'#'}>
              <SidenavCollapse
                name={i18n('common.help')}
                icon={<Icon>help</Icon>}
                noCollapse={true}
                active={findRoute('#', currentRoutes)}
              />
            </NavLink>
            <MDButton
              onClick={doSignout}
              sx={{ padding: 0 }}
            >
              <SidenavCollapse
                name={i18n('auth.signout')}
                icon={<Icon>logout</Icon>}
                noCollapse={true}
                active={false}
              />
            </MDButton>
          </List>
        </MDBox>
      </SidenavRoot>
    </>
  );
}

export default Menu;
