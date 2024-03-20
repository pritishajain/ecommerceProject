import React from "react"
import { PleaseSignIn, SignIn, ViewOrders } from "../../../assets/constants/constant";
import { useNavigate } from "react-router";
import { IinfoDataType } from "../../../interface/data_interface";
import { dataInfo } from "../common/product_tile";
import "../wishlist_page/not_login_wishlist.css";
import addListIcon from "../../../assets/images/addlisticon.png";

interface IsavedData{
    data:IinfoDataType,
    type:string
  }
const NotLoginedOrderHistory = () => {

    const navigate = useNavigate();
    const handleClick=()=>{
        const userSavedData :IsavedData= {
          data:dataInfo,
          type:"orders"
        }
        localStorage.setItem('userData', JSON.stringify(userSavedData));
        navigate("/login")
      }
  return (
    <React.Fragment>
    <div className="w-container" data-testid="login">
      <p className="w-head">{PleaseSignIn}</p>
      <p className="w-child">{ViewOrders}</p>
       <img src={addListIcon} alt="addlisticon" className="w-img"></img>
       <div>
      <button className="w-sign-in" onClick={handleClick}>{SignIn}</button>
      </div>
    </div>
   </React.Fragment>
  )
};

export default NotLoginedOrderHistory;
