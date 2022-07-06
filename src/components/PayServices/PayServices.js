import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";
import { serviceIdToName, serviceIdToPrice } from "../../helpers/transfers";

const PayServices = () => {
  const block = "pay-services";
  const { userData, setUserData } = useContext(userDataContext);

  console.log(userData);

  //initialize the currently selected account by picking the customer's first
  const [currentAccount, setCurrentAccount] = useState(
    userData.accounts[0].accountNumber
  );

  //initialize the currently selected account by picking the customer's first
  //TODO handle no services scenario
  const [currentService, setCurrentService] = useState(userData.bills[0].id);

  const [formValues, setFormValues] = useState({
    originAccount: currentAccount,
    transactionType: "Service",
    currency: "CRC",
    transferAmount: serviceIdToPrice(userData.bills, currentService),
    destinationAccount: serviceIdToName(userData.bills, currentService),
  });

  //check if the service doesn't exist anymore (just paid?)
  const match = userData.bills.find(
    (serv) => Number(serv.id) === Number(currentService)
  );
  if (currentService === null) {
    //user has no services to work with, display a message for now
    return (
      <main>
        <h1>User has no services to pay</h1>
      </main>
    );
  }

  console.log(
    "current acc is: ",
    currentAccount,
    "current service is: ",
    currentService
  );

  function handleAccChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      ["originAccount"]: value,
    });
    setCurrentAccount(value);
  }

  console.log("re-rendering!");

  const handleServiceChange = (evt) => {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      ["transferAmount"]: serviceIdToPrice(userData.bills, value),
      ["destinationAccount"]: serviceIdToName(userData.bills, value),
    });
    setCurrentService(value);
  };

  //check if the user is logged in TODO: add a localstorage state
  if (!userData) {
    return (
      <main>
        <h1>"Unauthorized"</h1>
      </main>
    );
  }

  //construct an array of services for the user to pay
  const serviceElementsArray = userData.bills.map((serv) => {
    return (
      <Link to={`${serv.id}`} key={serv.id}>
        <p>{serv.serviceName}</p>
        <p>{serv.amountToPay}</p>
      </Link>
    );
  });

  console.log(formValues);

  const currentAccObject = userData.accounts.find(
    (acc) => acc.accountNumber === Number(currentAccount)
  );

  let balanceToShow = currentAccObject.balance;

  const currentServiceObj = userData.bills.find(
    (serv) => serv.id === Number(currentService)
  );

  let amountToPayForService = currentServiceObj.amountToPay;

  const handleTransfer = async () => {
    const billToPay = userData.bills.find((bill) => bill.id === currentService);

    //construct payload to send in the fetch request
    // const payload = {
    //   originAccount: currentAccount,
    //   transactionType: "Service",
    //   currency: "CRC",
    //   transferAmount: billToPay.amountToPay,
    //   destinationAccount: billToPay.serviceName,
    // };

    let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    let resJson = await res.json();

    if (resJson.services.length <= 0) {
      //user has no services to work with
      setCurrentService(null);
    } else {
      //grab the first one and use it
      setCurrentService(userData.bills[0].id);
    }

    setUserData(resJson);
  };

  //construct a list of services?

  return (
    <main>
      <h1>Pay Services</h1>
      {currentService ?
      <>
        <p>
          Below are the services available for payment linked to this customer
          ID.
        </p>

        <div>{serviceElementsArray}</div>
      </>
      :
      <p>You don't have any pending services for payment, check back later!</p>}

    </main>
  );
};

export default PayServices;
