import { Link } from "react-router-dom";
const HomeHero = () => {
  const block = "home-hero";
  return (
    <article className={`${block}__root`}>
      <div className={`${block}__image`}>
        <div className={`${block}__text-wrapper`}>
          <div className={`${block}__title`}>
            <h1 className={`${block}__title--mobile`}>
              Let Us Do The Banking, While You Do The Living.
            </h1>
            <h1 className={`${block}__title--line1`}>Let Us Do The Banking,</h1>
            <h1 className={`${block}__title--line2`}>While You Do The Living.</h1>
          </div>
          <p className={`${block}__description--line`}>
            You can rest easy knowing that VERMILION has your back, be it for
            moving money around, paying bills or checking your finances, you can
            do it all here!
          </p>
        </div>
      </div>
    </article>
  );
};

export default HomeHero;
