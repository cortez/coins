import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Fade } from "react-awesome-reveal";

export default function Home() {

  const newLink: any = useRef(null);
  const [route, setRoute] = useState('');
  const router = useRouter();

  const handleChange = (e: any) => {
    document.onkeyup = function(e) {
      (e.keyCode && e.which == 8) ? (setRoute("")) : "";
      (e.key === "Enter" && route.length != 0)  ? router.push(`/${route}/create`) : "";
    };
    (/^[0-9A-Za-z_-]+$/.test(e.target.value)) ? setRoute(e.target.value) : newLink.current.value = "";
  };

  const handleBlank = () => {
    let result;
    route.length === 0 || route.length > 30 ? result = "/" : result = `/${route}/create`;
    return result;
  }

  return (
    <>
      <Fade cascade damping={0.1} direction="up">
        <title>Coinworth</title>

        {/* <Link href="https://github.com/cortez/coinworth">
            <svg className="logo shrink" xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#E6AF2E" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="88 64 16 128 88 192" fill="none" stroke="#E6AF2E" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline><polyline points="168 64 240 128 168 192" fill="none" stroke="#E6AF2E" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></polyline></svg>
        </Link> */}


          <h1>Coinworth is a simple way to keep track of your cash and crypto.</h1>
        <div>
          <p className="username-input-text"><span>coinworth.xyz/ </span><input className="username-input" ref={newLink} placeholder="new-portfolio-name" value={route} onChange={handleChange}></input></p>
        </div>
      </Fade>
      <Fade cascade duration={200}>
        <Link className="big-button" href={handleBlank()}>
          <button className="big-button-text button-text bottom-0 shrink">Create!</button>
        </Link>
      </Fade>
    </>
  );
};