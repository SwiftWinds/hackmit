import React from "react";
import { Box } from "@material-ui/core";
import { Helmet } from "react-helmet";

export default function Page(props) {
  return (
    <div className={`page ${props.className}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Helmet>
      <Box
        style={{
          minHeight: `calc(100vh - ${window.innerWidth > 600 ? 64 : 56}px)`,
        }}
      >
        {props.children}
      </Box>
    </div>
  );
}
