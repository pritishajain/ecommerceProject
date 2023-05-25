import React from "react";
import { useNavigate } from "react-router";
import emptyList from "../../assets/images/emptywishlist.jpg";
import "../../assets/css/empty_cart_list.css";
import { WishlisIsEmpty, Wish, ContinueShopping } from "../../assets/constants/constant";

const EmptyWishlist = () => {

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="e-cart" data-testid="emptyWishlist">
        <img src={emptyList} alt="emptywishlist" className="e-img"></img>
        <p className="e-para-1">{WishlisIsEmpty}</p>
        <p className="e-para-2">{Wish}</p>
        <button className="e-button" onClick={() => navigate("/products")} data-testid="continueShop">
         {ContinueShopping}
        </button>
      </div>
    </React.Fragment>
  );
};

export default EmptyWishlist;
