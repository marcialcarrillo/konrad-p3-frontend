import { useContext, useState } from "react";
import userDataContext from "../../context/UserDataContext";

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
        {/* <div className={`${block}__container`}>
          <h1 className={`${block}__title`}>Dashboard</h1>
        </div> */}
        <div className={`${block}__banner`}>
          <img
            alt="profile"
            className={`${block}__profile-picture`}
            src={userData.profilePicture}
          ></img>

          <div className={`${block}__banner-name`}>
            <p className={`${block}__name`}>
              {" "}
              Welcome back {userData.fullName.split(" ")[0]}
            </p>
          </div>

          <div className={`${block}__banner-balance`}>
            <p className={`${block}__balance-title`}>Total Balance</p>
            <p className={`${block}__balance`}>{totalBalance}</p>
          </div>
        </div>

        <div className={`${block}__container`}>
          <div className={`${block}__form`}></div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
