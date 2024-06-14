"use client";
import React, { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Collapse,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess,
  ExpandMore,
  StarBorder,
  Logout as LogoutIcon,
  PersonOutlined as PersonOutlinedIcon,
} from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";

const drawerWidth = 290;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#2196f3",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 220,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: theme.palette.action.selectedOpacity,
      },
    },
  },
}));

type MenuItemType = {
  name: string;
  path?: string;
  icon?: React.ReactNode;
  NestedList?: MenuItemType[];
};

type DesktopNavbarProps = {
  children: React.ReactNode;
  menus: MenuItemType[];
};

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ children, menus }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNestedListToggle = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const openProfile = Boolean(anchorEl);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontSize: "1.5rem" }}
          >
            SrongData
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            <Button
              onClick={handleProfileMenuClick}
              className="flex items-center"
            >
              <Typography
                component="p"
                sx={{
                  color: "white",
                  marginRight: "0.7rem",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                }}
              >
                Soth Kimleng
              </Typography>
              <Avatar
                alt="KIM"
                sx={{ width: 42, height: 42, cursor: "pointer" }}
              />
            </Button>
            <StyledMenu
              anchorEl={anchorEl}
              open={openProfile}
              onClose={handleProfileMenuClose}
            >
              <Link
                href="/dashboard/profile"
                passHref
                className="decoration-inherit"
              >
                <MenuItem onClick={handleProfileMenuClose}>
                  <PersonOutlinedIcon />
                  Profile
                </MenuItem>
              </Link>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                disableRipple
              >
                <LogoutIcon />
                Logout
              </MenuItem>
            </StyledMenu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {menus.map((menu, index) => (
            <React.Fragment key={menu.name}>
              <Link
                href={menu.path ?? ""}
                passHref
                className="text-inherit no-underline"
              >
                <ListItemButton
                  onClick={() => handleNestedListToggle(index)}
                  sx={{
                    minHeight: 60,
                    justifyContent: open ? "initial" : "center",
                    alignItems: "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.name}
                    sx={{ opacity: open ? 1 : 0 }}
                    primaryTypographyProps={{ fontSize: "1.2rem" }}
                  />
                  {menu.NestedList && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        ...(!open && { display: "none" }),
                      }}
                    >
                      {selectedIndex === index ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </Box>
                  )}
                </ListItemButton>
              </Link>
              {menu.NestedList && (
                <Collapse
                  in={selectedIndex === index}
                  unmountOnExit
                  sx={{ ...(!open && { display: "none" }) }}
                >
                  <List component="div" disablePadding>
                    {menu.NestedList.map((nestedItem) => (
                      <Link
                        href={nestedItem.path ?? ""}
                        key={nestedItem.name}
                        passHref
                        className="text-inherit no-underline"
                      >
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon sx={{ minWidth: "auto", mr: "0.6rem" }}>
                            {nestedItem.icon || <StarBorder />}
                          </ListItemIcon>
                          <ListItemText
                            primary={nestedItem.name}
                            primaryTypographyProps={{ fontSize: "1.2rem" }}
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2, overflowX: "hidden" }}>
        <DrawerHeader />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default DesktopNavbar;
