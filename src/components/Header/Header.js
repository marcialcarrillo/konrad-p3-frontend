import { Link } from "react-router-dom";
import { useContext } from "react";
import userDataContext from "../../context/UserDataContext";
import HeaderCartIcon from "../HeaderCartIcon/HeaderCartIcon";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import logo from "../../assets/icons/logo.png";

const Header = () => {
  const { setUserData } = useContext(userDataContext);
  const block = "header";

  const handleLogOut = async () => {
    let res = await fetch("http://127.0.0.1:3002/users/logout", {
      credentials: "include",
    });
     setUserData(null);
  };

  return (
    <div className={`${block}__root`}>
      <HeaderMenu />
      <Link to="/" className={`${block}__logo`}>
        <img className={`${block}__logo`} src={logo} alt="big3 logo" />
      </Link>
      <div className={`${block}__links-wrapper`}>
        <Link to="/pay-services" className={`${block}__link`}>
          Pay Services
        </Link>
        <Link to="/money-transfer" className={`${block}__link`}>
          Money Xfer
        </Link>
        <Link to="/add-money" className={`${block}__link`}>
          Add Money
        </Link>
        <Link to="/sign-up" className={`${block}__link`}>
          Sign Up
        </Link>
        <Link to="/sign-in" className={`${block}__link`}>
          Log In
        </Link>
        <button onClick={() => handleLogOut()} className={`${block}__link`}>
          Log Out
        </button>
        {/* <Link to="/cart-page" className={`${block}__link--cart`}>
          <HeaderCartIcon itemsInCart={itemsInCart} />
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
