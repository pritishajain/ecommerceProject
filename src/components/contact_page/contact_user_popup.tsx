import React from "react";
import "../../assets/css/contact_user_popup.css";
import { AgentCalling, Thanks } from "../../assets/constants/constant";

const ContactUserPopUp = (props: { closePopUp: (popUp: boolean) => void }) => {
  return (
    <React.Fragment>
      <div className="cu-container">
        <div className="cu-details">
          <div className="cu-data">
            <div className="cu-content">
              <p>{AgentCalling}</p>
              <p>{Thanks}</p>
            </div>

            <div className="cu-close-btn">
              <i
                className="fa fa-close"
                onClick={() => props.closePopUp(false)}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactUserPopUp;
