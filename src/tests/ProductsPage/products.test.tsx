import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { act,  fireEvent, render, screen,} from "@testing-library/react";
import { IinfoDataType } from "../../interface/data_interface";
import Products from "../../pages/user/product_page/products";
import { IS_LOGGED_IN, FETCH_DATA_SUCCESS } from "../../redux/action_constants";


describe("Product", () => {
  const productInfoData: IinfoDataType[] = [
    {
      id: 40,
      imageUrl: "dkcmdkf",
      productName: "product1",
      productPrice: 200,
      productSubCategory: "kitchen",
      productCategory: "tiles",
      productDescription: "kdcnvksdvcmf",
      brand: "cera",
      qty: 1,
    },
    {
      id: 41,
      imageUrl: "dkcmdkfcdfvc",
      productName: "product2",
      productPrice: 300,
      productSubCategory: "bathroom",
      productCategory: "shower",
      productDescription: "kdcnvksdvcmfvfdv",
      brand: "hindware",
      qty: 1,
    },
  ];

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Products />
        </Provider>
      </BrowserRouter>
    );
  });

  test("renders product page", () => {
    const productContainer = screen.getByTestId("products");
    expect(productContainer).toBeInTheDocument();
  });

  test("renders products which are added", () => {
    act(() => {
      store.dispatch({ type: FETCH_DATA_SUCCESS, payload: productInfoData });
    });

    const showProducts = screen.getAllByTestId("showProducts");

    showProducts.forEach((product) => {
      expect(product).toBeInTheDocument();
    });
  });

  test("renders those products which is added", () => {
    act(() => {
      store.dispatch({ type: FETCH_DATA_SUCCESS, payload: productInfoData });
    });

    const updatedProductsIList = store.getState().productReducer.allProducts;
    expect(updatedProductsIList.length).toBe(2);
    expect(updatedProductsIList[0].id).toBe(40);
    expect(updatedProductsIList[1].id).toBe(41);
  });

  test("renders product image",()=>{
    const productImage = screen.getAllByAltText("kfaucets");
    productImage.forEach((product) => {
        expect(product).toBeInTheDocument();
      });
  })

  test("renders product title",()=>{
    const productTitle= screen.getAllByTestId("ptitle");
    productTitle.forEach((product) => {
        expect(product).toBeInTheDocument();
      });
  })

  test("renders product category",()=>{
    const productCategory = screen.getAllByTestId("pcategory");
    productCategory.forEach((product) => {
        expect(product).toBeInTheDocument();
      });
  })

  test("renders product price",()=>{
    const productPrice = screen.getAllByTestId("pprice");
    productPrice.forEach((product) => {
        expect(product).toBeInTheDocument();
      });
  })

  test("renders icons on product image",()=>{
    const productIcons = screen.getAllByTestId("picons");
    productIcons.forEach((product) => {
        expect(product).toBeInTheDocument();
      });
  })

  test("if user not logged then on clicking wishlist icon route to login page", () => {
    act(() => {
      store.dispatch({ type: IS_LOGGED_IN, logIn: false });
    });

    const wishlistIcon = screen.getAllByTestId("wishlisticon")[0];
    fireEvent.click(wishlistIcon);

    expect(location.pathname).toBe('/login');
  });

  test("if user not logged then on clicking cart icon route to login page", () => {
    act(() => {
      store.dispatch({ type: IS_LOGGED_IN, logIn: false });
    });

    const cartIcon = screen.getAllByTestId("cartIcon")[0];
    fireEvent.click(cartIcon);

    expect(location.pathname).toBe('/login');
  });

});
