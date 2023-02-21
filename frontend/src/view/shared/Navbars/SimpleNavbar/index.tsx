import {
  useState,
  useEffect,
  ReactNode,
  Fragment,
} from 'react';

// react-router components
import { Link } from 'react-router-dom';

// @mui material components
import Icon from '@mui/material/Icon';
import Popper from '@mui/material/Popper';
import Grow, { GrowProps } from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Theme } from '@mui/material/styles';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';

// Newly defined components
import SimpleNavbarDropdown from 'src/view/shared/Navbars/SimpleNavbar/SimpleNavbarDropdown';
import SimpleNavbarMobile from 'src/view/shared/Navbars/SimpleNavbar/SimpleNavbarMobile';

// Material Dashboard 2 PRO React TS Base Styles
import breakpoints from 'src/mui/assets/theme/base/breakpoints';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { i18n } from 'src/i18n';
import I18nSelect from 'src/view/layout/I18nSelect';

// Declaring props types for SimpleNavbar
interface Props {
  routes: {
    [key: string]:
      | ReactNode
      | string
      | {
          [key: string]: string | any;
        }[];
  }[];
  brand?: string;
  brandName?: string;
  transparent?: boolean;
  light?: boolean;
  action?: {
    type: 'external' | 'internal';
    route: string;
    color:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'dark'
      | 'light'
      | 'blue'
      | 'red';
    label: string;
  };
  multilingual?: boolean;
}

interface NewGrowTypes extends GrowProps {
  sx: any;
  [key: string]: any;
}

function NewGrow(props: NewGrowTypes) {
  return <Grow {...props} />;
}

function SimpleNavbar({
  routes,
  brand,
  brandName,
  transparent,
  light,
  action,
  multilingual,
}: Props): JSX.Element {
  const [dropdown, setDropdown] = useState<any>('');
  const [dropdownEl, setDropdownEl] = useState<any>('');
  const [dropdownName, setDropdownName] = useState<any>('');
  const [nestedDropdown, setNestedDropdown] =
    useState<any>('');
  const [nestedDropdownEl, setNestedDropdownEl] =
    useState<any>('');
  const [nestedDropdownName, setNestedDropdownName] =
    useState<any>('');
  const [arrowRef, setArrowRef] = useState<any>(null);
  const [mobileNavbar, setMobileNavbar] =
    useState<boolean>(false);
  const [mobileView, setMobileView] =
    useState<boolean>(false);

  const openMobileNavbar = () =>
    setMobileNavbar(!mobileNavbar);

  useEffect(() => {
    // A function that sets the display state for the SimpleNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /**
     The event listener that's calling the displayMobileNavbar function when
     resizing the window.
    */
    window.addEventListener('resize', displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () =>
      window.removeEventListener(
        'resize',
        displayMobileNavbar,
      );
  }, []);

  const renderNavbarItems = routes.map(
    ({ name, icon, href, route, collapse }: any) => (
      <SimpleNavbarDropdown
        key={name}
        name={name}
        icon={icon}
        href={href}
        route={route}
        collapse={Boolean(collapse)}
        onMouseEnter={({ currentTarget }: any) => {
          if (collapse) {
            setDropdown(currentTarget);
            setDropdownEl(currentTarget);
            setDropdownName(name);
          }
        }}
        onMouseLeave={() => collapse && setDropdown(null)}
        light={light}
      />
    ),
  );

  // Render the routes on the dropdown menu
  const renderRoutes = routes.map(
    ({ name, collapse, columns, rowsPerColumn }: any) => {
      let template;

      // Render the dropdown menu that should be display as columns
      if (collapse && columns && name === dropdownName) {
        const calculateColumns = collapse.reduce(
          (resultArray: any, item: any, index: any) => {
            const chunkIndex = Math.floor(
              index / rowsPerColumn,
            );

            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [];
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
          },
          [],
        );

        template = (
          <Grid
            key={name}
            container
            spacing={2.4}
            py={0.8}
            px={1.2}
          >
            {calculateColumns.map((cols: any, key: any) => {
              const gridKey = `grid-${key}`;
              const dividerKey = `divider-${key}`;

              return (
                <Grid
                  key={gridKey}
                  item
                  xs={12 / columns}
                  sx={{ position: 'relative' }}
                >
                  {cols.map((col: any, index: any) => (
                    <Fragment key={col.name}>
                      <MDBox
                        width="100%"
                        display="flex"
                        alignItems="center"
                        py={0.8}
                        mt={index !== 0 ? 2 : 0}
                      >
                        <MDBox
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          width="1.2rem"
                          height="1.2rem"
                          borderRadius="md"
                          color="text"
                          mr={0.8}
                          fontSize="0.8rem"
                          lineHeight={1}
                        >
                          {col.icon}
                        </MDBox>
                        <MDTypography
                          display="block"
                          variant="button"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {col.name}
                        </MDTypography>
                      </MDBox>
                      {col.collapse.map((item: any) => (
                        <MDTypography
                          key={item.name}
                          component={
                            item.route ? Link : MuiLink
                          }
                          to={item.route ? item.route : ''}
                          href={
                            item.href
                              ? item.href
                              : (e: any) =>
                                  e.preventDefault()
                          }
                          target={item.href ? '_blank' : ''}
                          rel={
                            item.href
                              ? 'noreferrer'
                              : 'noreferrer'
                          }
                          minWidth="9rem"
                          display="block"
                          variant="button"
                          color="text"
                          textTransform="capitalize"
                          fontWeight="regular"
                          py={0.5}
                          px={1.6}
                          sx={({
                            palette: { grey, dark },
                            borders: { borderRadius },
                          }: Theme) => ({
                            borderRadius: borderRadius.md,
                            cursor: 'pointer',
                            transition: 'all 300ms linear',

                            '&:hover': {
                              backgroundColor: grey[200],
                              color: dark.main,
                            },
                          })}
                        >
                          {item.name}
                        </MDTypography>
                      ))}
                    </Fragment>
                  ))}
                  {key !== 0 && (
                    <Divider
                      key={dividerKey}
                      orientation="vertical"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '-3.2px',
                        transform: 'translateY(-45%)',
                        height: '90%',
                      }}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        );

        // Render the dropdown menu that should be display as list items
      } else if (collapse && name === dropdownName) {
        template = collapse.map((item: any) => {
          const linkComponent = {
            component: MuiLink,
            href: item.href,
            target: '_blank',
            rel: 'noreferrer',
          };

          const routeComponent = {
            component: Link,
            to: item.route,
          };

          return (
            <MDTypography
              key={item.name}
              {...(item.route
                ? routeComponent
                : linkComponent)}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              variant="button"
              textTransform="capitalize"
              minWidth={
                item.description ? '11.2rem' : '9.6rem'
              }
              color={item.description ? 'dark' : 'text'}
              fontWeight={
                item.description ? 'bold' : 'regular'
              }
              py={item.description ? 1 : 0.625}
              px={1.6}
              sx={({
                palette: { grey, dark },
                borders: { borderRadius },
              }: Theme) => ({
                borderRadius: borderRadius.md,
                cursor: 'pointer',
                transition: 'all 300ms linear',

                '&:hover': {
                  backgroundColor: grey[200],
                  color: dark.main,

                  '& *': {
                    color: dark.main,
                  },
                },
              })}
              onMouseEnter={({ currentTarget }: any) => {
                if (item.dropdown) {
                  setNestedDropdown(currentTarget);
                  setNestedDropdownEl(currentTarget);
                  setNestedDropdownName(item.name);
                }
              }}
              onMouseLeave={() => {
                if (item.dropdown) {
                  setNestedDropdown(null);
                }
              }}
            >
              {item.description ? (
                <MDBox
                  display="flex"
                  py={0.2}
                  fontSize="0.8rem"
                  color="text"
                >
                  {typeof item.icon === 'string' ? (
                    <Icon color="inherit">{item.icon}</Icon>
                  ) : (
                    <MDBox color="inherit">
                      {item.icon}
                    </MDBox>
                  )}
                  <MDBox pl={0.8} lineHeight={0}>
                    <MDTypography
                      variant="button"
                      display="block"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {item.name}
                    </MDTypography>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                    >
                      {item.description}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              ) : (
                <MDBox
                  display="flex"
                  alignItems="center"
                  color="text"
                >
                  <Icon sx={{ mr: 1 }}>{item.icon}</Icon>
                  {item.name}
                </MDBox>
              )}
              {item.collapse && (
                <Icon
                  sx={{
                    fontWeight: 'normal',
                    verticalAlign: 'middle',
                    mr: -0.5,
                  }}
                >
                  keyboard_arrow_right
                </Icon>
              )}
            </MDTypography>
          );
        });
      }

      return template;
    },
  );

  // Routes dropdown menu
  const dropdownMenu = (
    <Popper
      anchorEl={dropdown}
      popperRef={null}
      open={Boolean(dropdown)}
      placement="top-start"
      transition
      style={{ zIndex: 10 }}
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
      onMouseEnter={() => setDropdown(dropdownEl)}
      onMouseLeave={() => {
        if (!nestedDropdown) {
          setDropdown(null);
          setDropdownName('');
        }
      }}
    >
      {({ TransitionProps }) => (
        <NewGrow
          {...TransitionProps}
          sx={{
            transformOrigin: 'left top',
            background: ({ palette: { white } }: Theme) =>
              white.main,
          }}
        >
          <MDBox borderRadius="lg">
            <MDTypography variant="h1" color="white">
              <Icon ref={setArrowRef} sx={{ mt: -3 }}>
                arrow_drop_up
              </Icon>
            </MDTypography>
            <MDBox
              shadow="lg"
              borderRadius="lg"
              p={1.3}
              mt={0.8}
            >
              {renderRoutes}
            </MDBox>
          </MDBox>
        </NewGrow>
      )}
    </Popper>
  );

  // Render routes that are nested inside the dropdown menu routes
  const renderNestedRoutes = routes.map(
    ({ collapse, columns }: any) =>
      collapse && !columns
        ? collapse.map(
            ({
              name: parentName,
              collapse: nestedCollapse,
            }: any) => {
              let template;

              if (parentName === nestedDropdownName) {
                template =
                  nestedCollapse &&
                  nestedCollapse.map((item: any) => {
                    const linkComponent = {
                      component: MuiLink,
                      href: item.href,
                      target: '_blank',
                      rel: 'noreferrer',
                    };

                    const routeComponent = {
                      component: Link,
                      to: item.route,
                    };

                    return (
                      <MDTypography
                        key={item.name}
                        {...(item.route
                          ? routeComponent
                          : linkComponent)}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        variant="button"
                        textTransform="capitalize"
                        minWidth={
                          item.description
                            ? '11.2rem'
                            : '9.6rem'
                        }
                        color={
                          item.description ? 'dark' : 'text'
                        }
                        fontWeight={
                          item.description
                            ? 'bold'
                            : 'regular'
                        }
                        py={item.description ? 1 : 0.625}
                        px={1.6}
                        sx={({
                          palette: { grey, dark },
                          borders: { borderRadius },
                        }: Theme) => ({
                          borderRadius: borderRadius.md,
                          cursor: 'pointer',
                          transition: 'all 300ms linear',

                          '&:hover': {
                            backgroundColor: grey[200],
                            color: dark.main,

                            '& *': {
                              color: dark.main,
                            },
                          },
                        })}
                      >
                        {item.description ? (
                          <MDBox>
                            {item.name}
                            <MDTypography
                              display="block"
                              variant="button"
                              color="text"
                              fontWeight="regular"
                              sx={{
                                transition:
                                  'all 300ms linear',
                              }}
                            >
                              {item.description}
                            </MDTypography>
                          </MDBox>
                        ) : (
                          item.name
                        )}
                        {item.collapse && (
                          <Icon
                            fontSize="small"
                            sx={{
                              fontWeight: 'normal',
                              verticalAlign: 'middle',
                              mr: -0.5,
                            }}
                          >
                            keyboard_arrow_right
                          </Icon>
                        )}
                      </MDTypography>
                    );
                  });
              }

              return template;
            },
          )
        : null,
  );

  // Dropdown menu for the nested dropdowns
  const nestedDropdownMenu = (
    <Popper
      anchorEl={nestedDropdown}
      popperRef={null}
      open={Boolean(nestedDropdown)}
      placement="right-start"
      transition
      style={{ zIndex: 10 }}
      onMouseEnter={() => {
        setNestedDropdown(nestedDropdownEl);
      }}
      onMouseLeave={() => {
        setNestedDropdown(null);
        setNestedDropdownName('');
        setDropdown(null);
      }}
    >
      {({ TransitionProps }) => (
        <NewGrow
          {...TransitionProps}
          sx={{
            transformOrigin: 'left top',
            background: ({ palette: { white } }: Theme) =>
              white.main,
          }}
        >
          <MDBox ml={2} mt={-2.5} borderRadius="lg">
            <MDBox
              shadow="lg"
              borderRadius="lg"
              py={1.2}
              px={0.8}
              mt={1.6}
            >
              {renderNestedRoutes}
            </MDBox>
          </MDBox>
        </NewGrow>
      )}
    </Popper>
  );

  return (
    <MDBox
      sx={({
        palette: {
          transparent: transparentColor,
          white,
          background,
        },
        functions: { rgba },
      }: any) => ({
        backgroundColor: transparent
          ? transparentColor.main
          : rgba(white.main, 0.8),
        backdropFilter: transparent
          ? 'none'
          : `saturate(200%) blur(24px)`,
      })}
      position="fixed"
      left={0}
      zIndex={3}
      width="100%"
      shadow={transparent ? 'none' : 'md'}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <MDBox
        py={0.8}
        px={{
          xs: 4,
          sm: transparent ? 2 : 3,
          lg: transparent ? 0 : 2,
        }}
        width="80%"
        color={light ? 'white' : 'dark'}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDBox
          component={Link}
          to="/"
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
          pl={{ xs: 0, lg: 1 }}
        >
          {brand ? (
            <MDBox
              component="img"
              src={brand}
              alt="Brand"
              width="14rem"
            />
          ) : (
            <MDTypography
              variant="h2"
              fontWeight="bold"
              color={light ? 'white' : 'dark'}
            >
              {brandName}
            </MDTypography>
          )}
        </MDBox>
        <MDBox
          color="inherit"
          display={{ xs: 'none', lg: 'flex' }}
          m={0}
          p={0}
        >
          {renderNavbarItems}
        </MDBox>
        <MDBox display={{ xs: 'none', lg: 'flex' }}>
          {multilingual && <I18nSelect size="lg" />}
          {action &&
            (action.type === 'internal' ? (
              <MDButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : 'info'}
                size="small"
                sx={{ ml: 2 }}
              >
                {action.label}
              </MDButton>
            ) : (
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : 'info'}
                size="small"
                sx={{ mt: -0.3, ml: 2 }}
              >
                {action.label}
              </MDButton>
            ))}
        </MDBox>
        <MDBox
          display={{ xs: 'flex', lg: 'none' }}
          alignItems="center"
        >
          {multilingual && <I18nSelect />}
          <MDBox
            pl={1.2}
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={openMobileNavbar}
            alignItems="center"
            display="flex"
          >
            <Icon fontSize="medium">
              {mobileNavbar ? 'close' : 'menu'}
            </Icon>
          </MDBox>
        </MDBox>
      </MDBox>
      {dropdownMenu}
      {nestedDropdownMenu}
      {mobileView && (
        <SimpleNavbarMobile
          routes={routes}
          open={mobileNavbar}
        />
      )}
    </MDBox>
  );
}

// Declaring default props for SimpleNavbar
SimpleNavbar.defaultProps = {
  brand: '/images/logo.png',
  brandName: i18n('app.title'),
  transparent: false,
  light: false,
  action: false,
  multilingual: true,
};

export default SimpleNavbar;
