import Activity from "./Activity"

const Activities = (props) => {
    const activities = props.activities

    if (activities.length===0) {
        return (
            <h4>no hay activities</h4>
        )
    }

    return(
        <div style={{display:"flex",flexWrap:"wrap" , justifyContent:"space-evenly", alignItems:"flex-start", width:"100%"}}>
            {activities.map((a, index) => <Activity activity={a} key={index}/>)}
        </div>
    )

}

export default Activities