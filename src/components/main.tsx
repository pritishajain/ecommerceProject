import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { fetchSomeData } from "../redux/actions/fetch_action";
import { ToastContainer } from 'react-toastify';
import NavBar from "./navbar_section/navBar";
import Title from "./title_section/title";
import Footer from "./home_page/footer";
import Loading from "./loading_comp/loading";
import ErrorBoundary from "./error_boundary";
import ErrorPage from "./error_page/error_page";

const wait=(time: number)=>{
  return new Promise(resolve=>{
  setTimeout(resolve,time);
  })
}

const Home = lazy(() => import('./home_page/home'));
const SignUp = lazy(() => import('./login_signup_page/signup'));
const Login = lazy(() => import('./login_signup_page/login'));
const Products = lazy(() =>wait(1000).then(() => import("./product_page/products")));
const Wishlist = lazy(() =>  wait(1000).then(() =>import('./wishlist_page/wishlist')));
const Cart = lazy(() =>  wait(1000).then(() =>import('./cart_page/cart')));
const Contact = lazy(() => import('./contact_page/contact'));
const Account = lazy(() => import('./account_page/account'));
const OrderConfirmation = lazy(() => import('./order_page/order_confirmation'));
const OrderHistory = lazy(() => wait(1000).then(() => import('./order_page/order_history')));

const Main = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSomeData());
  }, []);
  
  
  return (
    <React.Fragment>
      <Title />
      <NavBar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ErrorBoundary> <Home /> </ErrorBoundary>} />
          <Route path="signup" element={<ErrorBoundary> <SignUp /> </ErrorBoundary>} />
          <Route path="login" element={<ErrorBoundary> <Login /> </ErrorBoundary>} />
          <Route path="products" element={ <ErrorBoundary> <Products /> </ErrorBoundary>} />
          <Route path="search/:keyword" element={<ErrorBoundary> <Products /> </ErrorBoundary>} />
          <Route path="account" element={<ErrorBoundary> <Account /> </ErrorBoundary>} />
          <Route path="wishlist" element={<ErrorBoundary> <Wishlist /> </ErrorBoundary>} />
          <Route path="cart" element={<ErrorBoundary> <Cart /> </ErrorBoundary>} />
          <Route path="contact" element={<ErrorBoundary> <Contact /> </ErrorBoundary>} />
          <Route path="orderconfirmation" element={<ErrorBoundary> <OrderConfirmation /> </ErrorBoundary>} />
          <Route path="orderhistory" element={<ErrorBoundary> <OrderHistory /> </ErrorBoundary>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </Suspense>
      

      <ToastContainer autoClose={1000} />
    </React.Fragment>
  );
};

export default Main;
