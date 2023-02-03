import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function Custom404() {
    return (
    <>
        <title>Page not found | Coins</title>
        <Link href="/">
          <div className="logo-wrapper copy-button shrink"><img className="logo" src="https://cortez.link/a/coins-favicon.png" alt="Coins Logo" /> <p className="word-mark">Coins</p></div>
        </Link>
        <Fade cascade damping={0.1} direction="up">
            <h1 className="error-page">Page not found</h1>
        </Fade>
        <Fade>
            <Link className="center-button big-button shrink" href={"/"}>Go home</Link>
        </Fade>
    </>
)}