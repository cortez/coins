import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function Custom404() {
    return <><title>Page not found | Coinworth</title><h1>Page not found</h1><Fade delay={100}><Link className="big-button-text bottom-0 shrink" href={"/"}>Go home</Link></Fade></>
}