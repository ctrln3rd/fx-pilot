import React from "react";
import './About.css'

export default function About(){

    return(
        <div className="aboutCont">
            <h2>About fxguard</h2>
            <p>Welcome to fxgaurd, your trusted trading partner in the fast-paced world of foreign exchange markets. 
                We specialize in providing professional trading solutions and personalized support to help traders achieve their financial goals.</p>
            <h4>Our Mission</h4>
            <p>At fxguard, our mission is to empower traders with the tools, knowledge, and support they need to succeed in the global Forex market.
                 We are committed to fostering long-term partnerships built on trust, transparency, and mutual success.</p>
            <h4>What Sets Us Apart</h4>
            <ul>
                <li><img src={`${process.env.PUBLIC_URL}/images/fximage7.jpg`}/><span>Personalized Guidance: </span>
                We understand that every trader is unique. 
                That's why we offer personalized guidance tailored to your individual trading style, experience level, and financial objectives.</li>
                <li><img src={`${process.env.PUBLIC_URL}/images/fximage6.jpeg`}/><span>Proven Strategies: </span> 
                Our team of experienced traders utilizes a diverse range of proven strategies and techniques 
                to navigate the complexities of the Forex market and identify lucrative trading opportunities.</li>
                <li><img src={`${process.env.PUBLIC_URL}/images/fximage4.jpg`}/><span>Risk Management: </span> Preserving capital is paramount in trading. 
                We prioritize risk management and employ strict measures to mitigate risk and protect your investment.</li>
                <li><img src={`${process.env.PUBLIC_URL}/images/fximage5.jpg`}/><span>Transparent Communication: </span> Transparency is at the core of our values. We believe in open and honest communication, 
                providing you with real-time market insights, performance reports, and updates to keep you informed every step of the way.</li>
            </ul>
            <h4>Our Commitment to Excellence</h4>
            <p>At fx guard, excellence is not just a goal—it's a standard we strive to uphold in everything we do. We are dedicated to delivering superior value, 
                performance, and service to our clients, exceeding expectations and setting new benchmarks for success.</p>
            <h4>Partner with Us Today</h4>
            <p>Whether you're an experienced trader seeking to optimize your strategies or a novice looking to learn the ropes, CashNow FX is here to support you on your trading journey. 
            Partner with us today and gain access to a wealth of resources, expert guidance, and the opportunity to achieve your financial aspirations.</p>
            <button id="aboutSignup">Get started</button>
        </div>
    )
    
}