import { render, screen } from "@testing-library/react";
import Account from "../../components/account_page/account";
import { IuserInfo } from "../../interface/user_data_interface";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { IS_LOGGED_IN, GET_USER_INFO } from "../../redux/action_constants";

describe("Account", () => {
  const userInfoData: IuserInfo = {
    email: "pritishajain05@gmail.com",
    fullName: "Pritisha Jain",
    cart: [],
    wishList: [],
    orderHistory: [],
  };

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Account />
      </Provider>
    );
  });

  test("present in document", () => {
    const accountElement = screen.getByTestId("account-page");
    expect(accountElement).toBeInTheDocument();
  });

  test("name of user is displayed", () => {
    act(() => {
      store.dispatch({ type: IS_LOGGED_IN, logIn: true });
      store.dispatch({ type: GET_USER_INFO, payload: userInfoData });
    });
    const accountName = screen.getByText("Pritisha Jain");
    expect(accountName).toBeInTheDocument();
  });

  test("email of user is displayed", () => {
    act(() => {
      store.dispatch({ type: IS_LOGGED_IN, logIn: true });
      store.dispatch({ type: GET_USER_INFO, payload: userInfoData });
    });
    const accountEmail = screen.getByText("pritishajain05@gmail.com");
    expect(accountEmail).toBeInTheDocument();
  });
});
