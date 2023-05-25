import React from "react";
import { Link } from "react-router-dom";
import { Welcome, ToAccessAccount, Login, SignUp, Orders, WishList, Cart } from "../../assets/constants/constant";

const LogoutDropDownMenu = () => {
  return (
    <React.Fragment>
      <div className="dropdown-content" data-testid="logout-dropdown">
        <p>
          <div className="welcome">{Welcome} </div>
          <div className="msg">{ToAccessAccount}</div>
          <li className="login-btn" >
            <Link to="/login" className="link" data-testid="loginbtn">
              {Login}
            </Link>
            /
            <Link to="/signup" className="link" data-testid="signupbtn">
              {SignUp}
            </Link>
          </li>
        </p>
        <hr />

        <Link to="/orderhistory" className="p-link"><li>{Orders}</li></Link>
        <Link to="/wishlist" className="p-link"><li>{WishList}</li></Link>
        <Link to="/cart" className="p-link"><li>{Cart}</li></Link>
      </div>
    </React.Fragment>
  );
};

export default LogoutDropDownMenu;
