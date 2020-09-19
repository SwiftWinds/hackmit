// Page components
import Home from "../pages/Home";
import About from "../pages/About";
import Drop from "../pages/Drop";

const routes = [
  { path: "/", Component: Home, name: "Home" },
  { path: "/about", Component: About, name: "About" },
  {
    path: "/drop",
    name: "Dropdown",
    dropRoutes: [{ path: "/", Component: Drop, name: "Dropdown 1" }],
  },
];

export default routes;
