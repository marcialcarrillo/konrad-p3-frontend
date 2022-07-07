import { Link } from "react-router-dom";
import { useContext } from "react";
import userDataContext from "../../context/UserDataContext";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import logo from "../../assets/icons/logo.png";
import linkHelper from "../../helpers/navigation";

const Header = () => {
  const { userData, setUserData } = useContext(userDataContext);
  const block = "header";

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
    <nav>
      <div className={`${block}__root`}>
        <HeaderMenu />
        <Link to="/" className={`${block}__logo`}>
          <img className={`${block}__logo`} src={logo} alt="big3 logo" />
        </Link>
        {/* <div className={`${block}__links-wrapper`}>{linkConstructor()}</div> */}
      </div>
    </nav>
  );
};

export default Header;
