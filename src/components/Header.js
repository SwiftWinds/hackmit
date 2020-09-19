import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Button,
  Container,
  Fab,
  Zoom,
  IconButton,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  MenuList,
  MenuItem,
  Paper,
  ClickAwayListener,
  Popper,
  Grow,
  Collapse,
  Typography,
  Box,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MenuIcon from "@material-ui/icons/Menu";
import routes from "../data/routes";
import { Link, useLocation } from "react-router-dom";
import useStyles from "../styles/components/headerStyles.js";

export default function Header(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();
  const currPath = useLocation().pathname;

  return (
    <React.Fragment>
      <AppBar id="appbar" className={classes.navbar} elevation={3}>
        <Container fixed>
          <Toolbar disableGutters>
            <div className={classes.title}>
              <Link to="/">
                {/* <Image
                  alt="logo"
                  cloudName=""
                  publicId=""
                  height={36}
                  style={{ marginBottom: "-5px" }}
                  className={classes.logoImg}
                /> */}
                <Typography color="secondary" variant="h4">
                  Logo
                </Typography>
              </Link>
            </div>
            <DesktopNav classes={classes} currPath={currPath} />
            <MobileNav
              classes={classes}
              currPath={currPath}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <BackTop classes={classes} {...props} />
    </React.Fragment>
  );
}

function BackTop() {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} className={classes.backToTop}>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
}

// NAVIGATION COMPONENTS
function DesktopNav({ classes, currPath }) {
  return (
    <Hidden smDown>
      {routes.map((route) => {
        if (!route.dropRoutes)
          return (
            <Link to={route.path} key={route.path + route.name}>
              <Button
                aria-label="desktop navigation link"
                disableRipple
                className={`${classes.navLink} ${
                  currPath === route.path && "active"
                }`}
              >
                {route.name}
              </Button>
            </Link>
          );
        else
          return (
            <DropdownMenu
              key={route.name + route.path}
              route={route}
              classes={classes}
              currPath={currPath}
            />
          );
      })}
      <CallToActionButton classes={classes} />
    </Hidden>
  );
}

function MobileNav({ classes, currPath, drawerOpen, setDrawerOpen }) {
  return (
    <Hidden mdUp>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        style={{ marginRight: 0 }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      >
        <div role="presentation" onKeyDown={() => setDrawerOpen(false)}>
          <List className={classes.list}>
            {routes.map((route) => {
              if (!route.dropRoutes)
                return (
                  <Link key={route.path} to={route.path}>
                    <ListItem
                      className={`${classes.listItem} ${
                        currPath === route.path && "active"
                      }`}
                      button
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary={route.name} />
                    </ListItem>
                  </Link>
                );
              else
                return (
                  <NestedListNav
                    key={route.path + route.name}
                    route={route}
                    classes={classes}
                    currPath={currPath}
                    setDrawerOpen={setDrawerOpen}
                  />
                );
            })}
          </List>
        </div>
        <Box mb={2}>
          <CallToActionButton classes={classes} />
        </Box>
      </SwipeableDrawer>
    </Hidden>
  );
}

function DropdownMenu({ route, classes, currPath }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <div>
        <Button
          aria-label="navigation"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          disableRipple
          className={`${classes.navLink} ${
            currPath.startsWith(route.path) && "active"
          }`}
        >
          {route.name}
          <ExpandMore />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {route.dropRoutes.map((dropRoute) => (
                      <Link
                        to={route.path + dropRoute.path}
                        key={route.path + dropRoute.path + dropRoute.name}
                      >
                        <MenuItem
                          onClick={handleClose}
                          className={`${classes.listItem} ${
                            currPath === route.path + dropRoute.path && "active"
                          }`}
                        >
                          {dropRoute.name}
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

function NestedListNav({ currPath, route, classes, setDrawerOpen }) {
  const [nestedOpen, setNestedOpen] = useState(currPath.startsWith(route.path));

  return (
    <div>
      <ListItem
        button
        onClick={() => setNestedOpen(!nestedOpen)}
        className={`${classes.listItem} ${
          currPath.startsWith(route.path) && !nestedOpen && "active"
        }`}
      >
        <ListItemText primary={route.name} />
        {nestedOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {route.dropRoutes.map((r) => (
            <Link key={route.path + r.path + r.name} to={route.path + r.path}>
              <ListItem
                className={`${classes.listItem} ${
                  currPath === route.path + r.path && "active"
                }`}
                button
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText
                  style={{ paddingLeft: "31px" }}
                  primary={r.name}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
    </div>
  );
}

function CallToActionButton({ classes }) {
  return (
    <Box ml={2}>
      <Button
        aria-label="call to action"
        variant="contained"
        className={classes.callToAction}
      >
        Call To Action
      </Button>
    </Box>
  );
}
