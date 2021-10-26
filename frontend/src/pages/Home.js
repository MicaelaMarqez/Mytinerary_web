import React from "react";
import Carousel from "../components/Carousel";
import Hero from "../components/Hero";
import { connect } from "react-redux";
import { useEffect } from "react";
import citiesActions from "../redux/actions/citiesActions";

const Home = (props) => {

    useEffect(()=>{
        props.getCities()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
        <Hero/>
        <Carousel/>
        </>
    )
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities
}

export default connect(null,mapDispatchToProps)(Home)