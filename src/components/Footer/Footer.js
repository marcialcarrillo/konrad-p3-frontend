import FooterSocialsItem from "../FooterSocialsItem/FooterSocialsItem";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const Footer = () => {
  let socials = ["pinterest", "tumbler", "instagram", "linkedin", "facebook"];

  return (
    <div className="footer__wrap">
      <footer className="footer__root">
        <div className="footer__section">
          <p className="footer__title">About Us</p>
          <ul className="footer__column">
            <li className="footer__list-item">
              <Link to="/" className="footer__link" href="#">
                Our Story
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/" className="footer__link" href="#">
                Locations
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <p className="footer__title">Get Help</p>
          <ul className="footer__column">
            <li className="footer__list-item">
              <Link to="/" className="footer__link" href="#">
                FAQ
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/" className="footer__link" href="#">
                Customer Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <p className="footer__title">Connect</p>
          <ul className="footer__column">
            <li className="footer__list-item">
              <Link to="/" className="footer__link" href="#">
                Newsletter
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/" className="footer__link" href="#">
                Fan Club
              </Link>
            </li>
          </ul>
        </div>
        <nav className="footer__socmedia" aria-label="social media links">
          {socials.map((social) => {
            return <FooterSocialsItem key={uuidv4()} socialName={social} />;
          })}
        </nav>
        <div className="footer__copyright">
          <span>© 2022 The Vermilion Bank</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
