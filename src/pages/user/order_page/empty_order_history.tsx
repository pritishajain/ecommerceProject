import React from "react";
import emptyOrders from "../../../assets/images/emptyorder.png";
import { OrderIsEmpty } from "../../../assets/constants/constant";


const EmptyOrderHistory = () => {
  return (
    <React.Fragment>
      <div className="e-cart" data-testid="emptyWishlist">
        <img src={emptyOrders} alt="emptyorders" className="e-img"></img>
        <p className="e-para-1">{OrderIsEmpty}</p>
      </div>
    </React.Fragment>
  )
};

export default EmptyOrderHistory;


