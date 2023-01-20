import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function Custom404() {
    return (
    <>
        <title>Page not found | Coins</title>
        <Link href="/">
            <div className="logo-wrapper copy-button shrink"><img className="logo" src="favicon.ico"></img> <p className="word-mark">Coins</p></div>
        </Link>
        <h1 className="error-page">Page not found</h1>
        <Fade delay={100}>
            <Link className="center-button big-button shrink" href={"/"}>Go home</Link>
        </Fade>
    </>
)}