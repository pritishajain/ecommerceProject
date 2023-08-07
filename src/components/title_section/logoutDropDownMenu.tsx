import React from "react";
import { Welcome, ToAccessAccount, Login, SignUp, Orders, WishList, Cart } from "../../assets/constants/constant";
import { Button, Divider, Menu, MenuItem } from "@mui/material";

const LogoutDropDownMenu = (props: { anchorEl: null | HTMLElement, handleMenuClose: () => void }) => {

  const open = Boolean(props.anchorEl);
  const buttonStyle = {
    fontSize:'15px',
    textTransform: 'none',
    color: '#777877',
    padding:'2px',
    fontWeight:'600',
    '&:hover': {
      color: 'black', 
    },
   }

  return (
    <React.Fragment>
      <Menu
        anchorEl={props.anchorEl}
        id="account-menu"
        open={open}
        onClose={props.handleMenuClose}
        onClick={props.handleMenuClose}
        sx={{
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '&:before': {
            content: '""',
            display: 'block',
            position: 'fixed',
            top: '10%',
            right: '172px',
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },


        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={props.handleMenuClose}>
          <Button href="/" className="acc-link" 
          sx={{color:'black' ,fontSize:'15px',textTransform: 'none',fontWeight:'600'}} >{Welcome} </Button>
        </MenuItem>

        <MenuItem onClick={props.handleMenuClose} sx={{color:'black' ,fontSize:'15px',textTransform: 'none',fontWeight:'600'}} >
          {ToAccessAccount}
        </MenuItem>

        <MenuItem onClick={props.handleMenuClose}>
          <Button href="/login" className="link" data-testid="loginbtn" variant='contained'
            sx={{
              backgroundColor: 'rgb(210,31,60)',
              '&:hover': {
                backgroundColor: '#f2558f',
              },
            }}>
            {Login}/{SignUp}
          </Button>
        </MenuItem>

        <Divider />

        <MenuItem onClick={props.handleMenuClose}>
          <Button href="/orderhistory" className="p-link" sx={buttonStyle}>{Orders}</Button>
        </MenuItem>

        <MenuItem onClick={props.handleMenuClose}>
          <Button href="/wishlist" className="p-link" sx={buttonStyle}><li>{WishList}</li></Button>
        </MenuItem>

        <MenuItem onClick={props.handleMenuClose}>
          <Button href="/cart" className="p-link" sx={buttonStyle}><li>{Cart}</li></Button>
        </MenuItem>

      </Menu>
    </React.Fragment>
  );
};

export default LogoutDropDownMenu;
