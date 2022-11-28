import Link from 'next/link';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Fade } from "react-awesome-reveal";

export default function Home() {

  const newLink: any = useRef(null);
  const [route, setRoute] = useState('');
  const router = useRouter();

  const handleChange = (e: any) => {
    document.onkeyup = function(e) {
      (e.keyCode && e.which == 8) ? (setRoute("")) : "";
      (e.key === "Enter" && route.length != 0)  ? router.push(`/${route}/create`) : "";
    };
    (/^[0-9A-Za-z_-]+$/.test(e.target.value)) ? setRoute(e.target.value) : newLink.current.value = "";
  };

  const handleBlank = () => {
    let result;
    route.length === 0 || route.length > 30 ? result = "/" : result = `/${route}/create`;
    return result;
  }

  return (
    <>
      <Head>
        <title>Coinworth</title>
        <meta property="og:title" content="Coinworth" />
        <meta name="description" content="Coinworth is a simple cash and cryptocurrency portfolio tracker." />
        <meta property="og:image" content="https://cortez.link/a/coinworth-meta.png" />
      </Head>
      <Fade cascade damping={0.1} direction="up">
        <h1>Coinworth is a simple and <a href="https://github.com/cortez/coinworth" className="github">open source</a> way to keep track of your cash and crypto.</h1>
        <div>
          <p className="username-input-text"><span>coinworth.xyz/ </span><input className="username-input" ref={newLink} placeholder="new-portfolio-name" value={route} onChange={handleChange}></input></p>
        </div>
      </Fade>
      <Fade cascade duration={200}>
        <Link className="big-button" href={handleBlank()}>
          <button className="big-button-text button-text bottom-0 shrink">Create!</button>
        </Link>
      </Fade>
    </>
  );
};