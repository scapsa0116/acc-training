'use client'
import {useState, useEffect} from 'react';

import fire from '../fire';
import {Login} from './Login';
import {Hero} from './Hero';
import './App.css'

function Register() {

const [user, setUser] = useState('')
const [password, setPassword] = useState('')
const [passwordError, setPasswordError] = useState('')
const [emailError, setEmailError] = useState('')
const [hasAccount, setHasAccount] = useState('')
const [email, setEmail] = useState('')


const clearInputs = () => {
    setEmail("")
    setPassword("")
}
// console.log(fire)

const clearErrors = () => {

    setEmailError("")
    setPasswordError("")
}


const handleLogin = () => {
    clearErrors();
    fire
    .auth()
    .signInWithEmailAndPassword(email,password)
    .catch(err => {
        switch(err.code) {
            case "auth/invalid-email":
            case "auth/user-disabeled":
            case "auth/user-not-found":
            setEmailError(err.message);
            break;
            case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        
        
        }
    })}

    const handleSignup = () => {

        clearErrors();
        fire
        .auth()
        .createUSerWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code) {
                case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
            }
        })}

const handleLogout = () => {
    fire.auth().signOut();
}

// const authListener = () => {
//     fire
//     .auth().onAuthStateChanged((user) => {
//     if (user) {
//     clearInputs();
//     setUser(user);
//     } else {
//     setUser("")
//     }
//     })
//     }

//     useEffect(() => {
//         authListener();
//      }, [])

     return(
        <div className = "App">        
        <div className = "login">        
        <div className = "container">
            {user ? (
                <Hero handleLogout = {handleLogout}/> 
            ) : (
                <Login
                email={email}
setEmail={setEmail}
password={password}
setPassword={setPassword}
handleLogin={handleLogin}
handleSignup={handleSignup}
hasAccount={hasAccount}
setHasAccount={setHasAccount}
emailError={emailError}
passwordError={passwordError}


                />

            )}


        </div>
        </div>
        </div>

     )



}
export default Register
