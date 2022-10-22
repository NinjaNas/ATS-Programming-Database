// Renders all of the pages, both client and server side
// Globals.css can only be used in _app.js, any other stylesheet needs file name [Name].module.css to work
import "../styles/globals.css";

import Head from "next/head";

// Arrow function, return is implied
const App = ({ Component, pageProps }) => (
  // Can only return one element, must empty html tag
  <>
    {/* Next.js forces title tag to be in _app.js but each page can have its own title */}
    <Head>
      <title>ATS</title>
    </Head>
    {/* Render all the components and their properties */}
    <Component {...pageProps} />
  </>
);

export default App;
