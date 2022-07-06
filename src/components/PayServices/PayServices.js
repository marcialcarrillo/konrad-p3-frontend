import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";
import { serviceIdToName, serviceIdToPrice } from "../../helpers/transfers";

const PayServices = () => {
  const block = "pay-services";
  const { userData, setUserData } = useContext(userDataContext);

  //construct an array of services for the user to pay
  const serviceElementsArray = userData.bills.map((serv) => {
    return (
      <Link to={`${serv.id}`} key={serv.id}>
        <p>{serv.serviceName}</p>
        <p>{serv.amountToPay}</p>
      </Link>
    );
  });


  return (
    <main>
      <h1>Pay Services</h1>
      {userData.bills.length ? (
        <>
          <p>
            Below are the services available for payment linked to this customer
            ID.
          </p>

          <div>{serviceElementsArray}</div>
        </>
      ) : (
        <p>
          You don't have any pending services for payment, check back later!
        </p>
      )}
    </main>
  );
};

export default PayServices;
