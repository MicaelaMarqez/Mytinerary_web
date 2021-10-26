import axios from "axios"
import { useEffect, useState } from "react"


const EditAndDelete = (props) => {

    const city = props.city
    const fRecharge = props.fRecharge
    
    const [show, setShow] = useState(false)
    const [deleteCity, setDeleteCity] = useState("empty")
    const [editCity, setEditCity] = useState ({srcCard:"", srcHeader:"", city:"", country:""})

    useEffect(() => {
        if(deleteCity !== "empty"){
            axios
            .delete(`http://localhost:4000/api/cities/`+deleteCity)
            .then(res => {
                if(!res.data.success){
                    alert(res.response)
                }
            })
            .catch((error) => alert(error))
            .finally(() => fRecharge())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[deleteCity])

    const toggleEdit = () => {
        setShow(!show)
    }

const editHandler = (e) => {
    setEditCity({
        ...editCity,
        [e.target.name]: e.target.value
    })
}

const editSubmit = () => {
    axios
    .put(`http://localhost:4000/api/city/${city._id}`, editCity)
    .then(res => {
        if(res.data.success){
            alert(res.response)
        }
    })
    .catch((error) => alert(error))
    .finally(() => fRecharge())
}

    return(
        <>
        <div style={{display:"flex", justifyContent:"center", width:"100%", marginBottom:"1rem"}}>
            <h3>{city.city}</h3>
            <button className="forButton" onClick={toggleEdit}
            style={{padding:"0.5rem 2rem", borderRadius:"20px", backgroundColor:"rgb(235,84,1)", color:"white", margin:"0 1rem"}}
            >{show ? "Cancel" : "Edit"}</button>
            <button className="forButton" onClick={() => setDeleteCity(city._id)}
            style={{padding:"0.5rem 2rem", borderRadius:"20px", backgroundColor:"rgb(235,84,1)", color:"white"}}
            >Delete</button>
        </div>
        {show &&
        <div style={{textAlign:"center", marginBottom:"3rem"}}>
            <input className="form" name="city" type="text" placeholder="Insert City" onClick={editHandler}/>
            <input className="form" name="country" type="text" placeholder="Insert Country" onClick={editHandler}/>
            <input className="form" name="srcCard" type="text" placeholder="Insert card picture (url)" onClick={editHandler}/>
            <input className="form" name="srcHeader" type="text" placeholder="Insert page picture (url)" onClick={editHandler}/>
            <button className="forButton" onClick={editSubmit}
            style={{padding:"0.5rem 2rem", borderRadius:"20px", backgroundColor:"rgb(235,84,1)", color:"white"}}>Send change</button>
        </div>
        }
    </>
    )
}

export default EditAndDelete