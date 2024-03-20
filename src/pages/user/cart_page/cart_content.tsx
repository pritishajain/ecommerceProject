import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IinfoDataType } from "../../../interface/data_interface";
import RemoveItem from "./remove_item";
import { emptyCart, updateQuantity } from "../../../redux/actions/fetch_action";
import { IuserState } from "../../../interface/reducer_interface";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { Qty, Increase, Decrease, TotalMRP, TotalAmount, PriceDetails, ConvenienceFee, DiscountOnMRP, PlaceOrder, Free } from "../../../assets/constants/constant";
import { toast } from "react-toastify";
import "./cart.css";
import 'react-toastify/dist/ReactToastify.css';

const dataInfo = {
  id: 0,
  imageUrl: "",
  productName: "",
  productPrice: 0,
  productSubCategory: "",
  productCategory: "",
  productDescription: "",
  brand: "",
  qty: 1
};

const CartContent = () => {

  const [popUp, setPopUp] = useState<boolean>(false);
  const [itemData, setItemData] = useState<IinfoDataType>(dataInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );

  const updateProductQuantity = async (itemId: number, type: string) => {

    let index = userData.cart.findIndex((i: IinfoDataType) => i.id === itemId);

    let updatedCart: IinfoDataType[];

    if (type === "increase") {
      updatedCart = [
        ...userData.cart.slice(0, index),
        { ...userData.cart[index], qty: userData.cart[index].qty + 1 },
        ...userData.cart.slice(index + 1),
      ];
    }
    else {
      if (userData.cart[index].qty <= 1) {
        toast.error("Quantity cannot be less than 1");
        return
      }
      updatedCart = [
        ...userData.cart.slice(0, index),
        { ...userData.cart[index], qty: userData.cart[index].qty - 1 },
        ...userData.cart.slice(index + 1),
      ];
    }

    const querySnapshot = await getDocs(
      query(
        collection(db, "UserInformation"),
        where("email", "==", userData.email)
      )
    );
    const docRef = doc(
      collection(db, "UserInformation"),
      querySnapshot.docs[0].id
    );

    updateDoc(docRef, {
      cart: updatedCart,
    });

    dispatch(updateQuantity(updatedCart));
  };

  const displayCartTile = (value: IinfoDataType) => {
    return (
      <div className="c-products" >
        <div className="c-image">
          <img src={value.imageUrl} alt={value.productName}></img>
        </div>

        <div className="c-content">
          <span className="close-btn">
            <i
              className="fa fa-close"
              onClick={() => {
                setPopUp(true);
                setItemData(value);
              }}
            ></i>
          </span>

          <div className="c-name">{value.productName}</div>

          <div className="c-name">
            {value.productCategory}:{value.productSubCategory}
          </div>

          <div className="c-name">
            <label>{Qty}</label>
            <button onClick={() => updateProductQuantity(value.id, "increase")} >{Increase}</button>
            <input value={value.qty}></input>
            <button onClick={() => updateProductQuantity(value.id, "decrease")} >{Decrease}</button>
          </div>

          <div className="c-name">
            <i className="fa fa-rupee"></i>
            {value.productPrice}
          </div>
        </div>
      </div>
    );
  };

  const confirmOrder = async () => {

    navigate('/orderconfirmation')
    const querySnapshot = await getDocs(
      query(
        collection(db, "UserInformation"),
        where("email", "==", userData.email)
      )
    );
    const docRef = doc(
      collection(db, "UserInformation"),
      (querySnapshot).docs[0].id
    );
    updateDoc(docRef, {
      orderHistory: userData.cart,
      cart: [],
    });

    dispatch(emptyCart());
  };

  let totalmrp: number = 0;

  return (
    <React.Fragment>
      <div className="c-containerP">
        <div className="c-containerC">
          <div className="c-details">
            {userData.cart.map((value: IinfoDataType, key: number) => {
              totalmrp = totalmrp + value.qty * value.productPrice;
              key = value.id;
              return displayCartTile(value);
            })}
          </div>
          <div className="c-checkout">
            <div className="price">
              {PriceDetails}({userData.cart.length} items)
            </div>

            <div className="total">
              <div className="t-text">{TotalMRP}</div>
              <div className="t-amt">
                <i className="fa fa-rupee"></i>
                {totalmrp}
              </div>
            </div>

            <div className="total">
              <div className="t-text">{DiscountOnMRP}</div>
              <div className="t-amt" id="discount">
                <i className="fa fa-rupee"></i>100
              </div>
            </div>

            <div className="total">
              <div className="t-text">{ConvenienceFee}</div>
              <div className="t-amt" id="free">
                {Free}
              </div>
            </div>
            <hr />

            <div className="total">
              <div className="t-text" id="total-amt">
                {TotalAmount}
              </div>

              <div className="t-amt" id="total-price">
                <i className="fa fa-rupee"></i>
                {totalmrp - 100}
              </div>
            </div>

            <div className="order-btn">
              <button
                className="place"
                onClick={confirmOrder}
                data-testid="placeOrder"
              >
                {PlaceOrder}
              </button>
            </div>
          </div>
        </div>
        {popUp && <RemoveItem data={itemData} closePopUp={setPopUp} />}
      </div>
    </React.Fragment>
  );
};

export default CartContent;
