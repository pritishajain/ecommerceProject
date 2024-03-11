import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterSideBar from "./filter_side_bar";
import ProductTile from "../common/product_tile";
import { addCategory, storeFilteredProducts } from "../../redux/actions/fetch_action";
import { Istate } from "../../interface/reducer_interface";
import { filterState } from "../../redux/reducers/filter_property_reducer";
import { IinfoDataType } from "../../interface/data_interface";
import kitchen from "../../assets/images/kitchen.jpg";
import bathroom from "../../assets/images/bathroom.jpg";
import livingRoom from "../../assets/images/living room.jpg";
import outdoor from "../../assets/images/outdoor.jpg";
import { Bathroom, Kitchen, NoResultFound, AllProducts, LivingRoom, Outdoor, SearchResults } from "../../assets/constants/constant";


interface filteredState {
  filterPropertyReducer: filterState;
}


const ProductView = (props: { text: string }) => {

  let product1: IinfoDataType[] = [];
  let product2: IinfoDataType[] = [];
  let product3: IinfoDataType[] = [];
  let product4: IinfoDataType[] = [];

  const [active, setActive] = useState<number>(0)

  const dispatch = useDispatch();

  const filterProducts = useSelector((state: Istate) => state.productReducer.filterProducts);
  const products = useSelector((state: Istate) => state.productReducer.products);

  const categoryName = useSelector(
    (state: filteredState) => state.filterPropertyReducer.category
  );
  const subCategoryArray = useSelector(
    (state: filteredState) => state.filterPropertyReducer.subCategory
  );
  const brandCategoryArray = useSelector(
    (state: filteredState) => state.filterPropertyReducer.brand
  );
  const maxPriceRange = useSelector(
    (state: filteredState) => state.filterPropertyReducer.maxRange
  );
  const minPriceRange = useSelector(
    (state: filteredState) => state.filterPropertyReducer.minRange
  );

  useEffect(() => {
    dispatch(addCategory("All Products"))
  }, [dispatch])

  useEffect(() => {
    if (categoryName !== "" || subCategoryArray.length > 0 || brandCategoryArray.length > 0 || minPriceRange > 0) {
      product1 = filterAccCategory(products);
      product2 = filterAccSubCategory(product1);
      product3 = filterAccBrand(product2);
      product3 = filterAccPrice(product3);

      dispatch(storeFilteredProducts(product3));

    } else {
      dispatch(storeFilteredProducts(products));
    }
  }, [categoryName, subCategoryArray, brandCategoryArray, maxPriceRange, minPriceRange]);

  const filterAccCategory = (products: IinfoDataType[]) => {
    if (categoryName !== 'All Products') {
      product1 = products.filter((value: IinfoDataType) => categoryName === value.productCategory)
      return product1;
    }
    return products;
  };

  const filterAccSubCategory = (product1: IinfoDataType[]) => {
    if (subCategoryArray.length > 0) {
      subCategoryArray.map((element: string) => {
        return product2 = [
          ...product2,
          ...product1.filter((value: IinfoDataType) => element === value.productSubCategory),
        ];
      });
      return product2;
    }
    return product1;
  };

  const filterAccBrand = (product2: IinfoDataType[]) => {
    if (brandCategoryArray.length > 0) {
      brandCategoryArray.map((element: string) => {
        return product3 = [
          ...product3,
          ...product2.filter((value: IinfoDataType) => element === value.brand),
        ];
      });
      return product3;
    }
    return product2;
  };

  const filterAccPrice = (product3: IinfoDataType[]) => {
    product4 = [
      ...product4,
      ...product3.filter(
        (value: IinfoDataType) =>
          value.productPrice >= minPriceRange &&
          value.productPrice <= maxPriceRange
      ),
    ];
    return product4;
  };

  const handleClicked = (name: string, index: number) => {
    dispatch(addCategory(name));
    setActive(index);
  };

  return (
    <React.Fragment>
      <div className="display-products" data-testid="products">
        {props.text !== "searchPage" && (
          <div className="category-container">
            <div
              className={
                active === 0 ? "active-container" : "kitchen-container"
              }
              onClick={() => handleClicked("All Products", 0)}
            >
              <h3>{AllProducts}</h3>
            </div>

            <div
              className={
                active === 1 ? "active-container" : "kitchen-container"
              }
              onClick={() => handleClicked("Kitchen", 1)}
            >
              <img src={kitchen} alt={Kitchen}></img>
              <h3>{Kitchen}</h3>
            </div>
            <div
              className={
                active === 2 ? "active-container" : "kitchen-container"
              }
              onClick={() => handleClicked("Bathroom", 2)}
            >
              <img src={bathroom} alt={Bathroom}></img>
              <h3>{Bathroom}</h3>
            </div>
            <div
              className={
                active === 3 ? "active-container" : "kitchen-container"
              }
              onClick={() => handleClicked("Livingroom", 3)}
            >
              <img src={livingRoom} alt={LivingRoom}></img>
              <h3>{LivingRoom}</h3>
            </div>
            <div
              className={
                active === 4 ? "active-container" : "kitchen-container"
              }
              onClick={() => handleClicked("Outdoor", 4)}
            >
              <img src={outdoor} alt={Outdoor}></img>
              <h3>{Outdoor}</h3>
            </div>
          </div>
        )}
        <div className="show-number">
          {props.text !== "searchPage" ? (
            <p>
              {categoryName} :{" "}
              <span className="length">{filterProducts.length} items</span>
            </p>
          ) : (
            <p>
              {" "}
              {SearchResults}:{" "}
              <span className="length">{filterProducts.length} items</span>
            </p>
          )}
        </div>

        {filterProducts.length === 0 ? (
          <h1>{NoResultFound}</h1>
        ) : (
          <div className="display-type">
            <div className="side">
              <FilterSideBar />
            </div>
            <div className="main-products">
              <ProductTile list={filterProducts} />
            </div>
          </div>
        )}
        {/* <div className="display-type">
            <div className="side">
              <FilterSideBar />
            </div>
            <div className="main-products">
              <ProductTile list={filterProducts} />
            </div>
          </div> */}

      </div>
    </React.Fragment>
  );
};

export default ProductView;
