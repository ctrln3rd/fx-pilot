import React from "react";
import './Contact.css';

export default function Contact(){
    return(
        <div className="contactCont">
            <h2>Contact customer care</h2>
            <p>For any inquiry, complaint and problem contact us through the email or the number provided</p>
            <img src={`${process.env.PUBLIC_URL}/images/fximage5.jpg`} alt="img"/>
            <p><span>Email: </span>info@cashnowinvest.com</p>
            <p><span>Number: </span>info@cashnowinvest.com</p>
             <form className="contactForm">
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="email address"/>
                <textarea placeholder="message"></textarea>
                <input type="submit" value={"send"}/>
             </form>
        </div>
    )
}