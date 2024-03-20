import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IuserState } from "../../../interface/reducer_interface";
import Loading from "../../../components/loading_comp/loading";
import { Hey, OrderConfirmed, ShippingConfirmationEmail, ContinueShopping } from "../../../assets/constants/constant";
import "./order_confirmation.css";

const OrderConfirmation = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  if (loading) return <Loading />


  return (
    <React.Fragment>
      <div className="oc-container" data-testid="order-confirmation">
        <div className="oc-content">
          <i className="fa fa-check-circle"></i>
          <p>{Hey} {userData.fullName}</p>
          <h1>{OrderConfirmed}</h1>
          <p>{ShippingConfirmationEmail}</p>
          <button className="oc-button" onClick={() => navigate("/products")}>{ContinueShopping}</button>
        </div>
      </div>
    </React.Fragment>
  )
};

export default OrderConfirmation;
