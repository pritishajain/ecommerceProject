import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Istate } from "../../interface/product_reducer_interface";
import { searchFilter } from "../../redux/actions/fetch_action";
import {Home, Products, Contact} from "../../assets/constants/constant";
import "../../assets/css/navbar.css";


const NavBar = () => {

  const dispatch = useDispatch();

  const allProducts = useSelector((state: Istate) => state.productReducer.allProducts);

  const location=useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/cart" || location.pathname ==='/orderconfirmation') {
    return null;
  }
  
  return (
    <React.Fragment>
      <div className="main" data-testid="nav">
        <div className="items">
          <Link to="/" className="nav-items">
            {Home}
          </Link>

          <Link
            to="/products"
            className="nav-items"
            data-testid="product"
            onClick={() => dispatch(searchFilter(allProducts,false))}
          >
            {Products}
          </Link>

          <Link to="/contact" data-testid="contact" className="nav-items">
            {Contact}
          </Link>
        </div>

        <div className="icons">
          <Link to="/wishlist" data-testid="wishlist">
            <i className="fa fa-heart"></i>
          </Link>

          <Link to="/cart" data-testid="cart">
            <i className="fa fa-shopping-cart"></i>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
export default NavBar;
