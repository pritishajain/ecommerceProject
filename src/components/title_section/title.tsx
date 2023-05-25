import React,{ useState, useEffect } from "react";
import  {useLocation, useNavigate}  from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Menu from "./menu";
import { Istate, IuserState } from "../../interface/product_reducer_interface";
import { emptyData, getUserInfo, isLoggedIn, searchFilter } from "../../redux/actions/fetch_action";
import { Profile } from "../../assets/constants/constant";
import "../../assets/css/title.css";
import logo from "../../assets/images/logo.png";
import shopName from "../../assets/images/shopName.png";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../firebase";
import { IuserInfo } from "../../interface/user_data_interface";
import { IinfoDataType } from "../../interface/data_interface";


const Title = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<string>("");
  
  const isLogIn = useSelector(
    (state: IuserState) => state.userDataReducer.isLogIn
  );

  const allProducts = useSelector((state: Istate) => state.productReducer.allProducts);
 
  useEffect(() => {
    auth.onAuthStateChanged(async(user) => {
      if (user) {
        dispatch(isLoggedIn(true));

        const q = query(collection(db,"UserInformation"), where("email","==",user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data=doc.data() as IuserInfo
          dispatch(getUserInfo(data))
        }); 
      } else {
        dispatch(isLoggedIn(false));
        dispatch(emptyData());
      }
    });
  }, []);

  const userData = useSelector(
    (state: IuserState) => state.userDataReducer.userData
  );

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(isLoggedIn(false));
      dispatch(emptyData());
    });
  };


  const filteredProducts = allProducts.filter((product:IinfoDataType) => {
    if (
      product.productName.toLowerCase().includes(searchResult) ||
      product.productCategory.toLowerCase().includes(searchResult) ||
      product.productSubCategory.toLowerCase().includes(searchResult)||
      product.brand.toLowerCase().includes(searchResult)
    ) {
      return allProducts;
    }
  });

  const showList = () => {
      navigate(`/search/${searchResult}`)
      dispatch(searchFilter(filteredProducts,true));
      setSearchResult("");
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchResult(e.target.value.toLowerCase());
  }

  if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname ==='/orderconfirmation') {
    return null;
  }

  return (
    <React.Fragment>
      <div className="head" data-testid="titleHead">
        <div className="logo-home">
          <div className="img">
            <img src={logo} alt="logo" height="60px"></img>
          </div>

          <div className="text">
            <img src={shopName} alt="ShopName" height="60px"></img>
          </div>
        </div>

        <div className="search">
          <input
            type="search"
            placeholder="Search.."
            value={searchResult}
            onChange={handleChange}
          ></input>
          <i className="fa fa-paper-plane"
            aria-hidden="true"
            data-testid="search"
            onClick={showList}
          ></i>
        </div>

        <div className="profile">
          <i className="fa fa-user" aria-hidden="true"></i>
          <div
            className="user"
            onMouseOver={() => setDropDownMenu(true)}
            onMouseLeave={() => setDropDownMenu(false)}
            data-testid="hover"
          >
            {isLogIn && userData.fullName}
            {!isLogIn && Profile}
            <i className="fa fa-caret-down"></i>
          </div>
        </div>
        {isDropDownMenu && (
          <div
            onMouseOver={() => setDropDownMenu(true)}
            onMouseLeave={() => setDropDownMenu(false)}
            data-testid="dropdown"
          >
            <Menu isLoggedIn={isLogIn} handleLogOut={handleLogOut} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Title;
