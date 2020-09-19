import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleText: {
    color: theme.palette.secondary.dark,
  },
  navbar: {
    backgroundColor: "#ffffff",
    "&, button": {
      color: theme.palette.secondary.dark,
      textTransform: "none",
    },
  },
  navLink: {
    color: "white",
    fontSize: "1.2em",
    marginLeft: "0.42em",
    "&::before": {
      transition: "0.25s ease-in-out",
      backgroundColor: theme.palette.secondary.dark,
      content: '""',
      zIndex: -10,
      display: "block",
      bottom: "0",
      position: "absolute",
      height: "6.42%",
      width: "0",
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
    },
    "&:hover": {
      backgroundColor: "inherit",
      "&::before": {
        width: "100%",
      },
    },
    "&.active": {
      color: theme.palette.secondary.darkest,
      fontWeight: "bold",
      "&::before": {
        width: "100%",
      },
    },
  },
  list: {
    width: 250,
    alignText: "center",
  },
  listItem: {
    color: "black",
    "&.active": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  callToAction: {
    color: "white !important",
    background: theme.palette.primary.main,
    "&:hover, &:active, &:focus": {
      background: theme.palette.primary.darker,
    },
  },
  backToTop: {
    position: "fixed",
    zIndex: 10,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default useStyles;
