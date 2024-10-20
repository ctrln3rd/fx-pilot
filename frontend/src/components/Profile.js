import React, { useEffect, useState } from "react";
import './Profile.css';
import { logout } from "../firebase/firebase";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, Link} from "react-router-dom";
import { getUserPending, getUserTrans, deleteUserPending } from "../firebase/userFirebase";
import { setResponse } from "../redux/actions";
import axios from "axios";
import Chart from "./Charts";


function Profile(){
    const dispatch = useDispatch();
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
            dispatch(setResponse("trying to log you out"))
            await logout()
            dispatch(setResponse("logout success"))
            setTimeout(()=>{window.location.reload()},2000)
            navigate("/")
        }catch(err){
            console.error("An error has occurred: ",err)
            dispatch(setResponse("error loging out check internet"))
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
       <p className="profileverify"><span>&#9888;</span> account not verified you won't be able to deposit, withdaw or edit profile until verification</p>
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
            <button onClick={handleLogout}><img src={`${process.env.PUBLIC_URL}/images/logout.png`} alt="pic"/>logout</button>
            <button> <img src={`${process.env.PUBLIC_URL}/images/delete.png`} alt="pic"/>Delete account</button>
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
            dispatch(setResponse("fetching transactions"))
        const myPendings = await getUserPending(currentuser)
        const mySuccesses = await getUserTrans(currentuser)
        dispatch(setResponse("transactions fetched successfully"))
        setMyPending(myPendings)
        setMySuccess(mySuccesses)
        console.log(mySuccesses)
        }catch(err){
            console.error("Error fetching transactions:",err)
            dispatch(setResponse("An error while fetching"))

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
            dispatch(setResponse("deleting transaction"))
           const response = deleteUserPending(currentuser,id)
           dispatch(setResponse("transaction deleted"))
           return response;
        }catch(err){
            console.error("An error deleting pending",err)
            dispatch(setResponse("error deleting"))
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
    return(
        <div className="depositCont">
            <h2>Deposit money to your account</h2>
            <p>this feature is coming soon</p>
        </div>
    )
}


function Withdraw(){
    return(
        <div className="withdrawCont">
            <h2>Withdraw money from the account</h2>
            <p>this faeture is coming soon</p>
        </div>
    )
}

export {Profile, Mytransactions, Deposit, Withdraw}


