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
          setUserMessage("Username already taken.");
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
      <Fade cascade damping={0.1} duration={500}>
        <Link href="/">
          <div className="logo-wrapper copy-button shrink"><img className="logo" src="https://cortez.link/a/coins-favicon.png" alt="Coins Logo" /> <p className="word-mark">Coins</p></div>
        </Link>
        <a href="https://github.com/cortez/coins">
          <button className="copy-button shrink">GitHub</button>
        </a>
      </Fade>
      <Fade cascade damping={0.1} duration={500}>
        <div className="hero-header">
          <h1>The simple and anonymous way to keep track of your cash and crypto.</h1>
          <Fade cascade damping={0.1} duration={500}>
            <p className="username-input-text">
              <span className="link-text">coins.cortez.link/ </span><input className="username-input" ref={newLink} placeholder="new-portfolio" value={route} onChange={handleChange}></input>
              <button className="hero-button big-button shrink" onClick={handleSubmit}>Go</button>
            </p>
            <p className="user-message">{userMessage}</p>
          </Fade>
        </div>
      </Fade>
      <Fade cascade damping={0.1} duration={200}>
        <img className="iphone-image" src="https://cortez.link/a/coins-iphone.png" alt="iPhone Image" />
        <img className="iphone-image-mobile" src="https://cortez.link/a/coins-iphone-mobile.png" alt="iPhone Image" />
      </Fade>
    </>
  );
};