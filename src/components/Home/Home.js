import HomeCard from "../HomeCard/HomeCard";
import HomeHero from "../HomeHero/HomeHero";
import { BsBank } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { BsPiggyBank } from "react-icons/bs";
import { GrCreditCard } from "react-icons/gr";

const InfoBanner = ({ title, message, buttonText, children }) => {
  const block = "info-banner";
  return (
    <div className={`${block}__root`}>
      <div className={`${block}__icon-wrapper`}>{children}</div>
      <h2 className={`${block}__title`}>{title}</h2>
      <p className={`${block}__message`}>{message}</p>
      <button className={`${block}__button`}>{buttonText}</button>
    </div>
  );
};

const Home = () => {
  const block = "home";

  return (
    <main className={`${block}__root`}>
      <HomeHero />
      <div className={`${block}__home-cards`}>
        <HomeCard
          title="Convenient Locations"
          message="Visit our 25+ locations around the country, experience non-existing queues, delightful customer service and expedient transactions, your money is safe in our hands!"
        >
          <BsBank size={60} />
        </HomeCard>
        <HomeCard
          title="External Transactions"
          message="Manage your money in your accounts as well as in external accounts across other banks. Your transactions are made the same-business day, regardless of amount or time!"
        >
          <GiReceiveMoney size={60} />
        </HomeCard>
        <HomeCard
          title="Pay Services"
          message="Pay your services easily with Vermilion, we interface with major businesses to automatically get your pending bills. Never get a overdue fee again!"
        >
          <GiPayMoney size={60} />
        </HomeCard>
      </div>

      <InfoBanner
        title="Design Your Card"
        message="Showcase your personality and taste with our custom credit and debit VERMILION® cards. Choose from over 1500 designs that cover all topics and interests!"
        buttonText="Create Card"
      >
        <GrCreditCard size={90} className={`${block}__icon-card`} />
      </InfoBanner>

      <div className={`${block}__comparison-cards`}></div>

      <InfoBanner
        title="Multiply Your Savings"
        message="Let your hard earned money grow with our market leading interest rates. Never before has it been easier to invest your money safely and smartly with our panel of internationally certified advisors and brokers. Let us help you reach your financial goals today!"
        buttonText="Start Saving"
      >
        <BsPiggyBank
          size={90}
          color={"white"}
          className={`${block}__icon-pig`}
        />
      </InfoBanner>
    </main>
  );
};

export default Home;
