import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, userCollection  } from "../../firebase";
import { IsignUpValue } from "../../interface/signup_interface";
import { MssLogo, GetStarted, Account, SignIn, ConfirmPassword} from "../../assets/constants/constant";
import "../../assets/css/signup.css";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.jpg";
import { addDoc } from 'firebase/firestore';
import { IuserInfo } from "../../interface/user_data_interface";


const SignUp = () => {
  const initialState: IsignUpValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const [input, setInput] = useState<IsignUpValue>(initialState);
  const [error, setError] = useState<IsignUpValue>(initialState);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleInputChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    let { name, value } = e.target;
    setInput({...input,[name]:value});
  }

  const validateInput = (e: React.FocusEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setError((error) => {
      const stateObj = { ...error, [name]: "" };
      switch (name) {
        case "name":
          if (!value) {
            stateObj[name] = "Please enter name";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Please enter email";
          } else if (!value.match("@")) {
            stateObj[name] = "Please add @ in email";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password";
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password";
          } else if (value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmission = () => {
     if ( error==null || input.name || input.email || input.password || input.confirmPassword ) {
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: input.name });

          const userData: IuserInfo = {
            email: input.email,
            fullName: input.name,
            cart: [],
            wishList: [],
            orderHistory:[],
          };

          addDoc(userCollection, userData);

          navigate("/login");
        })
        .catch((e) => {
          if (e.code === "auth/invalid-email") {
            setErrorMsg(() => "Invalid email !");
          } else if (e.code === "auth/email-already-in-use") {
            setErrorMsg(() => "Email already exists !");
          }
        });
         
    } 
  };

  const displayInputField=(type:string,name:string,value:string)=>{
    return(
      <div className="input-wrap">
      <input
        type={type}
        name={name}
        value={value}
        className="input-field"
        autoComplete="off"
        placeholder={name}
        onBlur={validateInput}
       onChange={handleInputChange}
      />
    </div>
    )
  }

  return (
    <React.Fragment>
      <div className="box">
        <div className="inner-box">
          <div className="image">
            <img src={profile} alt="profile" className="img-show-1" />
          </div>

          <div className="forms-wrap">
            <form onSubmit={(e) => e.preventDefault()}>
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
                {error.name && <span className="error">{error.name}</span>}
                {displayInputField("text", "email", input.email)}
                {error.email && <span className="error">{error.email}</span>}
                {displayInputField("password", "password", input.password)}
                {error.password && (<span className="error">{error.password}</span>)}

                <div className="input-wrap">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="input-field"
                    autoComplete="off"
                    placeholder={ConfirmPassword}
                    onBlur={validateInput}
                    onChange={handleInputChange}
                  />
                </div>
                {error.confirmPassword && (<span className="error">{error.confirmPassword}</span>)}

                <p className="error">{errorMsg}</p>
                <input
                  type="submit"
                  value="Sign Up"
                  className="sign-btn"
                  onClick={handleSubmission}
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
