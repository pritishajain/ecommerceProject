import React from "react";
import "../../assets/css/error_page.css";
import Footer from "../home_page/footer";

const ErrorPage = () => {
  return (
    <React.Fragment>
        <div className="error-page">
        <h1>Error:404</h1>
        <p>Page Not Found</p>
        </div>
        <Footer />
    </React.Fragment>
  )
};

export default ErrorPage;
