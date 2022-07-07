import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const IconLink = ({ link, linkName, children }) => {
  const block = "icon-link";
  return (
    <Link to={link} className={`${block}__root`}>
      <div className={`${block}__icon-wrapper`}>{children}</div>
      <span className={`${block}__text`}>{linkName}</span>
    </Link>
  );
};

IconLink.propTypes = {
  link: PropTypes.string,
  linkName: PropTypes.string,
};

export default IconLink;
