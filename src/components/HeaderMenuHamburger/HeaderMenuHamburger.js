import PropTypes from "prop-types";

const HeaderMenuHamburger = ({ isOpen, toggleHamburger }) => {
  const block = "hamburger";

  return (
    <div onClick={() => toggleHamburger()} className={`${block}__root`}>
      <span
        className={
          isOpen
            ? `${block}__slice--first open-hamburger__slice--first`
            : `${block}__slice--first`
        }
      ></span>
      <span
        className={
          isOpen
            ? `${block}__slice--second open-hamburger__slice--second`
            : `${block}__slice--second`
        }
      ></span>
      <span
        className={
          isOpen
            ? `${block}__slice--third open-hamburger__slice--third`
            : `${block}__slice--third`
        }
      ></span>
    </div>
  );
};

HeaderMenuHamburger.propTypes = {
  isOpen: PropTypes.bool,
  toggleHamburger: PropTypes.func,
};

export default HeaderMenuHamburger;
