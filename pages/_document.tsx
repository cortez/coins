import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';

class MyDocument extends Document {
  render() {
    const { publicRuntimeConfig } = getConfig();

    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Coins" />
          <link rel="manifest" href={`${publicRuntimeConfig.baseUrl}/manifest.json`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;