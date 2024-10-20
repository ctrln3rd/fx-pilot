import React from "react";
import './Invest.css'
import { useDispatch } from "react-redux";

export default function Invest(){
    const dispatch = useDispatch();

    return(
    <div className="investCont">
    <h2>Invest with us</h2>
    <p id="investText">Earn huge profits for as low as <span>300 usd</span>. <br/> Deposit <span>300+usd</span> and enjoy huge profits you can track anytime of the day</p>
    <div className="investAuth">
        <button > Already a member? <span>login</span></button>
        <button >Not a member? <span>open a live account</span></button>
    </div>
    </div>
    )
}

function Methods(){
}
