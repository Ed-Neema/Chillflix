import { createContext, useContext, useEffect, useState } from "react";
import {auth, db} from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
const AuthContext = createContext();

// define the functions that need to be available
export function AuthContextProvider({children}){
    const [user, setUser] = useState({})
    function signUp(email, password){
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db,'users', email),{
            // whenever a user signs in, create users file, store their email and instanciate their movies array
            savedShows: []

        })
    }

    function logOut(){
        return signOut(auth);
    }

    function logIn(email,password){
        return signInWithEmailAndPassword(auth, email, password);
    }
// called when the authentication state changes, eg, when a user is logged in or logs out
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    },[])

    return(
        <AuthContext.Provider value={{signUp, logIn, logOut,user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}