# React / Webpack / Bootstrap Boilerplate

This Boilerplate is a simple starter for your React based frontend app that fully
supports Bootstrap.


## How to get started

1. First you can implement your app in the `/app/components` folder. The Root
Component is `App.jsx` this is were you add your components. Other components
(e.g `Header.jsx`) used by the root components are implemented into the same
folder. Every component can have a css file with the same name as the component
it belongs to (e.g. `Header.css`). The css can be used inside the JSX after the
CSS file has been imported with an `import './Header.css'`.

2. For development one can start the development server with `npm run start`. The
development server support hot reload!

3. To build a production version of the app use `npm run build`. The output will
be in the `/build` directory.

Things to do in the future *Redux*, *ReactRouter* and *Authentication*.

Have fun
Dennis
