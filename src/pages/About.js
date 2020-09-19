import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Page from "../components/Page";

export default function About() {
  return (
    <Page title="About - React MUI App" description="About page.">
      <Container>
        <Grid>
          <Typography variant="h3">About page</Typography>
          <Typography variant="body1">Edit src/data/routes.</Typography>
        </Grid>
      </Container>
    </Page>
  );
}
