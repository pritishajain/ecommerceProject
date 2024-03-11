import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IinfoDataType } from "../../interface/data_interface";
import "../../assets/css/remove_item.css";
import { removeAddToWishList, removeFromCart } from "../../redux/actions/fetch_action";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { IuserState } from "../../interface/reducer_interface";
import { MoveFromBag, MoveToWishlist, ConfirmationToMoveFromBag, RemoveFromBag } from "../../assets/constants/constant";

interface IremoveProps {
  data: IinfoDataType;
  closePopUp: (popUp: boolean) => void;
}

const RemoveItem = (props: IremoveProps) => {

  const dispatch = useDispatch();

  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );

  const removeItemFromCart = async () => {
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

    const updatedCart = userData.cart.filter(
      (product: IinfoDataType) => product.id !== props.data.id
    );

    updateDoc(docRef, { cart: updatedCart });
    props.closePopUp(false);
    dispatch(removeFromCart(props.data.id));
  };

  const removeAndAddToWishList = async () => {
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

    const updatedCart = userData.cart.filter(
      (product: IinfoDataType) => product.id !== props.data.id
    );
    const updatedWishList = [...userData.wishList, props.data];

    updateDoc(docRef, { cart: updatedCart, wishList: updatedWishList });
    props.closePopUp(false);
    dispatch(removeAddToWishList(props.data));
  };

  return (
    <React.Fragment>
      <div className="r-container">
        <div className="r-details">
          <div className="r-data">
            <div className="r-img">
              <img src={props.data.imageUrl} alt="productimage"></img>
            </div>

            <div className="r-content">
              <p>
                <b>{MoveFromBag}</b> <br />
                {ConfirmationToMoveFromBag}
              </p>
            </div>

            <div className="r-close-btn">
              <i
                className="fa fa-close"
                onClick={() => props.closePopUp(false)}
              ></i>
            </div>
          </div>

          <hr></hr>
          <div className="r-remove">
            <div className="r-r-btn" onClick={removeItemFromCart}>
              {RemoveFromBag}
            </div>
            |
            <div className="r-w-btn" onClick={removeAndAddToWishList}>
              {MoveToWishlist}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RemoveItem;
