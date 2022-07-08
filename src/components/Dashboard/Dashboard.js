import { useContext, useState } from "react";
import userDataContext from "../../context/UserDataContext";
import IconLink from "../IconLink/IconLink";
import { GiReceiveMoney } from "react-icons/gi";
import { BiTransfer } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AccountsSummary } from "../AccountsSummary/AccountsSummary";

const Dashboard = () => {
  const block = "dashboard";
  const { userData, setUserData } = useContext(userDataContext);

  //get customer's total balance
  const totalBalance = userData.accounts.reduce(
    (previousAccount, currentAccount) => {
      return Number(previousAccount.balance) + Number(currentAccount.balance);
    }
  );

  return (
    <main className={`${block}__root`}>
      <div className={`${block}__wrapper`}>
        <div className={`${block}__container--title`}>
          <h1 className={`${block}__title`}>Dashboard</h1>
        </div>
        <div className={`${block}__banner`}>
          <Link to="/profile">
            <img
              alt="profile"
              className={`${block}__profile-picture`}
              src={userData.profilePicture}
            ></img>
          </Link>

          <div className={`${block}__banner-name`}>
            <p className={`${block}__name`}>
              Welcome back {userData.fullName.split(" ")[0]}
            </p>
          </div>

          <div className={`${block}__banner-balance`}>
            <p className={`${block}__balance-title`}>Total Balance</p>
            <p className={`${block}__balance`}>
              ₡{Number(totalBalance).toLocaleString()}
            </p>
          </div>
        </div>

        <div className={`${block}__container`}>
          <div className={`${block}__form`}>
            <h2 className={`${block}__title--h2`}>
              What would you like to do?
            </h2>
            <div className={`${block}__links-container`}>
              <IconLink link="/add-money" linkName="Add Money">
                <GiReceiveMoney size={40} />
              </IconLink>
              <IconLink link="/money-transfer" linkName="Transfer Money">
                <BiTransfer size={40} />
              </IconLink>
              <IconLink link="/pay-services" linkName="Pay Bills">
                <MdOutlinePayment size={40} />
              </IconLink>
              <IconLink link="/account-history" linkName="Account History">
                <RiBillLine size={40} />
              </IconLink>
            </div>
          </div>
        </div>

        <div className={`${block}__container`}>
          <div className={`${block}__form`}>
            <h2 className={`${block}__title--h2`}>Your Accounts</h2>
            <AccountsSummary accounts={userData.accounts} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
