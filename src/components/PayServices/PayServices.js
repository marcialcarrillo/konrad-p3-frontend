import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";

const PayServices = () => {
  const block = "pay-services";
  const { userData, setUserData } = useContext(userDataContext);

  //construct an array of services for the user to pay
  const serviceElementsArray = userData.bills.map((serv) => {
    return (
      <Link className={`${block}__bill-item`} to={`${serv.id}`} key={serv.id}>
        <p>{serv.serviceName}</p>
        <p>₡{serv.amountToPay}</p>
      </Link>
    );
  });

  return (
    <main className={`${block}__root`}>
      <div className={`${block}__wrapper`}>
          <h1 className={`${block}__title--h1`}>Pay Bills</h1>
          {userData.bills.length ? (
            <>
              <p className={`${block}__title--sub`}>
                We found some bills that are available for payment
              </p>

              <div>{serviceElementsArray}</div>
            </>
          ) : (
            <p>
              You don't have any pending services for payment, check back later!
            </p>
          )}
      </div>
    </main>
  );
};

export default PayServices;
