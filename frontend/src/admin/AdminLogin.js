import React,{useState} from "react";
import './AdminLogin.css'
import { login } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setResponse } from "../redux/actions";

export default function AdminLogin (){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:"",
        password: "",
    });
    const handleChange = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        setFormData({...formData, [name]: value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            dispatch(setResponse("trying to log in"))
            const response = await login(formData.email, formData.password);
            if(response){
                dispatch(setResponse("login successful"))
                setTimeout(()=>{
                    navigate("/admin/dashboard")
                },2000)
            }
        }catch(err){
            console.log("An error has occurred:",err)
            dispatch(setResponse("login error"))

        }finally{
            setTimeout(()=>{
                dispatch(setResponse(false))
            }, 2000)
        }
    }
    return(
        <div className="adminLoginCont">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="adminLoginForm">
                <input type="text"  name="email" value={formData.email} placeholder="email" onChange={handleChange} required/>
                <input type="password" name="password" value={formData.password} placeholder="password" onChange={handleChange} required/>
                <input type="submit" value="login"/>
            </form>
        </div>
    )

}
