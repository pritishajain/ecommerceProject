import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { act, fireEvent, render,screen, waitFor } from "@testing-library/react";
import Wishlist from "../../components/wishlist_page/wishlist";
import { IinfoDataType } from "../../interface/data_interface";
import NavBar from "../../components/navbar_section/navBar";
import { ADD_TO_WISH_LIST, IS_LOGGED_IN, EMPTY_DATA} from "../../redux/action_constants";

describe("WishList",()=>{

    const productInfoData: IinfoDataType = {
      id: 40,
      imageUrl: "dkcmdkf",
      productName: "product1",
      productPrice: 200,
      productSubCategory: "kitchen",
      productCategory: "tiles",
      productDescription: "kdcnvksdvcmf",
      brand: "cera",
      qty: 1,
    };

    beforeEach(() => {
        render(
          <BrowserRouter>
            <Provider store={store}>
                <NavBar/>
               <Wishlist /> 
            </Provider>
          </BrowserRouter>
        );
      });

      test("display login message when user is not logged in", () => {
        act(()=>{
            store.dispatch({type:IS_LOGGED_IN,logIn:false});
        })
        const loginContainer = screen.getByTestId("login");
        expect(loginContainer).toBeInTheDocument();
      });

      test("display empty wishlist message when wishlist is empty",()=>{
        act(()=>{
            store.dispatch({type:IS_LOGGED_IN,logIn:true});
            store.dispatch({type:EMPTY_DATA})
        })
        const wishlistLink = screen.getByTestId('wishlist')
        fireEvent.click(wishlistLink);
        
        const emptyWishListMessage = screen.getByTestId('emptyWishlist')
       expect(emptyWishListMessage).toBeInTheDocument()
       
      })

      test("display wishlist items when wishlist is not empty",async()=>{
        act(()=>{
            store.dispatch({type:IS_LOGGED_IN,logIn:true});
            store.dispatch({type:ADD_TO_WISH_LIST,productData:productInfoData})
        })
        const wishlistLink = screen.getByTestId('wishlist')
        fireEvent.click(wishlistLink);
    
        const wishlistPage=screen.getByTestId('wishlistPage')
        expect(wishlistPage).toBeInTheDocument();

        const updatedwishListItems = store.getState().userDataReducer.userData.wishList;
        expect(updatedwishListItems.length).toBe(1);
        expect(updatedwishListItems[0].id).toBe(40);
      })

      test("navigate to products page when clicked on continue shopping button",()=>{
        act(()=>{
            store.dispatch({type:IS_LOGGED_IN,logIn:true});
            store.dispatch({type:EMPTY_DATA})
        })
        const wishlistLink = screen.getByTestId('wishlist')
        fireEvent.click(wishlistLink);
        
        const continueShop = screen.getByTestId('continueShop');
        fireEvent.click(continueShop);

        expect(location.pathname).toBe('/products')
       
      })
    
})