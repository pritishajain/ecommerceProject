import React from "react";
import addListIcon from "../../assets/images/addlisticon.png";
import "../../assets/css/not_login_wishlist.css";
import { useNavigate } from "react-router";
import { IinfoDataType } from "../../interface/data_interface";
import { dataInfo } from "../common/product_tile";
import { PleaseSignIn, ViewWishList, SignIn } from "../../assets/constants/constant";

interface IsavedData{
  data:IinfoDataType,
  type:string
}
const NotLoginWishList = () => {
  const navigate = useNavigate();
  
  const handleClick=()=>{
    const userSavedData :IsavedData= {
      data:dataInfo,
      type:"wishList"
    }
    localStorage.setItem('userData', JSON.stringify(userSavedData));
    navigate("/login")
  }
  return (
   <React.Fragment>
    <div className="w-container" data-testid="login">
      <p className="w-head">{PleaseSignIn}</p>
      <p className="w-child">{ViewWishList}</p>
       <img src={addListIcon} alt="addlisticon" className="w-img"></img>
       <div>
      <button className="w-sign-in" onClick={handleClick}>{SignIn}</button>
      </div>
    </div>
   </React.Fragment>
  )
};

export default NotLoginWishList;
