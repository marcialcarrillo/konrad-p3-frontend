import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";
import TransferResultContext from "../../context/TransferResultContext";
import TransferResult from "../TransferResult/TransferResult";

const MoneyTransfer = () => {
  const block = "money-transfer";
  const { userData, setUserData } = useContext(userDataContext);
    const { setTransferResult, redirect, setRedirect } = useContext(
      TransferResultContext
    );

  //initialize the currently selected account by picking the customer's first
  const [currentAccount, setCurrentAccount] = useState(
    userData.accounts[0].accountNumber
  );

  const [formValues, setFormValues] = useState({
    originAccount: userData.accounts[0].accountNumber,
    transactionType: "Internal",
    currency: "CRC",
    transferAmount: 0,
    destinationAccount: 0,
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
    if (evt.target.name === "originAccount") {
      setCurrentAccount(value);
    }
  }

  const handleSelectChange = (evt) => {
    const value = evt.target.value;
    setCurrentAccount(value);
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

  console.log(formValues);

  const currentAccObject = userData.accounts.find(
    (acc) => acc.accountNumber === Number(currentAccount)
  );

  //   let balanceToShow = 0;
  let balanceToShow = currentAccObject.balance;

  const handleRedirect = () => {
    setTransferResult({
      ...TransferResult,
      backlink: "/money-transfer",
      formValues: formValues,
    });

    setRedirect({
      ...redirect,
      toVerify: true,
    });
  };

  return (
    <main>
      <h1>Money Transfer Page</h1>
      <label className={`${block}__label`}>Origin Account</label>
      <select
        name="originAccount"
        id="originAccount"
        value={currentAccount}
        onChange={(e) => handleChange(e)}
        className={`${block}__select`}
      >
        {optionsArray}
      </select>
      <p className={`${block}__helper-text`}></p>

      <p>Available Balance: {balanceToShow} </p>

      <label className={`${block}__label`}>Transfer Amount</label>
      <input
        onChange={(e) => handleChange(e)}
        name="transferAmount"
        className={`${block}__input`}
      ></input>
      <p className={`${block}__helper-text`}></p>

      <label className={`${block}__label`}>Destination Account</label>
      <input
        onChange={(e) => handleChange(e)}
        name="destinationAccount"
        className={`${block}__input`}
      ></input>
      <p className={`${block}__helper-text`}></p>

      <button onClick={() => handleRedirect()} className={`${block}__button`}>
        Submit
      </button>

      {redirect.toVerify && <Navigate to="/transfer-verify" replace={true} />}
    </main>
  );
};

export default MoneyTransfer;
