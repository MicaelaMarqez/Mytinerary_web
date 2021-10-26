import { useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import Itineraries from "../components/Itineraries"
import citiesActions from "../redux/actions/citiesActions"
import itinerariesActions from "../redux/actions/itinerariesActions"

const City = (props) => {
    const [myCity, setMyCity] = useState([])
    const [itinerariesError, setItinerariesError] = useState(false)
    const [itinerariesByCity, setItinerariesByCity] = useState(null)

    const sweetAlert = () => {
        Swal.fire({
            title:"Error",
            text:"Sorry something is wrong. You will be redirected to home",
            icon: "error",
            cancelButtonText:"Cool"
        })
        props.history.push("/")
    }

    useEffect(()=>{
        props.getCity(props.match.params.id)
        .then(res => {
            if(res.data.success){
                setMyCity(res.data.response)
            } else {
                sweetAlert()
            }
            
        })
        .catch(() => {
            sweetAlert()
        })
        
        props.getItinerariesByCity(props.match.params.id)
        .then(res => {
            if(res.data.success){
                setItinerariesByCity(res.data.response)
            } else {
                setItinerariesError(true)
            }
        })
        .catch(() => {
            setItinerariesError(true)
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if (itinerariesByCity===null || myCity.length===0) {
        return (
            <main>
                <div style={{textAlign:"center"}}>
                    <img src={itinerariesError ? "../assets/icono4.png" : "../assets/icono3.png"} alt="img" width="10%"/>
                    <h4>{itinerariesError ? "Itineraries cannot be viewed at this time please try again later" : "Loading..."}</h4>
                </div>
            </main>
        )
    }
    
    return(
        <>
            <div style={{backgroundImage:`url(${myCity.srcHeader})`}}
                className="srcHeader">
                <div className="city">
                <h1>Come to know {myCity.city}!!</h1>

                <Itineraries itineraries={itinerariesByCity}/>
                
                <Link to="/cities"><p className="cityButton">Back to cities</p></Link>
            </div>
        </div>
        </>
    )
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities,
    getCity: citiesActions.getCity,
    getItinerariesByCity: itinerariesActions.getItinerariesByCity
}

export default connect(null, mapDispatchToProps)(City)