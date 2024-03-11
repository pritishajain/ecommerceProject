import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/serviceApiCalls";
import { IforgotPasswordValue } from "../../interface/login_interface";
import { MssLogo } from "../../assets/constants/constant";
import "../../assets/css/signup.css";
import logo from "../../assets/images/logo.png";


const ForgotPassword = () => {
  const initialState: IforgotPasswordValue = {
    email: "",
    newPassword: "",
    answer: "",
    common: ""
  };

  const navigate = useNavigate();

  const [input, setInput] = useState<IforgotPasswordValue>(initialState);
  const [errors, setErrors] = useState<IforgotPasswordValue>(initialState);

  const validateInput = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "email":
        errorMessage = !value ? "Please enter email" : "";
        break;
      case "newPassword":
        errorMessage = !value ? "Please enter new Password" : (value.length < 6) ? "Password must be at least 6 characters long" : "";
        break;
      case "answer":
        errorMessage = !value ? "Please enter the secret answer" : "";
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: validateInput(name, value) });
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateInput(name, value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: IforgotPasswordValue = initialState;
    let formIsValid = true;

    (Object.keys(input) as Array<keyof IforgotPasswordValue>).forEach((key) => {
      const errorMessage = validateInput(key, input[key]);
      if (errorMessage) {
        formIsValid = false;
        newErrors[key] = errorMessage;
      }
    });

    if (formIsValid) {
      forgotPassword(input)
        .then((res) => {
          if (res && res.success) {
            navigate('/login');
          }
        })
        .catch((error) => {
          setErrors({ ...errors, common: error.response.data.message });
        });
    }
    else {
      setErrors(newErrors);
    }

  };

  const displayInputField = (type: string, name: string) => {
    return (
      <div className="input-wrap">
        <input
          type={type}
          name={name}
          className="input-field"
          autoComplete="off"
          placeholder={name}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <main>
        <div className="box">
          <div className="inner-box-f">
            <div className="forms-wrap-f">

              <form onSubmit={handleSubmit}>
                <div className="logo">
                  <img src={logo} alt="logo"></img>
                  <h1>{MssLogo}</h1>
                </div>

                <div className="heading">
                  <h3>Reset Password</h3>
                </div>

                <div className="actual-form">
                  {displayInputField("text", "email")}
                  {errors.email && <span className="error">{errors.email}</span>}
                  {displayInputField("password", "newPassword")}
                  {errors.newPassword && (<span className="error">{errors.newPassword}</span>)}

                  <div className="input-wrap">
                    <input
                      type="text"
                      name="answer"
                      className="input-field"
                      autoComplete="off"
                      placeholder="Enter your first smartPhone model"
                      onBlur={handleBlur}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.answer && (<span className="error">{errors.answer}</span>)}

                  {errors.common && (<span className="error">{errors.common}</span>)}
                  <div className="f-btns">
                    <input
                      type="submit"
                      value="Reset"
                      className="reset-btn"
                    />

                    <Link to="/login" className="back-f"><i className="fa fa-angle-left"></i> Back to Login</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ForgotPassword;
