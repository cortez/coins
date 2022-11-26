import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRef } from 'react';
import axios from "axios";
import { Fade } from "react-awesome-reveal";

export default function CreatePortfolio() {
    const router = useRouter();
    const { slug } = router.query;

    fetch("/api/users")
      .then(response => response.json())
      .then(data => {
        try {
            data["data"].find((x: { username: string; }) => x.username === slug).username === undefined ? 0 : router.push("/");
        } catch {
            return;
        }
    });

    let cashValue: any; let cash: any = useRef(null);
    let cryptoAmount: any[] = []; let amount: any = useRef(null);
    let cryptoSymbol: any[] = []; let symbol: any = useRef(null);

    function submitCash() {
        (isNaN(cash.current.value) || cash.current.value === undefined) ? cashValue = 0 : cashValue = parseFloat(cash.current.value).toFixed(2);
        cash.current.value = "";
        // console.log(cashValue);
    }
    
    function submitCrypto() {
        cryptoAmount.push(parseFloat(amount.current.value));
        cryptoSymbol.push(symbol.current.value);
        amount.current.value = "";
        symbol.current.value = "";
        // console.log(cryptoAmount);
        // console.log(cryptoSymbol);
    }
    
    const postInfo = () => {
        axios.post("/api/users", {
            "username": `${ slug }`,
            "cash": cashValue,
            "cryptoAmounts":`${cryptoAmount}`,
            "cryptoSymbols":`${cryptoSymbol}`
        })
        // .then(response => {
        //     console.log(response);
        // });
    }

    const Done = () => {
        return (
            <Link href={`/${slug}`}>
                <button className="big-button-text button-text shrink" onClick={postInfo}>Done</button>
            </Link>
        )
    }

    return (
        <>
            <title>Create User | Coinworth</title>
            <Fade cascade damping={0.1} direction="up">
                <h1 className="create-header">Add up to 1 cash holding in USD and as many crypto holdings as you'd like!</h1>
            </Fade>
            <input className="create-input" ref={cash} placeholder="Amount" type="text" onKeyPress={(event) => {
                    if (!/[0-9.]/.test(event.key)) { event.preventDefault(); }
                }}
            ></input>
            <button className="small-button shrink" onClick={submitCash}>Update Cash</button>

            <input className="create-input" ref={amount} placeholder="Amount" type="text" onKeyPress={(event) => {
                    if (!/[0-9.]/.test(event.key)) { event.preventDefault(); }
                }}
            ></input>
            <input className="create-input" ref={symbol} placeholder="Symbol" type="text" onKeyPress={(event) => {
                    if (!/[A-Za-z]/.test(event.key)) { event.preventDefault(); }
                }}
            ></input>
            <button className="small-button shrink" onClick={submitCrypto}>Add Crypto</button>
            {Done()}
        </>
    )
}