// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, signOut} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhTUvYBGvpw3CBvlK0xCLyhZiFUQP4xVE",
  authDomain: "project-fiv.firebaseapp.com",
  projectId: "project-fiv",
  storageBucket: "project-fiv.firebasestorage.app",
  messagingSenderId: "768833233493",
  appId: "1:768833233493:web:66f5afa9168d37ec706adc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth= getAuth(app);
export const db = getFirestore(app);


export function onAuthChange(callback){
  return onAuthStateChanged(auth,callback);
}

export async function signUpUser(email,password){
  try{

    //Creates Auth acc
    const userA = await createUserWithEmailAndPassword(auth,email,password);
    const userB = userA.user;

  } catch(error){
    throw error;
  }
  return(success)
}


export async function loginUser(email,password){
  try{
    const userCred = await signInWithEmailAndPassword(auth,email,password);
    return{success:true,user: userCred}
  }  catch (error){
    return{success:false,error: error.message}
  }
}