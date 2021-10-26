import axios from "axios"

const citiesActions = {
    getCities: () => {
        return async (dispatch) => {
            let res = await axios.get("http://localhost:4000/api/cities")
            let data = res.data.response
            dispatch({type:"GET_ALL_CITIES", payload: data})
            return res
        }
    },
    filterCities: (inputValue) => {
        return (dispatch) => {
            dispatch({type: "GET_FILTER_CITIES", payload: inputValue})
        }
    },
    getCity: (idCity) => {
        return async () => {
            let res = await axios.get(`http://localhost:4000/api/city/${idCity}`)
            return res
        }
    },
    getPopularCities: () => {
        return async (dispatch) => {
            try{
                let res = await axios.get("http://localhost:4000/api/popular")
                var items = []
                if(res.data.response.length === 12){
                    items = [
                        res.data.response.splice(0,4),
                        res.data.response.splice(0,4),
                        res.data.response.splice(0,4)
                    ]}
                dispatch({type:"GET_POPULAR_CITIES", payload: items})
            } catch {
                dispatch({type:"GET_POPULAR_CITIES", payload: []})
            }            
        }
    }
}

export default citiesActions