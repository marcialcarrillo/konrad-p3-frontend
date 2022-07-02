import { render } from "@testing-library/react";
import { useContext, useState } from "react";
import userDataContext from "../../context/UserDataContext";
import { serviceIdToName, serviceIdToPrice } from "../../helpers/transfers";

const PayServices = () => {
  const block = "pay-services";
  const { userData, setUserData, services, setServices } =
    useContext(userDataContext);

  console.log(userData);

  //initialize the currently selected account by picking the customer's first
  const [currentAccount, setCurrentAccount] = useState(
    userData.accounts[0].accountNumber
  );

  //initialize the currently selected account by picking the customer's first
  //TODO handle no services scenario
  const [currentService, setCurrentService] = useState(userData.services[0].id);

  const [formValues, setFormValues] = useState({
    originAccount: currentAccount,
    transactionType: "Service",
    currency: "CRC",
    transferAmount: serviceIdToPrice(userData.services, currentService),
    destinationAccount: serviceIdToName(userData.services, currentService),
  });

  //check if the service doesn't exist anymore (just paid?)
  const match = userData.services.find(
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
  //set services

  // //load services if we don't have any yet
  // if (!userData.services) {
  //   const fetchServices = async () => {
  //     const res = await fetch("http://127.0.0.1:3002/bills/", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const jsonRes = await res.json();
  //     return jsonRes;
  //   };

  //   const res = await fetchServices();

  //   setUserData({
  //     ...userData,
  //     ["services"]: res,
  //   });
  // }

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
      ["transferAmount"]: serviceIdToPrice(userData.services, value),
      ["destinationAccount"]: serviceIdToName(userData.services, value),
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

  //construct option elements with the accounts
  const optionsArray = userData?.accounts.map((acc, i) => {
    return (
      <option value={acc.accountNumber} key={acc.accountNumber}>
        {acc.iban}
      </option>
    );
  });

  //construct an array of services for the user to pay
  const optionsServicesArray = userData?.services.map((serv) => {
    return (
      <option value={serv.id} key={serv.id}>
        {serv.serviceName}
      </option>
    );
  });
  console.log(formValues);

  const currentAccObject = userData.accounts.find(
    (acc) => acc.accountNumber === Number(currentAccount)
  );

  let balanceToShow = currentAccObject.balance;

  const currentServiceObj = userData.services.find(
    (serv) => serv.id === Number(currentService)
  );

  let amountToPayForService = currentServiceObj.amountToPay;

  const handleTransfer = async () => {
    const billToPay = userData.services.find(
      (bill) => bill.id === currentService
    );

    //construct payload to send in the fetch request
    // const payload = {
    //   originAccount: currentAccount,
    //   transactionType: "Service",
    //   currency: "CRC",
    //   transferAmount: billToPay.amountToPay,
    //   destinationAccount: billToPay.serviceName,
    // };

    let res = await fetch("http://127.0.0.1:3002/transactions", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    let resJson = await res.json();

    //inject user services
    res = await fetch("http://127.0.0.1:3002/bills/", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const services = await res.json();

    resJson["services"] = services;

    if (services.length <= 0) {
      //user has no services to work with
      setCurrentService(null);
    } else {
      //grab the first one and use it
      setCurrentService(services[0].id);
    }

    setUserData(resJson);
  };

  return (
    <main>
      <h1>Pay Services Page</h1>
      <label className={`${block}__label`}>Origin Account</label>
      <select
        name="originAccount"
        id="originAccount"
        value={currentAccount}
        onChange={(e) => handleAccChange(e)}
        className={`${block}__select`}
      >
        {optionsArray}
      </select>
      <p className={`${block}__helper-text`}></p>

      <p>Available Balance: {balanceToShow} </p>

      <label className={`${block}__label`}>Service To Pay</label>
      <select
        name="destinationAccount"
        id="destinationAccount"
        value={currentService}
        onChange={(e) => handleServiceChange(e)}
        className={`${block}__select`}
      >
        {optionsServicesArray}
      </select>
      <p>Bill Amount: {amountToPayForService} </p>

      <button onClick={() => handleTransfer()} className={`${block}__button`}>
        Submit
      </button>
    </main>
  );
};

export default PayServices;
