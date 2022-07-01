import { Link } from "react-router-dom";
// import ShoppingCartContext from "../../context/ShoppingCartContext";
import { useContext } from "react";
import HeaderCartIcon from "../HeaderCartIcon/HeaderCartIcon";
import logo from "../../assets/icons/logo.png";
import HeaderMenu from "../HeaderMenu/HeaderMenu";

const Header = () => {
  // const [cartContext] = useContext(ShoppingCartContext);
  const block = "header";

  const handleLogOut = async () => {    
    let res = await fetch("http://127.0.0.1:3002/users/logout", {
      credentials: "include",
    });};

  return (
    <div className={`${block}__root`}>
      <HeaderMenu />
      <Link to="/" className={`${block}__logo`}>
        <img className={`${block}__logo`} src={logo} alt="big3 logo" />
      </Link>
      <div className={`${block}__links-wrapper`}>
        <Link to="/sign-up" className={`${block}__link`}>
          Sign Up
        </Link>
        <Link to="/sign-in" className={`${block}__link`}>
          Sign In
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
