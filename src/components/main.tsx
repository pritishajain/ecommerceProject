import React, { useEffect, lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { fetchSomeData } from "../redux/actions/fetch_action";
import { ToastContainer } from 'react-toastify';
import Loading from "./loading_comp/loading";
import ErrorBoundary from "./error_boundary";
import ErrorPage from "./error_page/error_page";
import AdminDashboard from "./adminDashboard";
import UserDashboard from "./userDashboard";

const SignUp = lazy(() => import('./login_signup_page/signup'));
const Login = lazy(() => import('./login_signup_page/login'));
const ForgotPassword = lazy(() => import('./login_signup_page/forgotPassword'));
const Home = lazy(()=>import('./Home'))

const Main = () => { 

  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    dispatch(fetchSomeData());

    const authData = localStorage.getItem('auth')
    if (authData) {
      const parseData = JSON.parse(authData);
      setIsAdmin(parseData.isAdmin)
    }
    // eslint-disable-next-line
  }, []);


  return (
    <React.Fragment>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/*" element = {<ErrorBoundary><Home /></ErrorBoundary>}/>
          <Route path="signup" element={<ErrorBoundary> <SignUp /> </ErrorBoundary>} />
          <Route path="login" element={<ErrorBoundary> <Login /> </ErrorBoundary>} />
          <Route path="forgot-password" element={<ErrorBoundary> <ForgotPassword /></ErrorBoundary>} />
         
        </Routes>
      </Suspense>


      <ToastContainer autoClose={1000} />
    </React.Fragment>
  );
};

export default Main;
