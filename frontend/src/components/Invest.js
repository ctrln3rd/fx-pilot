import React from "react";
import './Invest.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Invest(){
    const user = useSelector(state=> state.currentuser.email);
    return(
    <div className="investCont">
    <h2>Invest with us</h2>
    <p id="investText">Start your simulated trading today with any amount without using your debit/credit card</p>
    {!user && <div className="investAuth">
        <Link to='/login' className="investauth">Already a member? <span>login</span> </Link>
        <Link to='/signup' className="investauth">Not amember a member? <span>signup</span></Link>
    </div>}
    <Link to='/profile/deposit' className="investdeposit"> deposit to my account </Link>
    </div>
    )
}
