import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
        <main>
            <img src="../assets/barrera.png" alt="barrier" style={{height:"15rem"}}/>
            <p id="notFound">Error: 404, Not Found</p>
            <Link to="/"><p className="callButton">Back to home</p></Link>
        </main>
        </>
    )
}

export default NotFound