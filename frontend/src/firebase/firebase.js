// firebase.js
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth"
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db =getFirestore(app);
const userColection = collection(db, "Users")

// Sign up user and save user data to Firestore
export const signup = async (email, password, name, phone) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Save user data to Firestore with email as document ID
      const userDocRef = doc(userColection, email);
       

    try {
        await setDoc(userDocRef, {
            Name: name,
            Email: email,
            Phone: phone,
            Balance: 10000,
            currency: 'usdt'
        });
        console.log("User data successfully saved!");
    } catch (error) {
        console.error("Error saving user data:", error);
    }
      await sendEmailVerification(user)
      return true;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };
  

//send verification email

export const sendVer = async ()=>{
  try{
     await sendEmailVerification(auth.currentUser)
     return true
  }catch(err){
    console.error('An error occurred:', err)
    throw err
  }
}

// Sign in user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Sign out user
export const logout = async () => {
  try {
      await auth.signOut()
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Auth state listener to track current user


export {auth, userColection, db};
