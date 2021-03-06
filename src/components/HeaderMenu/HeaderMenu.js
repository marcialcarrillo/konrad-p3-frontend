import { useState, useContext, useEffect } from "react";
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

  useEffect(() => {
    !isOpen
      ? document.body.classList.remove("no-scroll")
      : document.body.classList.add("no-scroll");
  }, [isOpen]);

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
      </ul>
    </div>
  );
};

export default HeaderMenu;
