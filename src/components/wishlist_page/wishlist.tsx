import React from "react";
import { useSelector } from "react-redux";
import ProductTile from "../common/product_tile";
import EmptyWishlist from "./empty_wishlist";
import { IuserState } from "../../interface/reducer_interface";
import NotLoginWishList from "./not_login_wishlist";
import { MyWishList } from "../../assets/constants/constant";
import Footer from "../home_page/footer";

const Wishlist = () => {
  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );

  const isLogIn = useSelector(
    (state: IuserState) => state.userDataReducer.isLogIn
  );

  return (
    <React.Fragment>
      {!isLogIn ? <NotLoginWishList /> : (userData.wishList.length > 0 ? (
        <div data-testid="wishlistPage">
          <h1>{MyWishList}</h1> <ProductTile list={userData.wishList} />
        </div>
      ) : (
        <EmptyWishlist />
      ))}
      <Footer />
    </React.Fragment>
  );
};

export default Wishlist;
