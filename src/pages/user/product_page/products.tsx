import React from "react";
import { useSelector } from "react-redux";
import { Istate } from "../../../interface/reducer_interface";
import ProductView from "./product_view";
import Footer from "../../../components/footer_section/footer";
import "./product.css";

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
