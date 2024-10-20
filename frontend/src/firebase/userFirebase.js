import { collection } from "firebase/firestore";
import { auth, userColection } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc, getDocs, query, where, orderBy, limit, deleteDoc} from "firebase/firestore";

// get user data
export const getCurrentUserData = async (em)=>{
    try{
      const docRef =  doc(userColection, em);
      const docSnap = await getDoc(docRef)
      if(!docSnap.exists){
        return null
      }
      return {
        name: docSnap.data().Name,
        balance: docSnap.data().Balance,
      }
  
    }catch(error){
      console.error("Error fetching data",error)
      throw error
    }
  }
  
  // add transcation
  export const addTransaction = async (em, type, amount, method, message) =>{
    try{
      const currentDate = new Date().getTime()
      const collectionRef = collection(userColection, em, "Transactions")
      const docRef =  doc(collectionRef)
      await setDoc(docRef,{Type: type, Amount: amount, Method: method, Message: message, Date: currentDate, Status: "pending"})
      return true
    }catch(err){
      console.error("An error occurred while Adding transaction: ",err)
      throw err
    }
  }

  // get pending transactions
  export const getUserPending = async(em)=>{
    try{
    const transRef = collection(userColection, em, "Transactions")
    const transQuery = query(transRef, where("Status", "==" ,"pending"), orderBy("Date","desc"))
    const transSnapShot = await getDocs(transQuery)
    const transactions = [];
    await Promise.all(
      transSnapShot.docs.map(doc=>{
        const docData = doc.data();
        const Amount = docData.Amount;
        const Type = docData.Type;
        const Date = docData.Date;

        transactions.push({
          id: doc.id,
          Type: Type,
          Amount: Amount,
          Date: Date,
        })
      })
    )
    return transactions
    }catch(err){
      console.error("Error fetching pending transaction: ",err)
      throw err
    }
  }

  // delete pending transactions
  export const  deleteUserPending  = (em, id)=>{
    try{
      const usePendingRef = doc(userColection, em, "Transactions", id)
      deleteDoc(usePendingRef)
      return true
    }catch(err){
      console.error("Error deleting Pending Transaction:",err)
      throw err
    }
  }

  //get success transactions
  export const getUserTrans = async (em)=>{
    try{
      const transRef = collection(userColection, em, "Transactions");
      const transQuery = query(transRef, where("Status", "==" ,"Success"), orderBy("Date","desc"), limit(5));
      const transSnapShot = await getDocs(transQuery)
      const transactions = [];
      await Promise.all(
        transSnapShot.docs.map(doc=>{
          const docData = doc.data();
          const Amount = docData.Amount;
          const Date = docData.Date;
          const Type = docData.Type;

          transactions.push({
            id: doc.id,
            Amount: Amount,
            Date: Date,
            Type: Type,
          })
        })
      )
      return transactions
      }catch(err){
        console.error("Error fetching pending transaction: ",err)
        throw err
      }
  }

  //delete account
  export const deleteUserAccount = async (em)=>{
    try{
      const userDocRef = doc(userColection, em)
      await deleteDoc(userDocRef)
      const user = auth.currentUser
      user.delete()
      return true
    }catch(err){
      console.error("Error deleting Account:",err)
      throw err
    }
  }

  //passwordReset
  export const resetPassword = async(em)=>{
    try{
      await sendPasswordResetEmail(auth, em);
      return true;
    }catch(err){
      console.error("An error has occurred: ", err)
      throw err
    }
  }
  