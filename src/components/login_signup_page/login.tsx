import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/serviceApiCalls";
import { IloginValue } from "../../interface/login_interface";
import { MssLogo, WelcomeBack, NotRegistered, SignUp } from "../../assets/constants/constant";
import "./signup.css";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.jpg";
import { isLoggedIn } from "../../redux/actions/fetch_action";
import { useDispatch } from 'react-redux';

const Login = () => {
  const initialState: IloginValue = {
    email: "",
    password: "",
    common: ""
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState<IloginValue>(initialState);
  const [errors, setErrors] = useState<IloginValue>(initialState);

  const validateInput = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "email":
        errorMessage = !value ? "Please enter email" : "";
        break;
      case "password":
        errorMessage = !value ? "Please enter Password" : "";
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
    const newErrors: IloginValue = initialState;
    let formIsValid = true;

    (Object.keys(input) as Array<keyof IloginValue>).forEach((key) => {
      const errorMessage = validateInput(key, input[key]);
      if (errorMessage) {
        formIsValid = false;
        newErrors[key] = errorMessage;
      }
    });

    if (formIsValid) {
      loginUser(input)
        .then((res) => {
          if (res && res.success) {
            const authData = {
              token: res.token,
              user: {
                name: res.data.name,
                email: res.data.email
              },
              isAdmin: res.isAdmin
            }
            dispatch(isLoggedIn(authData))
            localStorage.setItem("auth", JSON.stringify(authData))
            // res.isAdmin ? navigate('/admin') : navigate('/'); 
            navigate("/")
            
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
          <div className="inner-box">
            <div className="forms-wrap">

              <form onSubmit={handleSubmit}>
                <div className="logo">
                  <img src={logo} alt="logo"></img>
                  <h1>{MssLogo}</h1>
                </div>

                <div className="heading">
                  <h3>{WelcomeBack}</h3>
                  <h6>
                    {NotRegistered}
                    <Link to="/signup" className="toggle">
                      {SignUp}
                    </Link>
                  </h6>
                </div>

                <div className="actual-form">
                  {displayInputField("text", "email")}
                  {errors.email && <span className="error">{errors.email}</span>}
                  {displayInputField("password", "password")}
                  {errors.password && (<span className="error">{errors.password}</span>)}

                  {errors.common && (<span className="error">{errors.common}</span>)}
                  <div style={{ position: "relative", padding: "10px" }}>
                    <Link to="/forgot-password" className="forgotP">Forgot Password ?</Link>
                  </div>
                  <input
                    type="submit"
                    value="Sign In"
                    className="sign-btn"
                  />
                </div>
              </form>
            </div>

            <div className="image">
              <img src={profile} alt="profile" className="img-show-1" />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Login;
