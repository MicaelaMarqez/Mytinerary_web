import { connect } from "react-redux"
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import userActions from "../redux/actions/userActions"
import { GoogleLogin } from 'react-google-login'
import Swal from "sweetalert2"

//700780098168-b35ln15khokfkbats4tm4sl7cbcv3bup.apps.googleusercontent.com

const SignUp = (props) => {
    const countries = props.countries
    const [errors, setErrors] = useState ([])
    const [newUser, setNewUser] = useState({userName: null, userLastName: null, userMail: null, profilePicture: null, password: null, country: null})

    const sweetAlert = (message) => {
        Swal.fire({
            title:"Error",
            text:message,
            icon: "error",
            cancelButtonText:"Cool"
        })
    }

    const saveUser = (nUser) => {
        props.createUser(nUser)
        .then((res) => {
            if (res.data.success){
                console.log("trajo true")
                props.history.push("/sign_in")
            } else {
                console.log("trajo false")
                if(res.data.error === "Mail already in use" || res.data.error === "Something is wrong, please try again later"){
                    sweetAlert(res.data.error)
                } else {
                    setErrors(res.data.error)
                }
            }
        })
        .catch((error) => {
            console.log("el catch del sign up")
            if(error.message === "Network Error"){
                console.log("something is wrong on the route")
            } else {
                console.log(error.message)
            }
            sweetAlert("Something is wrong, please try again later")
        })
    }

    const inputHandler = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        if(Object.keys(newUser).some((property) => newUser[property] === null) ||
            !newUser.userMail.includes("@")){
            sweetAlert("All fields are required")
            return false
        }
        saveUser(newUser)
    }

    useEffect(() => {
        props.getCountries()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

const responseGoogle = (googleRegister) => {
    let googleUser = {
        userName: googleRegister.profileObj.givenName,
        userLastName: googleRegister.profileObj.familyName,
        userMail: googleRegister.profileObj.email,
        profilePicture: googleRegister.profileObj.imageUrl,
        password: googleRegister.profileObj.googleId,
        google: true,
        country: "Argentina"}
    saveUser(googleUser)
}

if (countries.length===0) {
    return (
    <main>
        <div style={{textAlign:"center"}}>
            <img src="../assets/icono3.png" alt="img" width="10%"/>
            <h4>Loading...</h4>
        </div>
    </main>
    )
}

    return(
        <main>
            <h1 style={{marginTop:"1rem"}}>Welcome to myTinerary!</h1>
            <h2>Let’s begin the adventure</h2>
            <div className="formSU">
                <p className="errorSignUp">*{(errors && (errors.find(error => error.path[0]==="userName")) && 
                    errors.find(error => error.path[0]==="userName").message)}</p>
                <input className="formSignUp" name="userName" type="text" placeholder="Insert Name" onChange={inputHandler}/>
            </div>
            <div className="formSU">
                <p className="errorSignUp">*{errors && (errors.find(error => error.path[0]==="userLastName") && 
                    errors.find(error => error.path[0]==="userLastName").message)}</p>
                <input className="formSignUp" name="userLastName" type="text" placeholder="Insert Last Name" onChange={inputHandler}/>
            </div>
            <div className="formSU">
                <p className="errorSignUp">*{errors && (errors.find(error => error.path[0]==="userMail") && 
                    errors.find(error => error.path[0]==="userMail").message)}</p>
                <input className="formSignUp" name="userMail" type="text" placeholder="Insert Mail" onChange={inputHandler}/>
            </div>
            <div className="formSU">
                <p className="errorSignUp">*{errors && (errors.find(error => error.path[0]==="profilePicture") && 
                    errors.find(error => error.path[0]==="profilePicture").message)}</p>
                <input className="formSignUp" name="profilePicture" type="text" placeholder="Insert Profile Picture" onChange={inputHandler}/>
            </div>
            <div className="formSU">
                <p className="errorSignUp">*{errors && (errors.find(error => error.path[0]==="password") && 
                    errors.find(error => error.path[0]==="password").message)}</p>
                <input className="formSignUp" name="password" type="password" placeholder="Insert Password" onChange={inputHandler}/>
            </div>
            <select name="country" id="selectCountry"  onChange={inputHandler} style={{marginTop:"1rem"}}>
                {countries.map(c => <option key={c}>{c}</option>)}
            </select>
            <button className="signUp" onClick={formSubmit}
                style={{padding:"0.5rem 2rem", borderRadius:"20px", backgroundColor:"rgb(235,84,1)", color:"white", margin:"1rem 1rem"}}>
                Send!
            </button>
            
            <GoogleLogin
                clientId="700780098168-b35ln15khokfkbats4tm4sl7cbcv3bup.apps.googleusercontent.com"
                buttonText="or use Google acaunt"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            
            <p style={{marginTop:"1rem", fontSize:"18px"}}>Already have an account? <Link className="sign" to="/sign_in">Log In here!</Link></p>
        </main>
    )
}

const mapStateToProps = (state) => {
    return{
        countries: state.user.countries
    }
}

const mapDispatchToProps = {
    getCountries: userActions.getCountries,
    createUser: userActions.createUser,
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)