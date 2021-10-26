const Activity = ({activity}) => {
    return(
        <>
        <div className="activitiesPicture" style={{backgroundImage:`url(${activity.picture})`}}>
            <p className="textActivityPicture">{activity.activity}</p>
        </div>
        </>
    )
}

export default Activity