import React from "react";
import { useSelector } from "react-redux";
import { Istate } from "../../interface/product_reducer_interface";
import ProductView from "./product_view";
import "../../assets/css/product.css";
import Footer from "../home_page/footer";

const Products = () => {
  
  const searchPage = useSelector(
    (state: Istate) => state.productReducer.isSearching
  );

  return (
    <React.Fragment>
      <ProductView text={searchPage ? "searchPage" : "products"} />
      <Footer />
    </React.Fragment>
  );
};

export default Products;
