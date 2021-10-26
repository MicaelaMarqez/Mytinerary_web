const userReducer = (state={countries:[], userId: null, token: null, name:null, profilePicture:null}, action) => {
    switch (action.type){
        case "GET_COUNTRIES":
            return{
                ...state,
                countries: action.payload
            }
        case "CREATE_USER":
			//alert("Successful registration")
            return {
                ...state
            }
        case "LOGUIN":
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("name", action.payload.userName)
            localStorage.setItem("profilePicture", action.payload.profilePicture)
            localStorage.setItem("userId", action.payload.userId)
			return{
                ...state,
                token: action.payload.token,
                name: action.payload.userName,
                profilePicture: action.payload.profilePicture,
                userId: action.payload.userId
            }
        case "LOG_OUT":
            localStorage.removeItem("token")
            localStorage.removeItem("name")
            localStorage.removeItem("profilePicture")
            localStorage.removeItem("userId")
            return{
                ...state,
                token: null
            }
        default:
            return state
    }
}

export default userReducer