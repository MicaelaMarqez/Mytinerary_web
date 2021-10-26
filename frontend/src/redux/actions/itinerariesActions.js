import axios from "axios"

const itinerariesActions = {
    getItineraries: () => {
        return async (dispatch) => {
            let res = await axios.get("http://localhost:4000/api/itineraries")
            let data = res.data.response
            dispatch({type:"GET_ALL_ITINERARIES", payload: data})
            return res
        }
    },
    getItinerariesByCity: (idCity) => {
        return async () => {
            let res = await axios.get(`http://localhost:4000/api/itineraries/${idCity}`)
            return res
        }
    },
    likeOperator: (idIt, mod) => {
        return async () => {
            let res = await axios.put(`http://localhost:4000/api/itinerary/like/${idIt}`,mod,
            {headers: {
                Authorization: "Bearer " + mod.token
            }})
            return res

        }
    },
    sendComentaries: (idIt, mod) => {
        return async () => {
            let res = await axios.put(`http://localhost:4000/api/itinerary/send_comment/${idIt}`,mod,
                {headers: {
                    Authorization: "Bearer " + mod.object.token
                }})
            return res
        }
    },
    eliminateComment: (idIt, mod) => {
        return async () => {
            let res = await axios.put(`http://localhost:4000/api/itinerary/delete_comment/${idIt}`,mod,
                {headers: {
                    Authorization: "Bearer " + mod.token
                }})
            return res
        }
    },
    editComment: (cmId, mod) => {
        return async () => {
            let res = await axios.put(`http://localhost:4000/api/itinerary/edit_comment/${cmId}`,mod,
                {headers: {
                    Authorization: "Bearer " + mod.token
                }})
            return res
        }
    }
}

export default itinerariesActions