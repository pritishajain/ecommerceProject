import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { act, fireEvent, render,screen, waitFor } from "@testing-library/react";
import { IinfoDataType } from "../../interface/data_interface";
import Cart from "../../components/cart_page/cart";
import { ADD_TO_CART, EMPTY_DATA, IS_LOGGED_IN} from "../../redux/action_constants";


describe("Cart",()=>{

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
            qty: 3,
          },
        ];

    beforeEach(() => {
        render(
          <BrowserRouter>
            <Provider store={store}>
               <Cart /> 
            </Provider>
          </BrowserRouter>
        );
      });

      test("renders cart page component",()=>{
        const cartPage = screen.getByTestId("cartPage")
        expect(cartPage).toBeInTheDocument();
      })

      test("display empty cart message when cart is empty",()=>{
        act(()=>{
            store.dispatch({type:EMPTY_DATA})
        })
        
        const emptyCartMessage = screen.getByTestId('emptyCart')
       expect(emptyCartMessage).toBeInTheDocument()
       
      })

      test("display cart items when cart is not empty",() => {
        productInfoData.forEach((product) => {
          act(() => {
            store.dispatch({ type: ADD_TO_CART, productData: product });
          });
        });
        const updatedCartItems = store.getState().userDataReducer.userData.cart;
        expect(updatedCartItems.length).toBe(2);
        expect(updatedCartItems[0].id).toBe(40);
      });

      test("navigate to wishlist page when clicked on add from wishlist button",()=>{
        act(()=>{
            store.dispatch({type:IS_LOGGED_IN,logIn:true});
            store.dispatch({type:EMPTY_DATA})
        })
      
        const addfromWishlist = screen.getByTestId('addfromWishlist');
        fireEvent.click(addfromWishlist);

        expect(location.pathname).toBe('/wishlist')
       
      })

      test("clicking on place order button order confirmation page opens", () => {
        productInfoData.forEach((product) => {
            act(() => {
              store.dispatch({ type:ADD_TO_CART, productData: product });
            });
          });
        const placeOrderButton = screen.getByTestId("placeOrder");
        fireEvent.click(placeOrderButton);

        waitFor(() => {
          const orderConfirmationPage = screen.getByTestId("order-confirmation");
          expect(orderConfirmationPage).toBeInTheDocument();
        });
      });
})