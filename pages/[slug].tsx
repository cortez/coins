import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Link from "next/link";
import Head from "next/head";
import useClickToCopy from "../hooks/useClickToCopy";
import { Fade } from "react-awesome-reveal";

let data: any = {};
fetch("https://api.coincap.io/v2/assets")
  .then(res => res.json())
  .then(all => {
    data = all;
  })

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function Number({ n }: any) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: n },
    delay: 0,
    config: { mass: 1, tension: 120, friction: 14, duration: 350 },
  });

  const animatedNumber = number.to((val) =>
    isNaN(val) ? '' : formatter.format(parseFloat(val.toFixed(2)))
  );

  return (
    <>
      {!isNaN(n) ? (
        <animated.div>{animatedNumber}</animated.div>
      ) : (
        n
      )}
    </>
  );
}

export default function DynamicPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [cash, setCash] = useState<any>(0);
  const [cryptoAmount, setCryptoAmounts] = useState<any>("");
  const [cryptoSymbol, setCryptoSymbols] = useState<any>("");
  const [copyStatus, copy] = useClickToCopy(`https://coins.cortez.link/${slug}`);

  function loadInfo() {
    (fetch("/api/users"))
      .then(response => response.json())
      .then(data => {
        let account = data["data"].find((x: { username: string; }) => x.username === slug);
        try {
          isNaN(account.cash) ? setCash(0) : setCash(account.cash);
          account.cryptoAmounts != '' ? setCryptoAmounts(account.cryptoAmounts.split(",")) : setCryptoAmounts(0);
          account.cryptoSymbols != '' ? setCryptoSymbols(account.cryptoSymbols.toUpperCase().split(",")) : setCryptoSymbols(0);

        } catch {
          setCash([]);
          setCryptoAmounts("");
          setCryptoSymbols("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => { loadInfo() });

  const crypto = Array.from(cryptoAmount);
  const cryptoTotal = crypto.map((x: any, i: any) => {
    try {
      return x * parseFloat(data["data"].find((x: { [x: string]: any; }) => x["symbol"] === cryptoSymbol[i]).priceUsd)
    } catch {
      return 0;
    }
  })

  let total = parseFloat(cash) + cryptoTotal.reduce((x: any, y: any) => x + y, 0);
  const stars = "***";
  const [hideNumbers, setHideNumbers] = useState(false);
  const handleNumbers = () => {
    setHideNumbers(!hideNumbers);
  };

  useEffect(() => {
    const manifest = {
      "name": "Coins",
      "short_name": "Coins",
      "start_url": `/${slug}`,
      "display": "standalone",
      "icons": [
        {
          "src": "/apple-touch-icon.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    };

    const json = JSON.stringify(manifest);
    const blob = new Blob([json], { type: "application/json" });
    const manifestUrl = URL.createObjectURL(blob);
    const link = document.createElement("link");
    link.rel = "manifest";
    link.href = manifestUrl;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
      URL.revokeObjectURL(manifestUrl);
    };
  }, [slug]);

  return (
    <>
      <>
        {!isNaN(total) ? (
          <>
            <Head>
              <title key="title">{hideNumbers ? "Coins" : formatter.format(total)}</title>
              <meta property="og:image" content="https://cortez.link/a/coins-meta.png" />
              {(slug === undefined && total === 0) ? <meta property="og:title" content="My Portfolio | Coins" /> : <meta property="og:title" content={`${slug} (${formatter.format(total)})`} />}
            </Head>
            <Fade cascade damping={0.1}>
              <h1 onClick={handleNumbers} className="total-value shrink">
                {<>
                  {hideNumbers
                    ? <Number n={`$${stars}`}></Number>
                    : <Number n={total}></Number>}
                </>}
              </h1>
              <Link href="/">
                <div className="logo-wrapper copy-button shrink"><img className="logo" src="https://cortez.link/a/coins-favicon.png" alt="Coins Logo" /> <p className="word-mark">Coins</p></div>
              </Link>
              {!isNaN(total) ? (
                <>
                  {hideNumbers
                    ? <p className="values-hidden"><img src="/hidden.svg" /> Values Hidden</p>
                    : (
                      <>
                        <button className="shrink copy-button" onClick={copy}>
                          {!copyStatus ? <>{"Share"}</> : <>{"Copied URL"}</>}
                        </button>
                      </>
                    )}
                </>
              ) : ""}
            </Fade>
          </>) : (
          <>
            <Head>
              <title key="title">User not found | Coins</title>
            </Head>
            <Fade cascade damping={0.1} direction="up">
              <h1 className="error-page">User not found</h1>
            </Fade>
            <Link href="/">
              <div className="logo-wrapper copy-button shrink"><img className="logo" src="https://cortez.link/a/coins-favicon.png" alt="Coins Logo" /> <p className="word-mark">Coins</p></div>
            </Link>
            <Fade delay={100}>
              <Link className="center-button big-button shrink" href={`/${slug}/create`}>Create user {slug}</Link>
            </Fade>
          </>
        )}
      </>
      {cash > 0 && !isNaN(cash) ? <Fade cascade damping={0.1} duration={400} direction="up">
        <div className="holding">USD
          <span>
            {<>
              {hideNumbers
                ? `$${stars}`
                : formatter.format(cash)}
            </>}&nbsp;&nbsp;
            <span className="percent">
              {((cash / total) * 100).toFixed(1)}%
            </span>
          </span>
        </div></Fade> : ""}
      {crypto != null ? crypto.map((x: any, i: any) => {
        let result: any;
        try {
          result = (crypto.length != undefined ? x * parseFloat(data["data"].find((x: { [x: string]: any; }) => x["symbol"] === cryptoSymbol[i]).priceUsd) : "") || function () { throw "error" }();
        } catch {
          result = "";
        }
        return (
          <Fade cascade damping={0.1} delay={(100 * (i + 1))} duration={400} direction="up" key={x}>
            {(!isNaN(x) && x !== 0 && cryptoSymbol[i] !== 0 && !isNaN(result / total) && result / total !== 0) ? (
              <>
                <div className="holding">
                  {x != 0 && !isNaN(x) ? (
                    <>
                      {hideNumbers
                        ? stars
                        : x}
                    </>
                  ) : ""} {cryptoSymbol[i] != 0 ? cryptoSymbol[i] : ""}
                  <span>
                    {result != 0 ? <>
                      {hideNumbers
                        ? `$${stars}`
                        : formatter.format(result)}
                    </> : ""} {(!isNaN(result / total) && result / total !== 0) ? <>&nbsp;&nbsp;<span className="percent">
                      {((result / total) * 100).toFixed(1)}%</span></> : ""}
                  </span>
                </div>
              </>
            ) : ""}
          </Fade>
        )
      }) : ""}
      {/* <Fade cascade damping={0.1} direction="up">
        <div className="holding"></div>
      </Fade> */}
    </>
  )
};