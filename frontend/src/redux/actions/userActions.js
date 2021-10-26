import axios from "axios"
const userActions = {
    getCountries: () => {
        return async (dispatch) => {
            let data
            try{
                let res = await axios("https://restcountries.eu/rest/v2/#")
                data = res.data.map(element => element.name)
            } catch {
                data = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla"]
            }
            dispatch({type:"GET_COUNTRIES", payload: data})
        }
    },
    createUser: (newUser) => {
        return async (dispatch) => {
            console.log("ENTRO AL ACTION")
            let res = await axios.post("http://localhost:4000/api/sign_up",{...newUser})
            console.log("PASO EL FETCH")
            if(res.data.success){
                dispatch({type:"CREATE_USER", payload: res.data.response})
            }
            return res
        }
    },
    logIn: (user) => {
        return async (dispatch) => {
            let res = await axios.post("http://localhost:4000/api/sign_in",{...user})
            if(res.data.success){
                dispatch({type:"LOGUIN", payload: res.data.response})
            }
            return res
        }
    },
    logOut: () => {
        return(dispatch) => {
            dispatch({type:"LOG_OUT"})
        }
    },
    logInLS: (token) => {
        return async (dispatch) => {
            try{
                let res = await axios.get("http://localhost:4000/api/verify_token", {
                    headers: {
                        Authorization: "Bearer "+ token
                    }
                })
                dispatch({type:"LOGUIN", payload:{userId: res.data.userId,userName: res.data.userName, profilePicture: res.data.profilePicture, token: token} })
            } catch (error){
                dispatch({type: "LOG_OUT"})
            }
        }
    }
}

export default userActions