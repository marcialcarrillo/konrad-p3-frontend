import { useState, useContext } from "react";
import userDataContext from "../../context/UserDataContext";
import HeaderMenuHamburger from "../HeaderMenuHamburger/HeaderMenuHamburger";
import { Link } from "react-router-dom";
import linkHelper from "../../helpers/navigation";

const HeaderMenu = () => {
  const block = "menu";
  const { userData } = useContext(userDataContext);
  let [isOpen, setIsOpen] = useState(false);

  const toggleHamburger = () => {
    setIsOpen((prevState) => !prevState);
  };

  //construct links to be used on the menu
  const linkConstructor = () => {
    //if user is authenticated
    if (userData) {
      const links = linkHelper.authLinks.map((item) => (
        <li key={item.key}>
          <Link
            to={item.link}
            onClick={() => toggleHamburger()}
            className={`${block}__item`}
          >
            {item.name}
          </Link>
        </li>
      ));
      return links;
    } else {
      //if user is not authenticated
      const links = linkHelper.nonAuthLinks.map((item) => (
        <li key={item.key}>
          <Link
            to={item.link}
            onClick={() => toggleHamburger()}
            className={`${block}__item`}
          >
            {item.name}
          </Link>
        </li>
      ));
      return links;
    }
  };

  return (
    <div className={`${block}__wrapper`}>
      <HeaderMenuHamburger isOpen={isOpen} toggleHamburger={toggleHamburger} />
      <ul className={isOpen ? `${block}__root--open` : `${block}__root`}>
        {linkConstructor()}
        {/* <li>
          <Link
            to="/"
            onClick={() => toggleHamburger()}
            className={`${block}__item`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/product-list"
            onClick={() => toggleHamburger()}
            className={`${block}__item`}
          >
            Product List
          </Link>
        </li>
        <li>
          <Link
            to="/cart-page"
            onClick={() => toggleHamburger()}
            className={`${block}__item`}
          >
            Cart
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default HeaderMenu;
