import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/serviceApiCalls";
import { IsignUpValue } from "../../interface/signup_interface";
import { MssLogo, GetStarted, Account, SignIn } from "../../assets/constants/constant";
import "../../assets/css/signup.css";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.jpg";

const SignUp = () => {
  const initialState: IsignUpValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    common: "",
    answer: ""
  }

  const navigate = useNavigate();

  const [input, setInput] = useState<IsignUpValue>(initialState);
  const [errors, setErrors] = useState<IsignUpValue>(initialState);

  const validateInput = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "name":
        errorMessage = !value ? "Please enter name" : "";
        break;
      case "email":
        errorMessage = !value ? "Please enter email" : !validateEmail(value) ? "Invalid email format" : "";
        break;
      case "password":
        errorMessage = !value ? "Please enter Password" : (value.length < 6) ? "Password must be at least 6 characters long" : "";
        break;
      case "confirmPassword":
        errorMessage = !value ? "Please enter Confirm Password" : value !== input.password ? "Password and Confirm Password does not match" : "";
        break;
      case "answer":
        errorMessage = !value ? "Please enter security answer" : "";
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: IsignUpValue = initialState;
    let formIsValid = true;

    (Object.keys(input) as Array<keyof IsignUpValue>).forEach((key) => {
      const errorMessage = validateInput(key, input[key]);
      if (errorMessage) {
        formIsValid = false;
        newErrors[key] = errorMessage;
      }
    });

    if (formIsValid) {
      registerUser(input)
        .then((res) => {
          if (res && res.success) {
            navigate('/login');
          }
        })
        .catch((error) => {
          setErrors({ ...errors, common: error.response.data.message });
          console.log(error.response.data.message);
        });
    }
    else {
      setErrors(newErrors);
    }
  }
  const displayInputField = (type: string, name: string, value: string) => {
    return (
      <div className="input-wrap">
        <input
          type={type}
          name={name}
          value={value}
          className="input-field"
          autoComplete="off"
          placeholder={name}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="box">
        <div className="inner-box1">
          <div className="image">
            <img src={profile} alt="profile" className="img-show-1" />
          </div>

          <div className="forms-wrap">
            <form onSubmit={handleSubmit}>
              <div className="logo">
                <img src={logo} alt="logo"></img>
                <h1>{MssLogo}</h1>
              </div>

              <div className="heading">
                <h3>{GetStarted}</h3>
                <h6>
                  {Account}
                  <Link to="/login" className="toggle">
                    {SignIn}
                  </Link>
                </h6>
              </div>

              <div className="actual-form">
                {displayInputField("text", "name", input.name)}
                {errors.name && <span className="error">{errors.name}</span>}
                {displayInputField("text", "email", input.email)}
                {errors.email && <span className="error">{errors.email}</span>}
                {displayInputField("password", "password", input.password)}
                {errors.password && (<span className="error">{errors.password}</span>)}
                {displayInputField("password", "confirmPassword", input.confirmPassword)}
                {errors.confirmPassword && (<span className="error">{errors.confirmPassword}</span>)}

                <div className="input-wrap">
                  <input
                    type="text"
                    name="answer"
                    value={input.answer}
                    className="input-field"
                    autoComplete="off"
                    placeholder="Enter your first smartPhone model"
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.answer && (<span className="error">{errors.answer}</span>)}

                {errors.common && (<span className="error">{errors.common}</span>)}

                <input
                  type="submit"
                  value="Sign Up"
                  className="sign-btn"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SignUp;
