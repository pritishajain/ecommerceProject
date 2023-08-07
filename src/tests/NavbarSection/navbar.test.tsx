import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { fireEvent, render,screen } from "@testing-library/react";

describe("Navbar",()=>{

    beforeEach(() => {
        render(
          <BrowserRouter>
            <Provider store={store}>
            </Provider>
          </BrowserRouter>
        );
      });

      test("renders correctly", () => {
        const navContainer = screen.getByTestId("nav");
        expect(navContainer).toBeInTheDocument();
      });

      test("on clicking products in navbar route changes",()=>{
        const productLink = screen.getByTestId('product')
        fireEvent.click(productLink);
    
        expect(location.pathname).toBe('/products')
      })

      test("on clicking contacts in navbar route changes",()=>{
        const contactLink = screen.getByTestId('contact')
        fireEvent.click(contactLink);
    
        expect(location.pathname).toBe('/contact')
      })

      test("on clicking wishlist icon in navbar route changes",()=>{
        const wishlistLink = screen.getByTestId('wishlist')
        fireEvent.click(wishlistLink);
    
        expect(location.pathname).toBe('/wishlist')
      })

      test("on clicking cart icon in navbar route changes",()=>{
        const cartLink = screen.getByTestId('cart')
        fireEvent.click(cartLink);
    
        expect(location.pathname).toBe('/cart')
      })
})