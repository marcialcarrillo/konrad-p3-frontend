import { Link } from "react-router-dom";
import { useContext } from "react";
import userDataContext from "../../context/UserDataContext";
import HeaderCartIcon from "../HeaderCartIcon/HeaderCartIcon";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import logo from "../../assets/icons/logo.png";
import linkHelper from "../../helpers/navigation";

const Header = () => {
  const { userData, setUserData } = useContext(userDataContext);
  const block = "header";

  // const handleLogOut = async () => {
  //   let res = await fetch("http://127.0.0.1:3002/users/logout", {
  //     credentials: "include",
  //   });
  //   setUserData(null);
  // };

  //construct links to be used on the header
  const linkConstructor = () => {
    //if user is authenticated
    if (userData) {
      const links = linkHelper.authLinks.map((item) => (
        <Link key={item.key} to={item.link} className={`${block}__link`}>
          {item.name}
        </Link>
      ));
      return links;
    } else {
      //if user is not authenticated
      const links = linkHelper.nonAuthLinks.map((item) => (
        <Link key={item.key} to={item.link} className={`${block}__link`}>
          {item.name}
        </Link>
      ));
      return links;
    }
  };

  return (
    <div className={`${block}__root`}>
      <HeaderMenu />
      <Link to="/" className={`${block}__logo`}>
        <img className={`${block}__logo`} src={logo} alt="big3 logo" />
      </Link>
      <div className={`${block}__links-wrapper`}>
        {linkConstructor()}
        {/* <Link to="/pay-services" className={`${block}__link`}>
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
        </Link> */}

        {/* <button onClick={() => handleLogOut()} className={`${block}__link`}>
          Log Out
        </button> */}
        {/* <Link to="/cart-page" className={`${block}__link--cart`}>
          <HeaderCartIcon itemsInCart={itemsInCart} />
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
