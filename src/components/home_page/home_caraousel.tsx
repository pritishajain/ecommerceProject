import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LuxuryFaucetsCollection, Discount} from "../../assets/constants/constant";
import luxuryf from "../../assets/images/luxuryf.jpg";
import luxuryf1 from "../../assets/images/luxuryf1.jpg";
import luxuryf2 from "../../assets/images/luxuryf2.jpg";
import "../../assets/css/home.css";
import LatestCollection from "./latest_collection";
import Footer from "./footer";

const HomeCaraousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const images: string[] = [luxuryf, luxuryf1, luxuryf2];
  return (
    <React.Fragment>
      <div className="hcontent" data-testid="home-caraousel">
        <div className="upper">
          <Slider data-testid="slider" {...settings}>
            {images.map((value:string,key:number) => {
              return (
                <div className="image-box">
                  <div className="carouselcontent">
                    <p className="hhead">{LuxuryFaucetsCollection}</p>
                    <p className="hchild">{Discount}</p>
                  </div>
                  <img src={value} alt="carousel" width="100%" />
                </div>
              );
            })}
          </Slider>
        </div>
        <LatestCollection />
        <Footer/> 
      </div>
    </React.Fragment>
  );
};

export default HomeCaraousel;
