import React from "react";
import "../../assets/css/menu.css";
import LoginedDropDownMenu from "./loginedDropDownMenu";
import LogoutDropDownMenu from "./logoutDropDownMenu";

interface menuProps{
  isLoggedIn: boolean; 
  handleLogOut: () => void
}

const Menu = (props: menuProps) => {
  return (
    <React.Fragment>
      <div className="dropdown">
        
      {props.isLoggedIn ? <LoginedDropDownMenu handleLogOut={props.handleLogOut} /> : <LogoutDropDownMenu/>}
      
      </div>
    </React.Fragment>
  );
};

export default Menu;
