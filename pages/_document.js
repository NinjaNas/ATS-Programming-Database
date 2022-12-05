import Document, { Html, Head, Main, NextScript } from "next/document";

// This file allow us to insert code into the head and other places
class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}

export default CustomDocument;
