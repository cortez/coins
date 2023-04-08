import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import router from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {

  const manifest = {
    "name": "Coins",
    "short_name": "Coins",
    "display": "standalone",
    "icons": [
      {
        "src": "/apple-touch-icon.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  }

  const { slug } = router.query;
  useEffect(() => {
    if (slug) {
      const manifestElement = document.getElementById("manifest");
      const manifestString = JSON.stringify({
        ...manifest,
        start_url: `/${slug}`,
      });
      manifestElement?.setAttribute(
        "href",
        "data:application/json;charset=utf-8," + encodeURIComponent(manifestString),
      );
    }
  }, [slug]);

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}