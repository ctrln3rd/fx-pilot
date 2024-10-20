import React, { useEffect, useState } from "react";
import './Profile.css';
import { addTransaction } from "../firebase/userFirebase";
import { logout } from "../firebase/firebase";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import { getUserPending, getUserTrans, deleteUserPending } from "../firebase/userFirebase";
import { setResponse,setResponseStatus } from "../redux/actions";
import axios from "axios";
import Chart from "./Charts";


function Profile({user}){
    const dispatch = useDispatch();
    const currentuser = useSelector(state=> state.currentuser.value)
    const currentuserdata = useSelector(state=>state.currentuserdata.value)
    const navigate = useNavigate()
     
    const [currentRate, setCurrenTRate]= useState(null)
    const [isChart, setChart] = useState(false)

    useEffect(()=>{
        const fetchCurrentRate = async ()=>{
            try{
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/markets",{
                        params: {
                            ids: 'bitcoin',
                            vs_currency: 'usd'
                        }
                    })
                    setCurrenTRate(response.data[0])
            }catch(err){
                console.error("Error fetching data",err)
            }
        }
        
        fetchCurrentRate()
    },[])
    
    const handleCharts = ()=>{
        if(isChart){
            setChart(false)
        }else{
            setChart(true)
        }
    }

    const handleLogout = async()=>{
        try{
            dispatch(setResponse(true))
            dispatch(setResponseStatus("trying to log you out"))
            await logout(user)
            dispatch(setResponseStatus("logout success"))
            setTimeout(()=>{window.location.reload()},2000)
            navigate("/")
        }catch(err){
            console.error("An error has occurred: ",err)
            dispatch(setResponseStatus("error loging out check internet"))
        }finally{
            setTimeout(()=>{
                dispatch(setResponse(false))
            },2000)
        }
    }

    return(
    <div className="profileCont">
        <h3>Welcome back: {currentuserdata && <span>{currentuserdata.name}</span>}</h3>
        <h3> Account Balance: {currentuserdata && <span>{currentuserdata.balance}USD </span>}{currentRate &&currentuserdata ? <span>{`(${(currentuserdata.balance/currentRate.current_price).toFixed(4)}BTC)`}</span>: ''}
       </h3>
        <div className="accountManage">
            <Link id="accountLink" to="/profile/deposit"> Deposit</Link>
            <Link id="accountLink" to="/profile/withdraw">Withdraw</Link>
            <Link id="accountLink" to="/profile/transactions">Manage investments</Link>
        </div>
        <div className="exchangeCont">
            <h3>Exchange Rates today</h3>
            <p>Current Rate: BTC = {currentRate && <span>${parseFloat(currentRate.current_price).toFixed(4)}</span> } 
            {currentRate && <span style={{backgroundColor: currentRate.price_change_24h < 0 ? 'rgba(224, 6, 6, 0.25)': 'rgba(6, 224, 35, 0.25)', color: '#222222'}}> {currentRate.price_change_24h > 0 && '+'}{parseFloat(currentRate.price_change_24h).toFixed(4)}</span>}</p>
            {!isChart &&<button onClick={handleCharts} id="controlCharts">see trends</button>}
            {isChart &&<Chart/>}
            {isChart &&<button onClick={handleCharts} id="controlCharts">close trends</button>}
        </div>
        <div className="profileOut">
            <button onClick={handleLogout}><img src={`${process.env.PUBLIC_URL}/images/logout.png`}/>logout</button>
            <button> <img src={`${process.env.PUBLIC_URL}/images/delete.png`}/>Delete account</button>
        </div>
    </div>
    )
}



function Mytransactions(){
    const dispatch = useDispatch();
    const currentuser = useSelector(state=>state.currentuser.value)
    const[myPending, setMyPending] = useState([])
    const[mySuccess, setMySuccess] = useState([])
    useEffect(()=>{
      const fetchTrans = async()=>{
        try{
            dispatch(setResponse(true))
            dispatch(setResponseStatus("fetching transactions"))
        const myPendings = await getUserPending(currentuser)
        const mySuccesses = await getUserTrans(currentuser)
        dispatch(setResponseStatus("transactions fetched successfully"))
        setMyPending(myPendings)
        setMySuccess(mySuccesses)
        console.log(mySuccesses)
        }catch(err){
            console.error("Error fetching transactions:",err)
            dispatch(setResponseStatus("An error while fetching"))

        }finally{
            setTimeout(()=>{dispatch(setResponse(false))},2000)
        }
      }
      fetchTrans()
    },[])
    const formatDate =(timestamp)=>{
        const date = new Date(timestamp);
        let day = date.getDate();
        let month= date.getMonth() + 1;
        const year = date.getFullYear();

        if(day<10){
            day = '0'+day;
        }
        if(month <10){
            month ='0' + month;
        }
        return day+'/'+month+'/'+year;
    }
    const deletePending = (id)=>{
        try{
            dispatch(setResponse(true))
            dispatch(setResponseStatus("deleting transaction"))
           const response = deleteUserPending(currentuser,id)
           dispatch(setResponseStatus("transaction deleted"))
           return response;
        }catch(err){
            console.error("An error deleting pending",err)
            dispatch(setResponseStatus("error deleting"))
        }finally{
            setTimeout(()=>{dispatch(setResponse(false))},2000)
        }
    }
    return(
        <div className="transactionsCont">
            <div className="myPendingCont">
            <h2>my pending transactions</h2>
            {(myPending.length>0) ? <ul className="myPendingList" >
               {myPending.map(trans =>(
                <li id="userpendingTrans" key={trans.id}>
                    <strong>Type:</strong>{trans.Type}, <strong>Date:</strong>{formatDate(trans.Date)}, <strong>Amount:</strong>{trans.Amount}usd <br/>
                    <button onClick={()=>deletePending(trans.id)}>Abort</button>
                </li>))}</ul> : <h4>No pending transaction</h4>}
            </div>
            <div className="mySuccessCont">
            <h2>successful transactions</h2>
            {(mySuccess.length>0) ? <ul className="mySuccessList">
                {mySuccess.map(trans=>(
                    <li>
                        <strong>Type:</strong>{trans.Type}, <strong>Date: </strong>{formatDate(trans.Date)}, <strong>Amount:</strong>{trans.Amount}usd<br/>
                        <button>download invoice</button>
                    </li>
                ))}
            </ul>:<h4>No successful transaction</h4>}
            </div>
            
        </div>
    )
}

function Deposit(){
    const dispatch = useDispatch();
    const currentuser = useSelector(state=>state.currentuser.value)
    const navigate = useNavigate()
    const[depositData, setDepositData]= useState({
        Type:"Deposit",
        Amount:300,
        Method:"lipa na mpesa",
        Message:"none",
    })
    const handleChange = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        setDepositData({...depositData, [name]: value})
    }
    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        try{
            dispatch(setResponse(true))
            dispatch(setResponseStatus("Adding transaction"))
            await addTransaction(currentuser, depositData.Type, depositData.Amount, depositData.Method, depositData.Message)
            dispatch(setResponseStatus("successfully Added"))
            setTimeout(()=>{navigate("/profile/transactions")},2000)
        }catch(error){
            console.error("Error adding transaction: ",error)
            dispatch(setResponseStatus("Error adding transaction"))
        }finally{
            setTimeout(()=>{dispatch(setResponse(false))},2000)
        }

    }
    return(
        <div className="depositCont">
            <h2>Deposit money to your account</h2>
            <ul className="depositMethods">
                <li><img src={`${process.env.PUBLIC_URL}/images/mpesa.png`}/><h4>Lipa na Mpesa:</h4><br/><p><span>paybill:</span>247247,<br/><span>Account number: </span>0111343665</p></li>
                <li><img src={`${process.env.PUBLIC_URL}/images/paypal.png`}/><h4>Paypal: </h4><br/><p>markaustine001@gmail.com</p></li>
            </ul>
            <form className="depositForm" onSubmit={handleFormSubmit}>
                <label>{'Amount(300usd+):'}</label>
                <input type="number" min={300} placeholder="amount 300usd+" name="Amount" value={depositData.Amount} onChange={handleChange} required/>
                <label>Method: </label>
                <select value={depositData.Method} onChange={handleChange} name="Method" required>
                    <option value={" lipa na mpesa"}>lipa na mpesa</option>
                    <option value={"paypal"}>paypal</option>
                    <option value={"mastercard"}>mastercard</option>
                    <option value={"visa"}>visa</option>
                </select>
                <label>{'Transaction message or code(optional):'}</label>
                <textarea value={depositData.Message} onChange={handleChange} name="Message" placeholder="copy message or code here (optional)"></textarea>
                 <input type="submit" value="submit for processing"/>
            </form>
        </div>
    )
}


function Withdraw(){
    const dispatch = useDispatch();
    const currentuser = useSelector(state=>state.currentuser.value)
    const currentuserdata = useSelector(state=>state.currentuserdata)
    const navigate = useNavigate()
    const [withdrawData, setWithdrawData] = useState({
        Type:"Withdraw",
        Amount: 50,
        Method:"mpesa",
        Message:"",
    })
    const handleChange = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        setWithdrawData({...withdrawData, [name]: value})
    }
    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        try{
            dispatch(setResponse(true))
            if(Number(currentuserdata.Balance) < 355 || (Number(currentuserdata.Balance)-355) < Number(withdrawData.Amount)){
                dispatch(setResponseStatus("Not enough money in the account"))
                return false
            }
            await addTransaction(currentuser, withdrawData.Type, withdrawData.Amount, withdrawData.Method, withdrawData.Message)
            dispatch(setResponseStatus("transaction added successfully"))
            setTimeout(()=>{navigate("/profile/transactions")},2000)
        }catch(error){
            console.error("Error adding transaction: ",error)
            dispatch(setResponseStatus("Error adding transaction"))
        }finally{
            setTimeout(()=>{dispatch(setResponse(false))},2000)
        }


    }
    return(
        <div className="withdrawCont">
            <h2>Withdraw money from the account</h2>
            <form className="withdrawForm" onSubmit={handleFormSubmit}>
                <label>{'Amount (20usd+):'}</label>
                <input type="number" value={withdrawData.Amount} min={20} max={100} name="Amount" onChange={handleChange} required/>
                <label>Method: </label>
                <select value={withdrawData.Method} name="Method" onChange={handleChange} required>
                    <option value={"mpesa"}>mpesa</option>
                    <option value={"paypal"}>payPal</option>
                    <option value={"visa"}>Visa</option>
                    <option value={"masterCard"}>masterCard</option>
                </select>
                <label>{'Additional Details:'}</label>
                <textarea value={withdrawData.Message} name="Message" onChange={handleChange} placeholder="e.g phone number for mpesa" required></textarea>
                <input type="submit" value={"submit for processing"}/>
            </form>
        </div>
    )
}

export {Profile, Mytransactions, Deposit, Withdraw}


