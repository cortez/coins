import Link from "next/link"
import Head from "next/head"

import { useRouter } from "next/router"

import { useRef, useState } from "react"

import { Fade } from "react-awesome-reveal"

export default function Home() {
  const newLink: any = useRef(null)
  const [route, setRoute] = useState("")
  const router = useRouter()
  const [userMessage, setUserMessage] = useState("")

  const handleChange = (e: any) => {
    document.onkeyup = function (e) {
      e.keyCode && e.which == 8 ? setRoute("") : ""
    }
    ;/^[0-9A-Za-z_-]+$/.test(e.target.value)
      ? setRoute(e.target.value)
      : (newLink.current.value = "")
  }

  const handleSubmit = () => {
    if (route.length === 0) {
      setUserMessage("Please enter a username.")
    } else if (route.length > 30) {
      setUserMessage("Username is too long.")
    } else {
      fetch("/api/users")
        .then((response) => response.json())
        .then((data) => {
          try {
            data["data"].find((x: { username: string }) => x.username === route)
              .username
            setUserMessage("Username already taken.")
          } catch {
            router.push(`/${route}/create`)
          }
        })
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleSubmit()
    }
  }

  return (
    <>
      <Head>
        <title>Coins</title>
        <meta property="og:title" content="Coins" />
        <meta
          name="description"
          content="Coins is a simple cash and cryptocurrency portfolio tracker."
        />
        <meta
          property="og:image"
          content="https://cdn.raster.app/mo3ymucdlps90r/coins/asbAAMHqSy?ixlib=js-3.8.0&s=2316922af9ed214287b74733901e2a64"
        />
      </Head>
      <Fade cascade damping={0.1} duration={500}>
        <Link href="/">
          <div className="logo-wrapper copy-button shrink">
            <img
              className="logo"
              src="https://cdn.raster.app/mo3ymucdlps90r/coins/HqIqKj4eQc?ixlib=js-3.8.0&s=0ad631e727c5ab2b3067e05fb8be3ff0"
              alt="Coins Logo"
            />
            <p className="word-mark">Coins</p>
          </div>
        </Link>
        <a href="https://github.com/cortez/coins">
          <button className="copy-button shrink">GitHub</button>
        </a>
      </Fade>
      <Fade cascade damping={0.1} duration={500}>
        <div className="hero-header">
          <h1>
            The simple and anonymous way to keep track of your cash and crypto.
          </h1>
          <Fade cascade damping={0.1} duration={500}>
            <p className="username-input-text">
              <span className="link-text">coins.cortez.link/ </span>
              <input
                className="username-input"
                ref={newLink}
                placeholder="new-username"
                value={route}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button
                className="hero-button big-button shrink"
                onClick={handleSubmit}
              >
                Go
              </button>
            </p>
            <p className="user-message">{userMessage}</p>
          </Fade>
        </div>
      </Fade>
      <Fade cascade damping={0.1} duration={200}>
        <img
          className="iphone-image"
          src="https://cdn.raster.app/mo3ymucdlps90r/coins/LM4GHVa93c?ixlib=js-3.8.0&s=d207babcf2a35b59ab1c09db0605b606"
          alt="iPhone Image"
        />
        <img
          className="iphone-image-mobile"
          src="https://cdn.raster.app/mo3ymucdlps90r/coins/lqNv2So1F8?ixlib=js-3.8.0&s=d21fde3c4d02c638aeaade67d541149d"
          alt="iPhone Image"
        />
      </Fade>
    </>
  )
}
