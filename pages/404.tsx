import Link from "next/link"
import { Fade } from "react-awesome-reveal"

export default function Custom404() {
  return (
    <>
      <title>Page not found | Coins</title>
      <Link href="/">
        <div className="logo-wrapper copy-button shrink">
          <img
            className="logo"
            src="https://cdn.raster.app/mo3ymucdlps90r/coins/HqIqKj4eQc?ixlib=js-3.8.0&s=0ad631e727c5ab2b3067e05fb8be3ff0"
            alt="Coins Logo"
          />{" "}
          <p className="word-mark">Coins</p>
        </div>
      </Link>
      <Fade cascade damping={0.1} direction="up">
        <h1 className="error-page">Page not found</h1>
      </Fade>
      <Fade>
        <Link className="center-button big-button shrink" href={"/"}>
          Go home
        </Link>
      </Fade>
    </>
  )
}
