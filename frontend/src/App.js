import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { Top, Footer } from './components/Tools';
import Education from './components/Education';
import { Signup, Login } from './components/Auth';
import Invest from './components/Invest';
import { Profile, Mytransactions, Deposit, Withdraw} from './components/Profile';
import { auth } from './firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setCurrentUserData } from './redux/actions';
import { onAuthStateChanged } from 'firebase/auth';
import { getCurrentUserData } from './firebase/userFirebase';
import AdminLogin from './admin/AdminLogin';
import { AdminDash, Pendings } from './admin/Admin';


function App() {
  const dispatch = useDispatch()
  const isresponse = useSelector(state=>state.response.value);
  const [checking, setchecking] = useState(false)
  useEffect(()=>{
    setchecking(true)
     onAuthStateChanged(auth, (user)=>{
      if(user){
        dispatch(setCurrentUser(user.email))
        setchecking(false)
        try{
          const fetchUserData = async()=>{
            const myData = await getCurrentUserData(user.email)
            dispatch(setCurrentUserData(myData))
          }
          fetchUserData()
        }catch(err){
          console.error("Error fetching user data: ",err)
        }
      }else{
        setchecking(false)
      }
     })
  },[])
  const currentuser = useSelector(state=>state.currentuser.value)
  return (
    <Router>
      <Top />
      {isresponse &&<Response/>}
      <Routes>
        <>
        <Route path='/' exact Component={Home} />
        <Route path='/about' Component={About} />
        <Route path='/Contact' Component={Contact} />
        <Route path='/education' Component={Education} />
        <Route path='/plans' Component={Contact} />
        <Route path='/invest' Component={Invest} />
        <Route path='/login'Component={Login}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/profile' element={!currentuser ? <Navigate to="/login"/> : <Profile/> }/>
        <Route path='/profile/transactions' element={!currentuser ? <Navigate to="/login"/> : <Mytransactions/> } />
        <Route path='/profile/deposit' element={!currentuser ? <Navigate to="/login"/> : <Deposit /> } />
        <Route path='/profile/withdraw' element={!currentuser ? <Navigate to="/login"/> : <Withdraw /> } />
        <Route path='/admin/login' Component={AdminLogin} />
        <Route path="/admin/dashboard" element={<AdminProtected isadmin={currentuser} checking={checking}> <AdminDash/></AdminProtected>}/>
        <Route path="/admin/pending" element={!currentuser === "markaustine254@gmail.com" ? <Navigate to="/admin/login"/> :  <Pendings /> }/>
        <Route path='/*' element={<Navigate to='/'/>}/>
        </>
      </Routes>
      <Footer/>
    </Router>
  );
}


function Response(){
  const resStatus = useSelector(state=>state.responsestatus.value)

  return(
      <div className='resCont'>
        {resStatus && <p>{resStatus}</p>}
      </div>
  )
}

function AdminProtected({isadmin, checking, children}){
  if(checking){
    return console.log('checking')
  }
  if(isadmin !== 'markaustine254@gmail.com'){
    return <Navigate to='/admin/login'/>
  }
  return children

}

export default App;
