import React from "react";
import LoginedDropDownMenu from "./loginedDropDownMenu";
import LogoutDropDownMenu from "./logoutDropDownMenu";

interface menuProps {
  handleLogOut: () => void;
  name: string;
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
}

const Menu = (props: menuProps) => {
  return (
    <React.Fragment>
      <div className="dropdown">

        {props.name.length > 0 ?
          <LoginedDropDownMenu handleLogOut={props.handleLogOut} name={props.name} anchorEl={props.anchorEl} handleMenuClose={props.handleMenuClose} />
          :
          <LogoutDropDownMenu anchorEl={props.anchorEl} handleMenuClose={props.handleMenuClose} />}

      </div>
    </React.Fragment>
  );
};

export default Menu;
