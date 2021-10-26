const citiesReducer = (state={cities:[], wantedCities:[], popularCities:[]}, action) => {
    switch (action.type){
        case "GET_ALL_CITIES":
            return{
                ...state,
                cities: action.payload,
                wantedCities: action.payload
            }
        case "GET_FILTER_CITIES":
            let filter = state.cities.filter(c => c.city.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return{
                ...state,
                wantedCities: filter
            }
        case "GET_POPULAR_CITIES":
            return{
                ...state,
                popularCities: action.payload
            }
        default:
            return state
    }
}

export default citiesReducer