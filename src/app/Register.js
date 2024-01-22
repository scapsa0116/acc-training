import fire from 'f../fire';
import {Login} from './Login';
import {Hero} from './Hero';
import '../App.css'

function Register() {

const [user, setUser] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [passwordError, setPasswordError] = useState('')
const [emailError, setEmailError] = useState('')
const [hasAccount, setHasAccount] = useState('')


const clearImputs = () => {
    setEmail("")
    setPassword("")
}


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

const authListner = () => {
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
            clearImputs();
            setUser(user);

        } else {
            setUser("")
        }
    })}

    useEffect(() => {
        authListner();
     }, [])

     return(
        <div className = "App">        
        <div className = "login">        
        <div className = "container">
            {user ? (
                <Hero handleLogout = {handleLogout}/> 
            ) : (
                <Login
                email = {email}
                setEmail = {setEmail}
                passwword = {password}
                setPassword = {setPassword}
                handleLogin = {handleLogin}
                

                />

            )}


        </div>
        </div>
        </div>

     )



}