import { Provider } from "react-redux";
import store from "../../redux/store";
import Title from "../../components/title_section/title";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { IuserInfo } from "../../interface/user_data_interface";
import { IS_LOGGED_IN, GET_USER_INFO } from "../../redux/action_constants";


describe("Title", () => {

    const userInfoData:IuserInfo={
        email: "pritishajain05@gmail.com",
        fullName: "Pritisha Jain",
        cart: [],
        wishList:[],
        orderHistory:[]
    }

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Title />
        </Provider>
      </BrowserRouter>
    );
  });

  test("renders correctly", () => {
    const titleContainer = screen.getByTestId("titleHead");
    expect(titleContainer).toBeInTheDocument();
  });

  test("logo rendering",()=>{
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  })

  test("shopName rendering",()=>{
    const shopName = screen.getByAltText('ShopName');
    expect(shopName).toBeInTheDocument();
  })

  test("display user's name when logged in", () => {
    act(()=>{
        store.dispatch({type:IS_LOGGED_IN,logIn:true});
        store.dispatch({type:GET_USER_INFO,payload:userInfoData});
    })
    const userNameElement=screen.getByText("Pritisha Jain");
    expect(userNameElement).toBeInTheDocument();
  });

  test("dropdown visible on hover",()=>{
    const profile = screen.getByTestId('hover')
    fireEvent.mouseOver(profile);
  
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  })

  test("login dropdown menu is visible if user is logged in",()=>{
    act(()=>{
        store.dispatch({type:IS_LOGGED_IN,logIn:true});
    })

    const profile = screen.getByTestId('hover')
    fireEvent.mouseOver(profile);
    expect(screen.getByTestId('login-dropdown')).toBeInTheDocument();
  })

  test("logout dropdown menu is visible if user is logged out",()=>{
    act(()=>{
        store.dispatch({type:IS_LOGGED_IN,logIn:false});
    })

    const profile = screen.getByTestId('hover')
    fireEvent.mouseOver(profile);
    expect(screen.getByTestId('logout-dropdown')).toBeInTheDocument();
  })

  test("on clicking search button route change",()=>{
    const searchLink = screen.getByTestId('search')
    fireEvent.click(searchLink);

    expect(location.pathname).toBe('/search/')
  })

  test("on clicking login btn in dropdown menu route changes", () => {
    act(() => {
      store.dispatch({ type: IS_LOGGED_IN, logIn: false });
    });

    const profile = screen.getByTestId("hover");
    fireEvent.mouseOver(profile);

    const loginButton = screen.getByTestId("loginbtn");
    fireEvent.click(loginButton);

    expect(location.pathname).toBe("/login");
  });
});
