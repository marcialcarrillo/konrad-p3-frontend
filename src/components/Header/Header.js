import { Link } from "react-router-dom";
// import ShoppingCartContext from "../../context/ShoppingCartContext";
import { useContext } from "react";
import HeaderCartIcon from "../HeaderCartIcon/HeaderCartIcon";
import logo from "../../assets/icons/logo.png";
import HeaderMenu from "../HeaderMenu/HeaderMenu";

const Header = () => {
  // const [cartContext] = useContext(ShoppingCartContext);
  const block = "header";

  // let itemsInCart = [...cartContext].reduce(
  //   (acc, current) => acc + Number(current.productQuantity),
  //   0
  // );

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
        {/* <Link to="/cart-page" className={`${block}__link--cart`}>
          <HeaderCartIcon itemsInCart={itemsInCart} />
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
