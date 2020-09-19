import React from "react";
import { Container, Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Footer() {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.secondary.darkest,
      color: "white",
    },
  }));
  const classes = useStyles();

  return (
    <Box py={"2.5em"} className={classes.root}>
      <Container>
        <Grid>Footer</Grid>
      </Container>
    </Box>
  );
}
