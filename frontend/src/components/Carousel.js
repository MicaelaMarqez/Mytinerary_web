import { connect } from "react-redux"
import citiesActions from "../redux/actions/citiesActions";
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import { Link } from 'react-router-dom';

const MyCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const items = props.popularCities

  useEffect(() => {
    props.getPopularCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <div className="myCarousel">
            {item.map(card => {
              return (
                <Link key={card.city} to={`/city/${card._id}`}>
                <div className="picture" style={{backgroundImage:`url(${card.srcCard})`}}>
                  <div className="textPicture">
                    <h3>{card.city}</h3>
                    <p>({card.country})</p>
                  </div>
                </div>
                </Link>
              );
            })}
        </div>
      </CarouselItem>
    );
  });

  return (
    <main>
      <h2>Popular MyTineraries</h2>
      {items.length ?
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
      <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText=" " onClickHandler={previous} />
      <CarouselControl direction="next" directionText=" " onClickHandler={next} />
      </Carousel> :
      <div style={{textAlign:"center"}}>
        <img src="../assets/icono4.png" alt="img" width="10%"/>
        <h4>(Under construction)</h4>
    </div>}
    </main>
  );
}

const mapStateToProps = (state) => {
  return{
    popularCities: state.cities.popularCities
  }
}

const mapDispatchToProps = {
  getPopularCities: citiesActions.getPopularCities
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCarousel)