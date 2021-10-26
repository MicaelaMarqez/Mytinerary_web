import Itinerary from "./Itinerary"

const Itineraries = (props) => {
    const itineraries = props.itineraries

    if (itineraries.length===0) {
        return (
            <div className="underConstruction">
                <img src="../assets/icono5.png" alt="traveler" style={{height:"15rem"}}/>
                <h3>No itineraries yet for this city</h3>
            </div>
        )
    }

    return(
        <div style={{display:"flex",flexWrap:"wrap" , justifyContent:"space-evenly", alignItems:"flex-start", width:"100%"}}>
            {itineraries.map((i, index) => <Itinerary itinerary={i} key={index}/>)}
        </div>
    )

}

export default Itineraries