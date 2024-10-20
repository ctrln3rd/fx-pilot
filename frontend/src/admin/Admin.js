import React,{useEffect, useState} from "react";
import './Admin.css'
import { findUserWithEmail, findUserWithName, updateUser, getPendingUsers, acceptPending } from "../firebase/adminFirebase";
import { useDispatch } from "react-redux";
import { setResponse,setResponseStatus } from "../redux/actions";
import { Link } from "react-router-dom";

export function AdminDash(){
    const dispatch = useDispatch();
    const [foundName, setFoundName] = useState(false)
    const [foundEmail, setFoundEmail] = useState(false)
    const [searchData, setSearchData] = useState("")
    const [searchData1, setSearchData1] = useState("")
    const [selectedUser, setSelectedUser ] = useState(false)
    const [updateData, setUpdateData] = useState(false)
    const [isUpdateForm ,setUpdateForm] = useState(false)

    const handleChange = (e) => setSearchData(e.target.value);
    const handleChange1= (e) => setSearchData1(e.target.value);
    const handleUpdateChange =  (e) => setUpdateData(e.target.value);
    const findUserName = async(e)=>{
        e.preventDefault()
        try{
            setFoundName(false)
            dispatch(setResponse(true))
            dispatch(setResponseStatus("finding"))
            const res = await findUserWithName(searchData1.toLocaleLowerCase())
            if(res.length > 0){
                dispatch(setResponseStatus("Users found"))
                setFoundName(res)
            }else{
                dispatch(setResponseStatus("Users not found"))
            }
        }catch(err){
            console.error("An error finding user:",err)
            dispatch(setResponseStatus("Error fetching users"))
        }finally{
            setTimeout(()=>{
                dispatch(setResponse(false))
            },2000)
        }
    }
    const findUserEmail = async(e)=>{
        e.preventDefault()
        try{
            dispatch(setResponse(true))
            dispatch(setResponseStatus("looking"))
            const res = await findUserWithEmail(searchData)
            dispatch(setResponseStatus("User found"))
            setFoundEmail(res)
        }catch(err){
            console.error("An error finding user:",err)
            dispatch(setResponseStatus("Error finding user"))
        }finally{
            setTimeout(()=>{
                dispatch(setResponse(false))
            },2000)
        }
    }
    const handleOpenForm = (id)=>{
        setUpdateForm(true)
        setSelectedUser(id)
    }
    const updatetheuser = async(e)=>{
        e.preventDefault()
        try{
            setUpdateForm(false)
            dispatch(setResponse(true))
            dispatch(setResponseStatus("updating"))
            const res = await updateUser(selectedUser, parseInt(updateData))
            if(res){
                dispatch(setResponseStatus("user data updated"))
                setSelectedUser(false)
            }
        }catch(err){
            console.error("An error finding user:",err)
            dispatch(setResponseStatus("Error updating user data"))
        }finally{
            setTimeout(()=>{
                dispatch(setResponse(false))
            },2000)
        }
    }
    return(
        <div className="adminDashCont">
            <h2>Welcome cashnowfx admin</h2>
            <form className="findUserEmail" onSubmit={findUserEmail}>
                <input type="text" value={searchData}  onChange={handleChange} placeholder="search user by email" required/>
                <input type="submit" value="search"/>
            </form>
            <form className="findUserName" onSubmit={findUserName}>
                <input type="text" value={searchData1}  onChange={handleChange1} placeholder="search user by text" required/>
                <input type="submit" value="search"/>
            </form>
            {foundName &&<ul className="userNameList">
                {foundName.map(doc=>(
                    <li key={doc.id}>
                        <strong>Email/ID: </strong>{doc.email}, <strong>Name: </strong>{doc.name}, <strong>Balance: </strong>{doc.balance}<br/><br/>
                        <button onClick={ ()=>handleOpenForm(doc.id)}>Update balance</button>
                    </li>
                ))}
            </ul>}
            {foundEmail && <div className="userEmail">
                <p><strong>Email/ID: </strong>{foundEmail.email}, <strong>Name: </strong>{foundEmail.name}, <strong>Balance: </strong>{foundEmail.balance}<br/></p>
                    <button onClick={()=>handleOpenForm(foundEmail.id)}>Update balance</button>
            </div>}
            {isUpdateForm && <form className="updateBalance" onSubmit={updatetheuser}>
                <input type="number" value={updateData} onChange={handleUpdateChange} placeholder="Enter number" required/>
                <input type="submit" value="submit"/>
            </form>}
            <Link to="/admin/pending" id="adminPendingLink">Accept pendings</Link>
        </div>
    )
}


export function Pendings(){
    const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    useEffect(()=>{
        const fetchpending = async()=>{
        try{
            dispatch(setResponse(true))
            dispatch(setResponseStatus("Fetching users"))
            const res = await getPendingUsers()
            dispatch(setResponseStatus("Fetching users successfull"))
            console.log(res)
            setUsers(res)
        }catch(err){
            console.log("An error fetching pending users:",err)
            dispatch(setResponseStatus("Error Fetching users"))
        }
        finally{
            setTimeout(()=>{
                dispatch(setResponse(false))
            },2000)
        }}
        fetchpending()
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
    const accept = async(em, id, Type, Amount)=>{
        try{
            dispatch(setResponse(true))
            dispatch(setResponseStatus("updating"))
            const res = await acceptPending(em, id,Type,Amount)
            if(res){
                dispatch(setResponseStatus("accept successful"))
            }
        }catch(err){
            console.error("An error updating users: ",err)
            dispatch(setResponseStatus("An error occurred"))
        }finally{
            setTimeout(()=>{dispatch(setResponse(false))},2000)
        }
    }
    return(
        <div className="pendingCont">
            <h2>Pending users</h2>
            <ul className="pendingList">
                {users.map(doc=>(
                    <li key={doc.id}>
                        <strong>Email/ID: </strong>{doc.sender}, <strong>Type: </strong>{doc.type}, <strong>Amount: </strong>{doc.amount},<strong>Date: </strong>{formatDate(doc.date)}<br/>
                        <button onClick={()=>accept(doc.sender, doc.id, doc.type, doc.amount)}>Accept</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}