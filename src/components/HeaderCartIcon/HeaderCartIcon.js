import PropTypes from "prop-types";
import cartIcon from "../../assets/icons/cart.svg";

const HeaderCartIcon = ({ itemsInCart }) => {
  const block = "header-cart";
  return (
    <div className={`${block}__root`}>
      {itemsInCart > 0 && (
        <span className={`${block}__count`}>{itemsInCart}</span>
      )}
      <img className={`${block}__icon`} src={cartIcon} alt="cart" />
    </div>
  );
};

HeaderCartIcon.propTypes = {
  itemsInCart: PropTypes.number,
};

export default HeaderCartIcon;
