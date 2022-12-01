import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function Custom404() {
    return (
    <>
        <title>Page not found | Coinworth</title>
        <Link href="/">
            <img className="logo shrink" src="https://cortez.link/a/coinworth-favicon.ico" />
        </Link>
        <h1 className="error-page">Page not found</h1>
        <Fade delay={100}>
            <Link className="center-button big-button shrink" href={"/"}>Go home</Link>
        </Fade>
    </>
)}