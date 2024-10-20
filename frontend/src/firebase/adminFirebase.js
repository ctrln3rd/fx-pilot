import { userColection } from "./firebase";
import {collection, doc,getDocs, query, updateDoc, where,collectionGroup, getDoc, limit } from "firebase/firestore";
import { db } from "./firebase";

/*export const getAllUsers = async()=>{
    try{
        const userSnapShot = await getDocs(userColection);
        const users= [];
        await Promise.all(
            userSnapShot.docs.map(doc=>{
                const docData = doc.data();
                const name = docData.Name;
                const balance = docData.Balance;

                users.push({
                    id:doc.id,
                    name: name,
                    balance: balance,
                })
            })
        )
        return users;
    }catch(err){
        console.log("Error fetching users data:", err)
    }
}*/

export const findUserWithName = async(name)=>{
    try{
        const usersQuery = query(userColection, where("Name","==",name),limit(5))
        const userSnapShot = await getDocs(usersQuery)
        const users = [];
        await Promise.all(
            userSnapShot.docs.map(doc=>{
                const docData = doc.data();
                const name = docData.Name;
                const balance = docData.Balance;
                users.push({
                    id: doc.id,
                    email: doc.id,
                    name: name,
                    balance:balance
                })
            })
        )
        return users
    }catch(err){
        console.error("An error finding user: ",err)
        throw err
    }
        
}

export const findUserWithEmail = async(em)=>{
    try{
        const userRef = doc(userColection,em)
        const userSnapShot = await getDoc(userRef)
        let res = {}

        const docData = userSnapShot.data();
        const name = docData.Name;
        const balance = docData.Balance;
        res ={
            id: userSnapShot.id,
            email: userSnapShot.id,
            name: name,
            balance:balance
        }
        return res
    }catch(err){
        console.error("An error while getting user",err)
        throw err
    }
}

export const updateUser = async(em, balance)=>{
    try{
        const docRef = doc(userColection, em)
        await updateDoc(docRef,{
            Balance: balance
        })
        return true;
    }catch(err){
        console.error("An error has occurred: ",err)
    }
}

export const getPendingUsers = async()=>{
    try{
        const transRef = collectionGroup(db,"Transactions")        
        const transQuery = query(transRef, where('Status','==' ,'pending'))
        const transSnapShot = await getDocs(transQuery)
        const transactions = []
        await Promise.all(
            transSnapShot.docs.map(doc=>{
                const docData = doc.data()
                const email = doc.ref.parent.parent.id
                const Amount = docData.Amount;
                const Type = docData.Type;
                const Date = docData.Date;

                transactions.push({
                    id: doc.id,
                    sender: email,
                    amount:Amount,
                    type: Type,
                    date: Date
                })
                
            })
        )
    return transactions;
    }catch(err){
        console.log("An error updating users:",err)
        throw err
    }
}

export const acceptPending = async(em, id,Type,Amount) =>{
    try{
    const userRef = doc(userColection,em)
    const transCol = collection(userColection,em,"Transactions");
    const transRef = doc(transCol,id)
    const balance = (await getDoc(userRef)).data().Balance;
    let newbalance = 0
    if(Type === "Deposit"){
        newbalance = balance + Amount
    }else if(Type === "Withdraw"){
        newbalance = balance - Amount
    }
    await updateDoc(userRef,{
      Balance : newbalance
    })
    await updateDoc(transRef, {
        Status: "Success"
    })
    }catch(err){
        console.error("Error upadating user info")
        throw err
    }

}