import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FooterSocialsItem = ({ socialName }) => {
  const icons = require.context("../../assets/icons", true);
  return (
    <Link to="/" className="footer__icon" aria-label={socialName}>
      <img
        className="footer__icon--image"
        alt={socialName}
        src={icons(`./${socialName}.svg`)}
      />
    </Link>
  );
};

FooterSocialsItem.propTypes = {
  socialName: PropTypes.string,
};

export default FooterSocialsItem;
