import { useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import { GoogleLogin } from 'react-google-login'
//import Swal from "sweetalert2"

const SignIn = (props) => {
    const [user, setUser] = useState({userMail: null, password: null})
    const [error, setError] = useState()

    const inputHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        logInUser(user)
    }

    const responseGoogle = (googleRegister) => {
        let googleLogin = {
            userMail: googleRegister.profileObj.email,
            password: googleRegister.profileObj.googleId,
            logGoogle: true
        }
        logInUser(googleLogin)
    }

    const logInUser = (logUser) => {
        props.logIn(logUser)
        .then(res => {
            if (res.data.success){
                //alert("Welcome back")
            } else {
                setError(res.data.response)
            }
        })
        .catch((error) => {
            if(error.message === "Network Error"){
                console.log("something is wrong on the route")
            } else {
                console.log(error.message)
            }
            setError("Something is wrong, please try again later")
        })
    }

    return(
        <main>
            <h1>Welcome back!</h1>
            <h2>It´s nice to see you again</h2>
            <p>{error}</p>
            <div className="formSU">
                <input style={{marginBottom:"1rem"}} className="formSignUp" name="userMail" type="text" placeholder="Insert your mail" onChange={inputHandler}/>
                <input className="formSignUp" name="password" type="password" placeholder="Insert your password" onChange={inputHandler}/>
            </div>
            <button className="loguin" onClick={formSubmit}
                style={{padding:"0.5rem 2rem", borderRadius:"20px", backgroundColor:"rgb(235,84,1)", color:"white", margin:"1rem 1rem"}}>
                Log In!
            </button>
            <GoogleLogin
                clientId="700780098168-b35ln15khokfkbats4tm4sl7cbcv3bup.apps.googleusercontent.com"
                buttonText="or use Google acaunt"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <p style={{marginTop:"1rem", fontSize:"18px"}}>Don't have an account? <Link className="sign" to="/sign_up">Sign up here!</Link></p>
        </main>
    )
}

const mapStateToProps = (state) => {
    return{
        logged: state.user.logged
    }
}

const mapDispatchToProps = {
    logIn: userActions.logIn,
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)