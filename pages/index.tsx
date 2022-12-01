import Link from 'next/link';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Fade } from "react-awesome-reveal";

export default function Home() {

  const newLink: any = useRef(null);
  const [route, setRoute] = useState("");
  const router = useRouter();
  const [userMessage, setUserMessage] = useState("");

  const handleChange = (e: any) => {
    document.onkeyup = function(e) {
      (e.keyCode && e.which == 8) ? (setRoute("")) : "";
      (e.key === "Enter" && route.length != 0)  ? router.push(`/${route}/create`) : "";
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
        <title>Coinworth</title>
        <meta property="og:title" content="Coinworth" />
        <meta name="description" content="Coinworth is a simple cash and cryptocurrency portfolio tracker." />
        <meta property="og:image" content="https://cortez.link/a/coinworth-meta.png" />
      </Head>
      <img className="banner-image" src="https://cortez.link/a/coinworth-coins.png" />
      <Fade cascade damping={0.1} direction="up">
        <h1 className="hero-header">Coinworth is a simple, anonymous, and <a href="https://github.com/cortez/coinworth" className="github">open source</a> way to keep track of your cash and crypto.</h1>
        <div>
          <p className="username-input-text"><span>coinworth.xyz/ </span><input className="username-input" ref={newLink} placeholder="new-portfolio-name" value={route} onChange={handleChange}></input></p>
        </div>
      </Fade>
      <Fade cascade duration={200}>
        <button className="big-button-text button-text bottom-0 shrink" onClick={handleSubmit}>Create!</button>
        <p className="user-message">{userMessage}</p>
      </Fade>
    </>
  );
};