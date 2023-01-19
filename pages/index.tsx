import Link from "next/link";
import Head from "next/head";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Fade } from "react-awesome-reveal";

export default function Home() {

  const newLink: any = useRef(null);
  const [route, setRoute] = useState("");
  const router = useRouter();
  const [userMessage, setUserMessage] = useState("");

  const handleChange = (e: any) => {
    document.onkeyup = function(e) {
      (e.keyCode && e.which == 8) ? (setRoute("")) : "";
      // (e.key === "Enter" && route.length != 0)  ? router.push(`/${route}/create`) : "";
    };
    (/^[0-9A-Za-z_-]+$/.test(e.target.value)) ? setRoute(e.target.value) : newLink.current.value = "";
  };

  const handleSubmit = () => {
    fetch("/api/users")
      .then(response => response.json())
      .then(data => {
        try {
          data["data"].find((x: { username: string; }) => x.username === route).username;
          setUserMessage("Username is taken.");
        } catch {
          route.length > 30 ? setUserMessage("Username is too long.") : route.length === 0 ? setUserMessage("Please enter a username.") : router.push(`/${route}/create`);
        }
    });
  }

  return (
    <>
      <Head>
        <title>Coins</title>
        <meta property="og:title" content="Coins" />
        <meta name="description" content="Coins is a simple cash and cryptocurrency portfolio tracker." />
        <meta property="og:image" content="https://cortez.link/a/coins-meta.png" />
      </Head>
      <Fade cascade damping={0.1}>
        <img className="banner-image" src="https://cortez.link/a/coins-hero.png" />
        <img className="iphone-image wiggle" src="https://cortez.link/a/coins-iphone.png" />
        <Link href="/">
          <div className="logo-wrapper copy-button shrink"><img className="logo" src="https://cortez.link/a/coins-logo.png"></img> <p className="word-mark">Coins</p></div>
        </Link>
        <a href="https://github.com/cortez/coins">
          <button className="copy-button shrink">GitHub</button>
        </a>
      </Fade>
      <Fade cascade damping={0.1} delay={200} direction="up">
        <h1 className="hero-header">The simple and anonymous way to keep track of your cash and crypto.</h1>
        <div>
          <p className="username-input-text">
            <span className="link-text">coins.seph.us/ </span><input className="username-input" ref={newLink} placeholder="new-portfolio" value={route} onChange={handleChange}></input>
            <button className="hero-button big-button shrink" onClick={handleSubmit}>Go</button>
          </p>
          <p className="user-message">{userMessage}</p>
        </div>
      </Fade>
    </>
  );
};