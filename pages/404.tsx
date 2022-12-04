import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function Custom404() {
    return (
    <>
        <title>Page not found | Coinworth</title>
        <Link href="/">
            <p className="word-mark copy-button shrink">Coinworth</p>
        </Link>
        <h1 className="error-page">Page not found</h1>
        <Fade delay={100}>
            <Link className="center-button big-button shrink" href={"/"}>Go home</Link>
        </Fade>
    </>
)}