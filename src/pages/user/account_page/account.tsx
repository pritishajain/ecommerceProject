import React from "react";
import { useSelector } from "react-redux";
import { FullName, Email, AccountDetails } from "../../../assets/constants/constant";
import "./account.css";
import { IuserState } from "../../../interface/reducer_interface";
import Footer from "../../../components/footer_section/footer";

const Account = () => {
  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );

  return (
    <React.Fragment>
      <div className="acc-container" data-testid="account-page">
        <h1>{AccountDetails}</h1>
        <div className="acc-details">
          <div className="acc-item">
            <span className="ahead" >{FullName}:</span>
            <span className="chead" >{userData.fullName}</span>
          </div>
          <div className="acc-item">
            <span className="ahead">{Email}:</span>
            <span className="chead">{userData.email}</span>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Account;
