import { useState } from "react";
import HeaderMenuHamburger from "../HeaderMenuHamburger/HeaderMenuHamburger";
import { Link } from "react-router-dom";

const HeaderMenu = () => {
  const block = "menu";
  let [isOpen, setIsOpen] = useState(false);

  const toggleHamburger = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={`${block}__wrapper`}>
      <HeaderMenuHamburger isOpen={isOpen} toggleHamburger={toggleHamburger} />
      <ul className={isOpen ? `${block}__root--open` : `${block}__root`}>
        <li>
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
        </li>
      </ul>
    </div>
  );
};

export default HeaderMenu;
