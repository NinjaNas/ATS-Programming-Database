// Renders all of the pages, both client and server side
import { Component } from "react";
// Globals.css can only be used in _app.js, any other stylesheet needs file name [Name].module.css to work
import "../styles/globals.css";

// Arrow function, return is implied
const App = ({ Component, pageProps }) => (
  // Render all the components and their properties
  <Component {...pageProps} />
);

export default App;
