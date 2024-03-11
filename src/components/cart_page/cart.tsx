import React from "react";
import { useSelector } from "react-redux";
import "../../assets/css/cart.css";
import CartContent from "./cart_content";
import EmptyCart from "./empty_cart";
import { IuserState } from "../../interface/reducer_interface";

const Cart = () => {
  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );

  return (
    <React.Fragment>
      <div data-testid="cartPage">
        {userData.cart.length > 0 ? <CartContent /> : <EmptyCart />}
      </div>
    </React.Fragment>
  );
};

export default Cart;
