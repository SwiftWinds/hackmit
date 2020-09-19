# react-mui-boilerplate

Material-UI CRA Boilerplate with <b>React Routing</b> and Node Sass. [Demo](https://react-mui-boilerplate.netlify.app).

## MUI and React Router Navigation

React Router will dynamically map routes (including dropdowns) found in `src/data/routes.js`.

Material-UI destkop navbar and mobile drawer is preconfigured and will also dynamically map the routes found in `src/data/routes.js`.

## Styles

Material-UI theming and `<CssBaseline />` is already implemented. The typical `useStyles()` template is already used on the Header component. Node SASS is also configured with some commonly used styles.

## Other

`<Page />` is a useful re-usable component that works with the `<Header />` component. It also allows <b>easy `react-helmet` usage</b> via props.

Netlify `_redirects` file inside `/public`.

## Usage

```bash
git clone https://github.com/MasonWang025/react-mui-boilerplate.git
npm install
npm start
```
