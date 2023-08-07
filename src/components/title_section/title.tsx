import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Istate, IuserState } from "../../interface/product_reducer_interface";
import { emptyData, getUserInfo, isLoggedIn, searchFilter } from "../../redux/actions/fetch_action";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { IuserInfo } from "../../interface/user_data_interface";
import { IinfoDataType } from "../../interface/data_interface";
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SideBar from "./sideBar";
import Menu from "./menu";
import "../../assets/css/title.css";
import mss from "../../assets/images/mss.jpg";


const Title = () => {

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchResult, setSearchResult] = useState<string>("");

  const isLogIn = useSelector(
    (state: IuserState) => state.userDataReducer.isLogIn
  );

  const allProducts = useSelector((state: Istate) => state.productReducer.allProducts);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(isLoggedIn(true));

        const q = query(collection(db, "UserInformation"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data() as IuserInfo
          dispatch(getUserInfo(data))
        });
      } else {
        dispatch(isLoggedIn(false));
        dispatch(emptyData());
      }
    });
  }, [dispatch]);

  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(isLoggedIn(false));
      dispatch(emptyData());
    });
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

  if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === '/orderconfirmation') {
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
    textAlign:'center',
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
            {isLogIn ? (
              <Avatar sx={{ color: 'white', backgroundColor: '#615966', fontWeight: '700' }}>{getAvatarLetter(userData.fullName)}</Avatar>
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
          <Menu isLoggedIn={isLogIn} handleLogOut={handleLogOut} name={userData.fullName} anchorEl={anchorEl} handleMenuClose={handleMenuClose}/>
        )}
      </div>

      {open && (<SideBar open={open} handleCloseDrawer={handleCloseDrawer} name={userData.fullName}/>)}
    </React.Fragment>

  );

};

export default Title; 
