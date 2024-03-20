import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, removeAuthData, searchFilter } from "../../redux/actions/fetch_action";
import { IauthState, Istate } from "../../interface/reducer_interface";
import { IinfoDataType } from "../../interface/data_interface";
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SideBar from "./sideBar";
import Menu from "./menu";
import "./title.css";
import mss from "../../assets/images/mss.jpg";

const Title = () => {

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchResult, setSearchResult] = useState<string>("");

  const allProducts = useSelector((state: Istate) => state.productReducer.allProducts);

  useEffect(() => {
    const data = localStorage.getItem('auth')
    if (data) {
      const parseData = JSON.parse(data);
      const authData = {
        token: parseData.token,
        user: {
          name: parseData.user.name,
          email: parseData.user.email
        },
        isAdmin: parseData.isAdmin
      }
      dispatch(isLoggedIn(authData))
    }
    // eslint-disable-next-line
  }, [])

  const auth = useSelector(
    (state: IauthState) => state.authReducer.authData
  );


  const handleLogOut = () => {
    dispatch(removeAuthData())
    localStorage.removeItem('auth')
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  }

  const filteredProducts = allProducts.filter((product: IinfoDataType) => {
    if (
      product.productName.toLowerCase().includes(searchResult) ||
      product.productCategory.toLowerCase().includes(searchResult) ||
      product.productSubCategory.toLowerCase().includes(searchResult) ||
      product.brand.toLowerCase().includes(searchResult)
    ) {
      return allProducts;
    }
    // eslint-disable-next-line
    return;
  });

  const showList = () => {
    navigate(`/search/${searchResult}`)
    dispatch(searchFilter(filteredProducts, true));
    setSearchResult("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchResult(e.target.value.toLowerCase());
  }

  if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === '/orderconfirmation' || location.pathname === '/forgot-password') {
    return null;
  }

  const getAvatarLetter = (fullName: string) => {
    return fullName ? fullName.charAt(0).toUpperCase() : "";
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const iconStyle = {
    textAlign: 'center',
    color: 'black',
    fontSize: '25px'
  }

  return (
    <React.Fragment>
      <div className="head" data-testid="titleHead">
        <div className="menu-icon" onClick={() => setOpen(true)}>
          <MenuIcon />
        </div>

        <div className="logo-home">
          <img src={mss} alt="logo"></img>
        </div>

        <div className="search">
          <input
            type="search"
            placeholder="Search.."
            value={searchResult}
            onChange={handleChange}
          ></input>
          <i className="fa fa-paper-plane"
            aria-hidden="true"
            data-testid="search"
            onClick={showList}
          ></i>
        </div>

        <div className="search-icon">
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>

        <div className="profile">
          <div
            className="user"
            onClick={handleMenuClick}
            data-testid="hover"
          >
            {auth.token.length > 0 ? (
              <Avatar sx={{ color: 'white', backgroundColor: '#615966', fontWeight: '700' }}>{getAvatarLetter(auth.user.name)}</Avatar>
            ) : (
              <>
                <i className="fa fa-user" aria-hidden="true"></i>
                <div>Profile</div>
              </>
            )}
          </div>
        </div>

        <div className="icons">
          <div className="title-icons">
            <Link to="/wishlist" data-testid="wishlist" className="link">
              <FavoriteBorderIcon sx={iconStyle}></FavoriteBorderIcon>
              <span className="user">WishList</span></Link>
          </div>
          <div className="title-icons">
            <Link to="/cart" data-testid="cart" className="link">
              <ShoppingBagOutlinedIcon sx={iconStyle}></ShoppingBagOutlinedIcon>
              <span className="user">Cart</span>
            </Link>
          </div>
        </div>

        {anchorEl && (
          <Menu handleLogOut={handleLogOut} name={auth.user.name} anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
        )}
      </div>

      {open && (<SideBar open={open} handleCloseDrawer={handleCloseDrawer} name={auth.user.name} />)}
    </React.Fragment>

  );

};

export default Title; 
