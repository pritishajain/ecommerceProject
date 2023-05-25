import React, { useState } from "react";
import "../../assets/css/contact.css";
import ContactUserPopUp from "./contact_user_popup";
import { TalkToUs, Discussion, Submit } from "../../assets/constants/constant";
import Footer from "../home_page/footer";

const Contact = () => {

  const [popUp, setPopUp] = useState<boolean>(false);
  const displayInputFields = (type: string, name: string) => {
    return (
      <div className="input-fields">
        <label>{name}</label>
        <input type={type} name={name}></input>
      </div>
    );
  };
  return (
    <React.Fragment>
      <div className="c-container">
        <h1>{TalkToUs}</h1>

        {displayInputFields("text", "name")}
        {displayInputFields("email", "email")}
        {displayInputFields("number", "number")}

        <div className="text">
          <label>{Discussion}</label><br></br>
          <textarea name="comment" placeholder="Enter text here.."></textarea>
        </div>

        <div className="submit-form">
          <button onClick={()=>setPopUp(true)}>{Submit}</button>
        </div>
        {popUp && <ContactUserPopUp closePopUp={setPopUp} />}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Contact;
