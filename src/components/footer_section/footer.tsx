import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Hindware, Cera, Jaguar, Dsons, Products, Faucets, Sink, Tiles, Shower, Brands, Contact, AboutUs, Certifications, Media, Company, Address } from "../../assets/constants/constant";
import "./footer.css";


const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/cart" || location.pathname ==='/orderconfirmation') {
    return null;
  }
  
  return (
    <React.Fragment>
      <div className="footer-container" data-testid="footerContainer">
        <div className="f-content">
          <div className="f-brands">
            <li className="f-head">{Brands}</li>  
            <li className="f-child">{Dsons}</li>
            <li className="f-child">{Jaguar}</li>
            <li className="f-child">{Hindware}</li>
            <li className="f-child">{Cera}</li>
          </div>
          <div className="f-products">
            <li className="f-head">{Products}</li>
            <li className="f-child">{Faucets}</li>
            <li className="f-child">{Sink}</li>
            <li className="f-child">{Tiles}</li>
            <li className="f-child">{Shower}</li>
          </div>
          <div className="f-company">
            <li className="f-head">{Company}</li>
            <li className="f-child">{AboutUs}</li>
            <li className="f-child">{Certifications}</li>
            <li className="f-child">{Media}</li>
          </div>
          <div className="f-contact">
            <li className="f-head">{Contact}</li>
            <li className="f-child">{Address}</li>
            <li className="f-child">
            <Link to="" className="fa fa-facebook"></Link>
            <Link to="" className="fa fa-youtube"></Link>
            <Link to="" className="fa fa-instagram"></Link> 
            </li>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
