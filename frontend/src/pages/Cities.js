import {Link} from "react-router-dom"
import { useEffect } from "react"
import { connect } from "react-redux"
import citiesActions from "../redux/actions/citiesActions"
import Swal from "sweetalert2"

const Cities = (props) => {
    const cities = props.cities
    const wantedCities = props.wantedCities

    const sweetAlert = () => {
        Swal.fire({
            title:"Error",
            text:"Sorry something is wrong. You will be redirected to home",
            icon: "error",
            cancelButtonText:"Cool"
        })
        props.history.push("/")
    }
    
    useEffect(() => {
        props.getCities()
        .then(res => {
            if(!res.data.success){
                sweetAlert()
            }
        })
        .catch(() => {
            sweetAlert()
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const innputHandler = (e) => {
        props.filterCities(e.target.value)
    }

    if (cities.length===0) {
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
        <>
        <main>
        <h2>Come travel whit us!</h2>
            <input id="searchCity" type="text" placeholder="Search for city" onChange={innputHandler}/>
            <div id="cities">
            {wantedCities.length === 0 ? 
                <div style={{textAlign:"center"}}>
                    <img src="../assets/icono5.png" alt="img" width="10%"/>
                    <h2>No cities found<br/>Please try again!</h2>
                </div> :
                wantedCities.map(picture =>
                    <Link to={`/city/${picture._id}`} className="city" key={picture.city}>
                        <div className="picture" style={{backgroundImage:`url(${picture.srcCard})`}}>
                            <div className="textPicture">
                                <h3>{picture.city}</h3>
                                <p>({picture.country})</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </main>
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        cities: state.cities.cities,
        wantedCities: state.cities.wantedCities,
        token: state.user.token
    }
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities,
    filterCities: citiesActions.filterCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)