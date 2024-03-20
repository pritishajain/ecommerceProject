import React from "react";
import { useNavigate } from "react-router";
import emptycart from "../../../assets/images/emptycart.jpg";
import "./empty_cart_list.css";
import { NothingInBag, AddFromWishList, CartIsLight } from "../../../assets/constants/constant";


const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="e-cart" data-testid="emptyCart">
        <img src={emptycart} alt="empty cart" className="e-img"></img>
        <p className="e-para-1">{CartIsLight}</p>
        <p className="e-para-2">{NothingInBag}</p>
        <button className="e-button" onClick={() => navigate("/wishlist")} data-testid="addfromWishlist">{AddFromWishList}</button>
      </div>
    </React.Fragment>
  );
};

export default EmptyCart;
