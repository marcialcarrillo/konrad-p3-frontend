const HomeCard = ({ title, message, children }) => {
  const block = "home-card";

  return (

      <div className={`${block}__root`}>
        <div className={`${block}__icon-wrapper`}>{children}</div>
        <div className={`${block}__text-wrapper`}>
          <h2 className={`${block}__title`}>{title}</h2>
          <p className={`${block}__message`}>{message}</p>
        </div>
      </div>
  );
};

export default HomeCard;
