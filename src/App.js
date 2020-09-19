import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";

import routes from "./data/routes";

function App() {
  // window resizing
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    let vh = dimensions.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    const debouncedHandleResize = debounce(function handleResize() {
      let wBreakpoint = 500;
      if (
        !(
          window.innerWidth === dimensions.width &&
          dimensions.width < wBreakpoint
        )
      )
        setTimeout(() => {
          setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
          });
        }, 420);
    });

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <div className="App">
        <Switch>
          {routes.map(({ path, Component, dropRoutes }) => {
            if (!dropRoutes)
              return (
                <Route key={path} exact path={path}>
                  <Component />
                </Route>
              );
            else {
              return dropRoutes.map((dropRoute) => (
                <Route
                  key={path + dropRoute.path}
                  exact
                  path={path + dropRoute.path}
                >
                  <dropRoute.Component />
                </Route>
              ));
            }
          })}
          <Redirect to="/" />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}
