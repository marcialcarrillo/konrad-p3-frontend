import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <article className="home-hero__root">
      <div className="home-hero__image">
        <div className="home-hero__overlay">
          <p className="home-hero__title">The Big Three</p>
          {/* <div className="home-hero__description">
            <span className="home-hero__description--line">
              For many years, Clarke, Asimov and Heinlein
            </span>
            <span className="home-hero__description--line">
              were known as the Big 3 of Science Fiction writing
            </span>
            <span className="home-hero__description--line">
              crowned as such for their boundless creativity, unmatched prose
            </span>
            <span className="home-hero__description--line">
              and prolific tenacity. They meet here once again.
            </span>
          </div>
          <section className="home-hero__footer">
            <Link to="/" className="home-hero__button">
              <strong>Learn More</strong>
            </Link>
          </section> */}
        </div>
      </div>
    </article>
  );
};

export default HomeHero;
