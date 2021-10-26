import {Link} from "react-router-dom";

const Hero = () => {
    return(
        <header className="hero">
            <div id="hero">
                <img src="../assets/icono2.png" alt="icono" id="iconoHero"/>
                <h1>myTinerary</h1>
                <p>Find your perfect trip, designed by insiders who know and love their cities!<br/>Choose your destination</p>
                <Link to="/cities"><p className="callButton">Click here!</p></Link>
                <video loop autoPlay muted>
                    <source src="../assets/tour2.mp4" type="video/mp4"></source>
                </video>
            </div>
            <div id="separator"></div>
        </header>
    )
}

export default Hero;