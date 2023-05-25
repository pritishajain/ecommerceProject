import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IloginValue } from "../../interface/login_interface";
import { MssLogo, WelcomeBack, NotRegistered, SignUp, ErrorFields} from "../../assets/constants/constant";
import "../../assets/css/signup.css";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { IuserState } from "../../interface/product_reducer_interface";
import { IinfoDataType } from "../../interface/data_interface";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { addToCart, addToWishList } from "../../redux/actions/fetch_action";

const Login = () => {
  const state: IloginValue = {
    email: "",
    password: "",
  };
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState<IloginValue>(state);
  const [errorMsg, setErrorMsg] = useState<string>("");
 
  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );
  
  const handleInputChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    let { name, value } = e.target;
    setInput({...input,[name]:value});
  }

  interface IsavedData{
    data:IinfoDataType,
    type:string
  } 

  const handleSubmission = () => {
    if (!input.email || !input.password) {
      setErrorMsg(ErrorFields);
      return;
    }
    setErrorMsg("");

     signInWithEmailAndPassword(auth, input.email, input.password)
      .then(async() =>{
       
        const querySnapshot = await getDocs(
          query(
            collection(db, "UserInformation"),
            where("email", "==", userData.email)
          )
        );
    
        const docRef = doc(
          collection(db, "UserInformation"),
          querySnapshot.docs[0].id
        );

        const userSavedData: IsavedData = JSON.parse(localStorage.getItem("userData") || "{}");

        if (userSavedData.type === "wishList") {
          if (userSavedData.data.id !== 0) {
            updateDoc(docRef, {
              wishList: [...userData.wishList, userSavedData.data],
            });
            dispatch(addToWishList(userSavedData.data));
          }
          navigate("/wishlist");
          localStorage.removeItem("userData");

        } else if (userSavedData.type === "cart") {
          if (userSavedData.data.id !== 0) {
            updateDoc(docRef, { cart: [...userData.cart, userSavedData.data] });
            dispatch(addToCart(userSavedData.data));
          }
          navigate("/cart");
          localStorage.removeItem("userData");

        } else if(userSavedData.type ==="orders"){
          navigate("/orderhistory");
          localStorage.removeItem("userData");
        }
        else {
          navigate("/");
        }   
      })
      .catch((e) => {
        if(e.code === 'auth/user-not-found')
        {
          setErrorMsg(()=>("User not found !"));
        }
        else if(e.code === 'auth/wrong-password')
        {
          setErrorMsg(()=>("Wrong password !"));
        }
      }) 
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

              <form onSubmit={(e) => e.preventDefault()}>
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
                  {displayInputField("text","email")}
                  {displayInputField("password","password")}
                  <p className="error">{errorMsg}</p>
                  
                  <input
                    type="submit"
                    value="Sign In"
                    className="sign-btn"
                    onClick={handleSubmission}
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
