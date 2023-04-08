import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import App from 'next/app';
import getConfig from 'next/config';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const { publicRuntimeConfig } = getConfig();

    return (
      <>
        <Component {...pageProps} />
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('${publicRuntimeConfig.baseUrl}/sw.js');
                });
              }
            `,
          }}
        />
      </>
    );
  }
}

export default MyApp;