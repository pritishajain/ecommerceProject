import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProductDescription from "./product_description";
import { IinfoDataType } from "../../interface/data_interface";
import { addToCart, addToWishList, removeFromWishList } from "../../redux/actions/fetch_action";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IuserState } from "../../interface/reducer_interface";
import Pagination from "./pagination";

export const dataInfo = {
  id: 0,
  imageUrl: "",
  productName: "",
  productPrice: 0,
  productSubCategory: "",
  productCategory: "",
  productDescription: "",
  brand: "",
  qty: 1
};

const ProductTile = (props: { list: IinfoDataType[] }) => {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popUp, setPopUp] = useState<boolean>(false);
  const [itemData, setItemData] = useState<IinfoDataType>(dataInfo);

  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );

  const isLogIn = useSelector(
    (state: IuserState) => state.userDataReducer.isLogIn
  );

  const presentInWishList = (id: number) => {
    return userData.wishList.some((product) => product.id === id);
  };

  interface IsavedData {
    data: IinfoDataType,
    type: string
  }
  const addProductToWishList = async (value: IinfoDataType) => {

    if (!isLogIn) {
      const userSavedData: IsavedData = {
        data: value,
        type: "wishList"
      }
      localStorage.setItem('userData', JSON.stringify(userSavedData))
      navigate("/login")
    }

    const querySnapshot = await getDocs(
      query(
        collection(db, "UserInformation"),
        where("email", "==", userData.email)
      )
    );

    const docRef = doc(
      collection(db, "UserInformation"),
      querySnapshot.docs[0].id
    );

    if (presentInWishList(value.id)) {
      toast.info("Removed From Wishlist")
      const updatedWishlist = userData.wishList.filter((product: IinfoDataType) => product.id !== value.id);

      updateDoc(docRef, { wishList: updatedWishlist, });

      dispatch(removeFromWishList(value.id));
    } else {
      toast.success("Successfully added to wishlist");
      updateDoc(docRef, {
        wishList: [...userData.wishList, value],
      });

      dispatch(addToWishList(value));
    }
  };

  const presentInCart = (id: number) => {
    return userData.cart.some((product) => product.id === id);
  };

  const addProductToCart = async (value: IinfoDataType) => {

    if (!isLogIn) {
      const userSavedData: IsavedData = {
        data: value,
        type: "cart"
      }
      localStorage.setItem('userData', JSON.stringify(userSavedData))
      navigate("/login")
    }

    const querySnapshot = await getDocs(
      query(
        collection(db, "UserInformation"),
        where("email", "==", userData.email)
      )
    );

    const docRef = doc(
      collection(db, "UserInformation"),
      querySnapshot.docs[0].id
    );

    const updatedWishlist = userData.wishList.filter(
      (product) => product.id !== value.id
    );
    updateDoc(docRef, {
      wishList: updatedWishlist,
    });
    dispatch(removeFromWishList(value.id));


    if (presentInCart(value.id)) {
      toast.error("Already added in cart")

    } else {
      toast.success("Successfully Added to cart")
      updateDoc(docRef, {
        cart: [...userData.cart, value],
      });
      dispatch(addToCart(value));
    }
  };

  const displayProductTile = (value: IinfoDataType) => {
    return (
      <div className="container" data-testid="showProducts">
        <div className="img">
          <img src={value.imageUrl} alt="kfaucets" className="pimage"></img>
          <div className="picons" data-testid="picons">
            <i data-testid="wishlisticon"
              className={`icon fa ${presentInWishList(value.id) ? "fa-heart" : "fa-heart-o"
                }`}
              onClick={() => addProductToWishList(value)}
            ></i>
            <i
              className="icon fa fa-eye"
              onClick={() => {
                setItemData(value);
                setPopUp(true);
              }}
            ></i>
            <i data-testid="cartIcon" className={`icon  ${presentInCart(value.id) ? "fa fa-shopping-cart" : "fa fa-cart-plus"
              }`} onClick={() => addProductToCart(value)}></i>
          </div>
        </div>
        <div className="pcontent">
          <div className="ptitle" data-testid="ptitle">{value.productName}</div>
          <div className="pcategory" data-testid="pcategory">
            {value.productCategory}:{value.productSubCategory}
          </div>
          <div className="pprice" data-testid="pprice"><i className="fa fa-rupee"></i>{value.productPrice}</div>
        </div>
      </div>
    );
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = props.list.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <div className="productTile" >

        {currentProducts.map((value: IinfoDataType, key: number) => {
          key = value.id;
          return displayProductTile(value);
        })}

        {popUp && (
          <ProductDescription closePopUp={setPopUp} itemData={itemData} />
        )}

      </div>
      <Pagination
        currentPage={currentPage}
        paginate={paginate}
        productsPerPage={productsPerPage}
        totalProducts={props.list.length}
      />

    </React.Fragment>
  );
};

export default ProductTile;
