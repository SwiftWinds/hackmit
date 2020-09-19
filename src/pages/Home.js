import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Page from "../components/Page";

export default function Home() {
  return (
    <Page title="Home - React MUI App" description="Home page.">
      <Container>
        <Grid>
          <Typography variant="h3">Home page</Typography>
          <Typography variant="body1">
            Use a mobile screen to see what happens to the navbar.
          </Typography>
        </Grid>
      </Container>
    </Page>
  );
}
