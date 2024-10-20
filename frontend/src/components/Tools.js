import React, {useEffect, useState} from "react";
import './Tools.css'
import { Link } from "react-router-dom/dist";
import { useSelector } from "react-redux";

export  function Top(){
    const currentuser = useSelector(state=>state.currentuser.email)
    const [isMobile, setMobile ] = useState(false)
    const [isDropdown, setDropdown] = useState(false)
    useEffect(()=>{
        const handleMobile = ()=>{
            setMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize',handleMobile);
        handleMobile();
        return ()=>{
            window.removeEventListener('resize',handleMobile)
        }
    },[])

    const handleDropdown = ()=>{
        if(isDropdown){
            setDropdown(false)
        }else{
            setDropdown(true)
        }
    }
    return(
        <div className="topCont">
            <header className="myHeader">
                <h1 id="appTitle"><Link to="/" id="navbarLink">FX<sub>pilot</sub></Link></h1>
                {!currentuser && <div className="authLinks">
                    <Link id="authLink" to='/login'>login</Link>
                    <Link id="authLink" to='/signup'>open account</Link>
                </div>}
              
                {isMobile ?  <img  src={`${process.env.PUBLIC_URL}/images/menu.png`} id="menuBut" onClick={handleDropdown} alt="menu"/> : <nav className="navBar">
                    <ul className="navList">
                        <li><Link to="/about" id="navbarLink">About</Link></li>
                        <li><Link to="/contact" id="navbarLink">Contact Us</Link></li>
                        <li><Link to="/education" id="navbarLink">learn</Link></li>
                        <li><Link to="/invest" id="navbarLink">Invest</Link></li>
                        {currentuser && <li><Link to="/profile" id="navbarLink">Profile</Link></li>}
                        {currentuser=== 'markaustine254@gmail.com' && <li><Link to="/admin/dashboard" id="navbarLink">admin</Link></li>}
                    </ul>
                </nav>}
            </header>
           {isDropdown && <div className="dropdownCont">
                <img  src={`${process.env.PUBLIC_URL}/images/close.png`} onClick={handleDropdown} alt="X"/>
                <nav>
                <ul className="navList">
                        <li><Link to="/about" onClick={handleDropdown} id="dropdownLink">About</Link></li>
                        <li><Link to="/contact" onClick={handleDropdown} id="dropdownLink">Contact Us</Link></li>
                        <li><Link to="/education" onClick={handleDropdown} id="dropdownLink">learn</Link></li>
                        <li><Link to="/invest" onClick={handleDropdown} id="dropdownLink">Invest</Link></li>
                        {currentuser && <li><Link to="/profile" onClick={handleDropdown} id="dropdownLink">Profile</Link></li>}
                        {currentuser=== 'markaustine254@gmail.com' && <li><Link to="/admin/dashboard" onClick={handleDropdown} id="dropdownLink">admin</Link></li>}
                    </ul>
                </nav>
            </div>}
        </div>
    )
}

export function Footer(){
    return(
        <footer className="footerCont">
            <button id="scrolltop">back to top</button>
            <p id="footerPolicy">At fxpilot, we are committed to protecting your privacy and ensuring a secure and transparent trading experience. 
                    By using our platform, you agree to our Terms of Service, which govern your access to and use of fxpilot's services. <br/>
                    Our Privacy Policy outlines how we collect, use, and safeguard your personal information, ensuring its confidentiality and compliance with relevant data protection laws.
                    <br/> Additionally, our Cookie Policy explains how we use cookies and similar tracking technologies to enhance your browsing experience and personalize content. 
                    By continuing to use fxpilot, you consent to the terms outlined in our Terms of Service, Privacy Policy, and Cookie Policy.</p>
           <div className="policyLinks">
            <Link to="terms" id="policyLink">terms of service</Link>
            <Link to="terms" id="policyLink">privacy policy</Link>
            <Link to="terms" id="policyLink">cookie policy</Link>
           </div>
           <p id="copywrite"> 2024©fxpilot- created by austine mark</p>
        </footer>
    )
}