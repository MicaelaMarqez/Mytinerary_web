import { useRef, useState } from "react"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import Swal from "sweetalert2"

const Comentary = (props) => {
    const comentary = props.comentary
    const edit = useRef()
    const [inputEdit, setInputEdit] = useState(false)

    const sweetAlert = () => {
        Swal.fire({
            title:"Error",
            text: "Something is wrong, please try again later",
            icon: "error",
            cancelButtonText:"Cool"
        })
    }

    const toEliminate = () => {
        props.eliminateComment(props.itId, {commentId: comentary._id, token: props.token})
        .then(res => props.toRender(res.data.response))
        .catch(() => sweetAlert())
    }

    const toEdit = () => {
        setInputEdit(true)
    }

    const dispatchEdit = () => {
        console.log(comentary._id, edit.current.value)
        props.editComment(comentary._id, {editComment: edit.current.value, token: props.token})
        .then(res => props.toRender(res.data.response))
        .catch(() => sweetAlert())
        setInputEdit(false)
    }

    return(
        <div className="boxComent">
            <img className="user" src={comentary.userId.profilePicture} alt="userPicture"/>
            
            <div style={{flex:"1"}}>
                <p className="com" style={{fontWeight:"bold"}}>{comentary.userId.userName}</p>
                {inputEdit ? <input type="text" name="edit" ref={edit} defaultValue={comentary.comment}/> : 
                    <p className="com">{comentary.comment}</p>}
            </div>
            {inputEdit ? 
            <div style={{alignSelf:"flex-end"}}>
                <button onClick={dispatchEdit}><img src="../assets/send.png" alt="trash"/></button>
            </div>:
            (comentary.userId._id === props.userId &&
            <div style={{alignSelf:"flex-end"}}>
                <button onClick={toEdit} style={{marginRight:"0.5rem"}}><img src="../assets/edit.png" alt="edit"/></button>
                <button onClick={toEliminate}><img src="../assets/trash.png" alt="trash"/></button>
            </div>)}
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
    eliminateComment: itinerariesActions.eliminateComment,
    editComment: itinerariesActions.editComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comentary)