import React, { useState } from "react";
import './Auth.css'
import { useDispatch } from "react-redux";
import { setResponse } from "../redux/actions";
import { login, signup } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../firebase/userFirebase";


function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [isResetForm, setResetForm] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleResetChange = (e) => setResetEmail(e.target.value);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        dispatch(setResponse("trying tolog you in"))
        await login(email, password);
        // Login successfull
        dispatch(setResponse("login successfull"))
        setTimeout(()=>{
            navigate("/profile")
        },2000)
        } catch (error) {
        // Handle login error
        dispatch(setResponse("error check inputs/internet"))
        console.error('Error logging in:', error.message);
        }finally{
            setTimeout(() => {
                dispatch(setResponse(false))
            }, 2000);
        }
    };

    const resetPass = async (e)=>{
        e.preventDefault();
        try{
            setResetForm(false)
            dispatch(setResponse("sending request"))
            await resetPassword(resetEmail);
            dispatch(setResponse("success check your email to reset"))
        }catch (error) {
            // Handle login error
            dispatch(setResponse("A error has occurred"))
            console.error('Error sending reuest:', error);
        }finally{
            setTimeout(() => {
                dispatch(setResponse(false))
            }, 2000);
        }
    }

    return(
        <div className="loginCont">
            <h2>Login to continue</h2>
            <Link id="loginSignupCheck" to="/signup">Don't have an account yet? <span>Register</span></Link>
           {!isResetForm && <form className="loginForm" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="email" value={email} onChange={handleEmailChange} required/>
                <input type="password" name="password" placeholder="password" value={password} onChange={handlePasswordChange} required/>
                <p onClick={()=> setResetForm(true)}>forgot password</p>
                <input type="submit" value="login"/>
            </form>}
            {isResetForm && <form className="forgotPassword" onSubmit={resetPass}>
                <h3>Reset password <span onClick={()=>setResetForm(false)}>cancel</span></h3>
                <input type="email" placeholder="your email" value={resetEmail} onChange={handleResetChange} required/>
                <input type="submit" value="request reset email"/>
            </form>}

        </div>
    )
}


function Signup(){
    const dispatch = useDispatch();
    const [isconfirm, setconfirm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    if(password === confirmpassword){
        dispatch(setResponse("creating account"))
     const response = await signup(email, password, name, phone);
    if(response){
        setconfirm(true)
    }
    dispatch(setResponse("account created"))
    }else{
        dispatch(setResponse("passwords doesn't match"))
    }
    } catch (error) {
    // Handle signup error
    dispatch(setResponse("an error maybe the email already exist"))
    console.error('Error signing up:', error.message);
    }
    finally{
        setTimeout(() => {
            dispatch(setResponse(false))
        }, 2000);
    }
     
    };
    
    return(
        <div className="signupCont">
            <h2><span>create An account </span><br/> Let's get to know you</h2>
            <Link id="signupLoginCheck" to="/login">Already have an account? <span>login</span></Link>
            {!isconfirm && <form className="signupForm" onSubmit={handleSubmit}>
                <input type="text" name="fullname" placeholder="fullname" value={name} onChange={handleNameChange} required/>
                <input type="text" placeholder=" phone number eg. +254 70000000" value={phone} onChange={handlePhoneChange} required/>
                <input type="email" name="email" placeholder=" Email eg. example@example.com" onChange={handleEmailChange} value={email} required/>
                <input type="password" name="password" placeholder="password" value={password} onChange={handlePasswordChange} required/>
                <input type="password" name="confirmpassword" placeholder="confirm password" value={confirmpassword} onChange={handleConfirmPasswordChange} required/>
                <input type="submit" value="register"/>
            </form>}

            {isconfirm && <div className="confirm-email">
                <h3>confirm email</h3>
                <p>confirmation email sent to your email address </p>
                 <Link className="confirmedtoprofile" onClick={()=>{setconfirm(false)}} >Confirmed? view profile{'>>>'}</Link>
            </div>}

        </div>
    )
}

export {Login, Signup}