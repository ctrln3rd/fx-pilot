import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Home.css'

export default function Home(){
    const currentuser = useSelector(state=>state.currentuser.value)
    return(
        <div className="homeCont">
        <div className="homeDiv" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/back1.jpg)`}}>
            <h4>Number one virtual <br/> trading partner in the world</h4>
                {currentuser ? <Link id="homeDivLink" to="/profile">view profile</Link>: <Link id="homeDivLink" to="/signup">Join us</Link>}
            </div>
            <div className="homeAbout">
            <h3>About us</h3>
                <div>
                <p>fxguard, your trusted trading partner based in Kenya. 
                    We specialize in providing professional trading solutions and personalized support to help traders achieve their.... </p>
                <Link to="/about" id="homeAboutLink">{'read more>>'}</Link>
                </div>
                <img src={`${process.env.PUBLIC_URL}/images/fximage1.jpeg`}/>
            </div>
            <div className="gettingStarted">
                <h3>Getting started</h3>
                <ul>
                    <li><img src={`${process.env.PUBLIC_URL}/images/fximage3.jpg`}/> <span>step 1 open account: </span> create your free fxguard  account</li>
                    <li><img src={`${process.env.PUBLIC_URL}/images/fximage8.jpg`}/> <span>step 2 deposit money: </span> deposit your first trading money minimum of 300usd </li>
                    <li><img src={`${process.env.PUBLIC_URL}/images/fximage6.jpeg`}/> <span>step 3 start trading: </span> start your trading journey that will affect the</li>
                </ul>
            </div>
            <div className="homeLearn">
                <h3>Learn how to trade</h3>
                <div>
                    <p>It's very important to learn basic forex trading before investing </p>
                    <Link to="/education" id="homeLearnLink">{'readmore >>'}</Link>
                </div>
                <img src={`${process.env.PUBLIC_URL}/images/fximage10.jpg`} alt="im"/>
            </div>
        </div>
    )
}