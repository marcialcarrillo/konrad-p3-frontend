import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";
import TransferResultContext from "../../context/TransferResultContext";

const PayServicesVerify = () => {
  const block = "pay-services-verify";
  const { service } = useParams();
  const { userData, setUserData } = useContext(userDataContext);
  const { setTransferResult, redirect, setRedirect } = useContext(
    TransferResultContext
  );

  //initialize the currently selected account by picking the customer's first
  const [currentAccount, setCurrentAccount] = useState(
    userData.accounts[0].accountNumber
  );

  //   console.log(userData);

  const currentService = userData.bills.find(
    (item) => item.id === Number(service)
  );

  //   console.log(currentService);

  const [formValues, setFormValues] = useState({
    originAccount: currentAccount,
    transactionType: "Service",
    currency: "CRC",
    transferAmount: currentService.amountToPay,
    destinationAccount: currentService.serviceName,
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleAccChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      ["originAccount"]: value,
    });
    setCurrentAccount(value);
  }

  //   console.log(formValues);

  //construct option elements with the accounts
  const optionsArray = userData?.accounts.map((acc, i) => {
    return (
      <option value={acc.accountNumber} key={acc.accountNumber}>
        {acc.iban}
      </option>
    );
  });

  //
  const currentAccObject = userData.accounts.find(
    (acc) => acc.accountNumber === Number(currentAccount)
  );

  let balanceToShow = currentAccObject.balance;

  console.log(formValues);

  const makeTransfer = async () => {
    try {
      let res = await fetch("http://127.0.0.1:3002/transactions", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const resJson = await res.json();

      //   setUserData(resJson);

      //Construct transferResult for a service payment
      const tResult = {
        formValues: formValues,
        destinationLabel: "Service Paid",
        amountLabel: "Amount Paid",
        backlink: "/pay-services",
        backlinkLabel: "Pay another service",
        message: "The service selected has been paid correctly",
        pendingUserData: resJson,
      };

      console.log(tResult);

      setTransferResult(tResult);
              setRedirect({
                ...redirect,
                toResult: true,
              });
    } catch (e) {
      //TODO: show modal with error
    }

    //TODO: check if error on response, show modal on error
  };

  return (
    <main>
      <h1>Currently Paying {currentService.serviceName}</h1>

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
      <p>Available Balance</p>
      <p>{balanceToShow}</p>
      <p>Service Payment</p>
      <p>{currentService.amountToPay}</p>

      <Link to="/pay-services">Go Back</Link>
      <button onClick={() => makeTransfer()}>Confirm</button>

      {redirect.toResult && <Navigate to="/transaction-result" replace={true} />}
    </main>
  );
};

export default PayServicesVerify;
