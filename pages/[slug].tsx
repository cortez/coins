import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Link from "next/link";
import useClickToCopy from "../hooks/useClickToCopy";
import { Fade } from "react-awesome-reveal";

let data: any = {};
fetch("https://api.coincap.io/v2/assets")
  .then(res => res.json())
  .then(all => {
    data = all;
  })

function Number({ n }:any) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 0,
    config: { mass: 1, tension: 25, friction: 10 },
  });
  return <animated.div>{number.to((n) => formatter.format(n))}</animated.div>
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// function cashFormat(x: any) {
//     return `$${parseFloat(x).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")}`;
// }

//   const [width, setWidth]   = useState(typeof window === 'undefined' ? 0 : window.innerWidth);
//   const [height, setHeight] = useState(typeof window === 'undefined' ? 0 : window.innerHeight);
//   const updateDimensions = () => {
//       if (typeof window !== 'undefined') {
//       setWidth(window.innerWidth);
//       setHeight(window.innerHeight);
//       }
//   }

//   useEffect(() => {
//     window.addEventListener("resize", updateDimensions);
//     return () => window.removeEventListener("resize", updateDimensions);
// }, [updateDimensions]);

export default function DynamicPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [cash, setCash] = useState<any>(0);
  const [cryptoAmount, setCryptoAmounts] = useState<any>("");
  const [cryptoSymbol, setCryptoSymbols] = useState<any>("");
  const [copyStatus, copy] = useClickToCopy(`https://coinworth.xyz/${slug}`);

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
      .catch(function(error) {
        console.log(error);
    });
  }

  useEffect(() => {loadInfo()});
  
  const crypto = Array.from(cryptoAmount);
  const cryptoTotal = crypto.map((x: any, i: any) => {
    try {
      return x*parseFloat(data["data"].find((x: { [x: string]: any; }) => x["symbol"] === cryptoSymbol[i]).priceUsd)
    } catch {
      return 0;
    }
  })
  
  let total = parseFloat(cash) + cryptoTotal.reduce((x: any, y: any) => x + y, 0);

  return (
    <>
      <>
        {!isNaN(total) ? (
        <>
          <title>{formatter.format(total)}</title>
          <Fade cascade damping={0.1}>
              <h1 className="total-value">{<Number n={total}></Number>}</h1>
            <Link href="/">
              <p className="word-mark copy-button shrink">Coins</p>
            </Link>
            {!isNaN(total) ? (<button className="shrink copy-button" onClick={copy}>{!copyStatus ? <>{"Share"}</> : <>{"Copied URL"}</>}</button>) : ""}
          </Fade>
        </>) : (
        <>
          <title>User not found | Coins</title>
          <Fade cascade damping={0.1} direction="up" delay={100}>
            <h1 className="error-page">User not found</h1>
          </Fade>
          <Link href="/">
            <p className="word-mark copy-button shrink">Coins</p>
          </Link>
          <Fade delay={100}>
            <Link className="center-button big-button shrink" href={`/${slug}/create`}>Create user {slug}</Link>
          </Fade>
        </>
        )}
      </>
      {cash > 0 && !isNaN(cash) ? <Fade cascade damping={0.1} duration={400} direction="up"><div className="holding">USD <span>{formatter.format(cash)}&nbsp;&nbsp;<span className="percent">{((cash/total)*100).toFixed(2)}%</span></span></div></Fade> : ""}
      {crypto != null ? crypto.map((x: any, i: any) => {
        let result: any;
        try {
          result = (crypto.length != undefined ? x*parseFloat(data["data"].find((x: { [x: string]: any; }) => x["symbol"] === cryptoSymbol[i]).priceUsd): "") || function(){throw "error"}();
        } catch {
          result = "";
        }
        return (
          <Fade cascade damping={0.1} delay={(100*(i+1))} duration={400} direction="up" key={x}>
            <div className="holding">
              {x != 0 && !isNaN(x) ? x : ""} {cryptoSymbol[i] != 0 ? cryptoSymbol[i] : ""}
              <span>
              {result != 0 ? formatter.format(result) : ""} {!isNaN(result/total) ? <>&nbsp;&nbsp;<span className="percent">{((result/total)*100).toFixed(2)}%</span></> : ""}
              </span>
            </div>
          </Fade>
        )
      }) : ""}
      {/* <Fade cascade damping={0.1} direction="up">
        <div className="holding"></div>
      </Fade> */}
    </>
  )  
};