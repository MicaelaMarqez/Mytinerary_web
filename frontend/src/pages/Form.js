import { useEffect, useState } from "react"
import axios from "axios"
import EditAndDelete from "../components/EditAndDelete"

const Form = () => {
    const [newCity, setNewCity] = useState({srcCard:"", srcHeader:"", city:"", country:""})
    const [cities, setCities] = useState ([])
    const [recharge, setRecharge] = useState(false)

    const inputHandler = (e) => {
        setNewCity({
            ...newCity,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = () => {
        axios
        .post("http://localhost:4000/api/form", newCity)
        .then(res => {
            if (res.data.success){
                setRecharge(!recharge)
            } else {
                alert(res.data.response)
            }
        })
        .catch((error) => alert(error))
    }
    
    useEffect(()=>{
        fetch("http://localhost:4000/api/cities")
        .then(res => res.json())
        .then(json => {setCities(json.response)}
        )
    },[recharge])

    const fRecharge = () => {setRecharge(!recharge)}

    return(
        <>
        <main>
            <h2>Charge new city!!</h2>
            <input className="form" name="city" type="text" placeholder="Insert City" onChange={inputHandler}/>
            <input className="form" name="country" type="text" placeholder="Insert Country" onChange={inputHandler}/>
            <input className="form" name="srcCard" type="text" placeholder="Insert card picture (url)" onChange={inputHandler}/>
            <input className="form" name="srcHeader" type="text" placeholder="Insert page picture (url)" onChange={inputHandler}/>
            <button className="forButton" onClick={formSubmit}
                style={{padding:"0.5rem 2rem", borderRadius:"20px", backgroundColor:"rgb(235,84,1)", color:"white"}}>Send!</button>
            <h2>Loaded cities</h2>
            {cities.map(city => {
                return (
                    <EditAndDelete fRecharge={fRecharge} city={city} key={city._id}/>
                )
                })
            }
        </main>
        </>
    )
}

export default Form