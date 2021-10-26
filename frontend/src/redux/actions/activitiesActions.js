import axios from "axios"

const activitiesActions = {
    getActivityByIt: (idIt) => {
        return async () => {
            let res = await axios.get(`http://localhost:4000/api/activities/${idIt}`)
            return res
        }
    }
}

export default activitiesActions