import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Page from "../components/Page";

export default function Drop() {
  return (
    <Page title="Drop - React MUI App" description="Drop page.">
      <Container>
        <Grid>
          <Typography variant="h3">Drop page</Typography>
          <Typography variant="body1">
            Dropdown routes are supported in <b>mobile and desktop</b>.
          </Typography>
        </Grid>
      </Container>
    </Page>
  );
}
