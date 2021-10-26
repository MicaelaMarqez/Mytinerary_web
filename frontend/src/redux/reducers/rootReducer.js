import {combineReducers} from "redux"
import itinerariesReducer from "./itinerariesReducer"
import citiesReducer from "./citiesReducers"
import userReducer from "./userReducer"

const rootReducer = combineReducers({
    itineraries: itinerariesReducer,
    cities: citiesReducer,
    user: userReducer
})

export default rootReducer