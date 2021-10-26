import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import Activities from "./Activities"
import Comentary from "./Comentary"
import activitiesActions from "../redux/actions/activitiesActions"
import itinerariesActions from "../redux/actions/itinerariesActions"
import Swal from "sweetalert2"

const Itinerary = (props) => {
    const itinerary = props.itinerary
    const [show, setShow] = useState(false)
    const [activityByIt, setActivityByIt] = useState(null)
    const comentary = useRef()
    const [likes, setLikes] = useState(itinerary.likesEdit)
    const [comments, setComments] = useState(itinerary.comentaries)

    const sweetAlert = () => {
        Swal.fire({
            title:"Error",
            text: "Log in to do this action",
            icon: "error",
            cancelButtonText:"Cool"
        })
    }

    const toggleShow = () => {
        setShow(!show)
    }

    const i = [1, 2, 3, 4, 5]
    let p = i.splice(0,itinerary.price)

    const clickLike = () => {
        let like = !likes.includes(props.userId)

        props.likeOperator(itinerary._id, {userId: props.userId, likeState: like, token: props.token})
        .then(res => setLikes(res.data.response))
        .catch(() => sweetAlert())
    }

    useEffect(() => {
        props.getActivityByIt(itinerary._id)
        .then(res => {
            if(res.data.success){
                setActivityByIt(res.data.response)
            }
        })
        .catch((e) => {
            console.log(e)
        })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const comentarySubmit = () => {
        props.sendComentaries(itinerary._id,{object:{userId: props.userId, comment:comentary.current.value, token: props.token}})
        .then(res => setComments(res.data.response))
        .catch(() => sweetAlert())
    }

    const toRender = (newComents) => {
        setComments(newComents)
    }

    return(
        <div className="itinerary">
            <div className="itinerary_user">
                <div className="userPhoto" style={{backgroundImage:`url(${itinerary.userPhoto})`}}/>
                <h5>{itinerary.userName}</h5>
            </div>
            <div style={{width:"100%", textAlign:"center"}}>
                <h4>{itinerary.tittle}</h4>
            </div>
            <div className="itinerary_header">
                <div style={{width:"30%", display: "flex",flexWrap:"wrap", alignItems:"flex-start"}}>
                    {p.map((index) => <img key={index} src="../assets/money.png" alt="money" style={{height:"2rem", marginRight:"0.5rem"}}/>)}
                </div>
                <div style={{width:"30%", textAlign:"center"}}>
                <img style={{height:"2rem"}} src="../assets/chronometer.png" alt="logo Facebook"/>
                    <p>duration: {itinerary.duration}hs</p>
                </div>
                <div style={{width:"30%", textAlign:"end"}}>
                    <img onClick={clickLike} style={{height:"2rem"}}
                    src={likes.includes(props.userId) ? "../assets/love.png" : "../assets/love2.png" } alt="logo Facebook"/>
                    
                    <p>{likes.length}</p>
                </div>
            </div>
            <div className="itinerary_hashtags">
                {itinerary.hastags.map((h, index) => <p key={index} >#{h}</p>)}
            </div>
            {show &&
            <div>
                {comments.map(c=><Comentary key={c._id} toRender={toRender} itId={itinerary._id} comentary={c}/>)}
                <input name="comentary" type="text" ref={comentary} placeholder="let your comentary"></input>
                <button onClick={comentarySubmit}>Send</button>
            <Activities activities={activityByIt}/>
            </div>}
            <button className="itinerary_btton" onClick={toggleShow}>{show ? "View Less" : "View More"}</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        userId: state.user.userId,
        token: state.user.token
    }
}

const mapDispatchToProps = {
    getActivityByIt: activitiesActions.getActivityByIt,
    likeOperator: itinerariesActions.likeOperator,
    sendComentaries: itinerariesActions.sendComentaries
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)