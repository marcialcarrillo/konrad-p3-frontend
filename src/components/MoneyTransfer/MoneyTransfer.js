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

  //construct option elements with the accounts
  const optionsArray = userData?.accounts.map((acc, i) => {
    return (
      <option value={acc.accountNumber} key={acc.accountNumber}>
        {acc.iban}
      </option>
    );
  });

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
    <main className={`${block}__root`}>
      <div className={`${block}__wrapper`}>
        <div className={`${block}__container`}>
          <form className={`${block}__form`}>
            <h1 className={`${block}__title--h1`}>Transfer Money</h1>
            <label id="originAccount" className={`${block}__label`}>
              Origin Account
            </label>
            <select
              aria-labelledby="originAccount"
              name="originAccount"
              value={currentAccount}
              onChange={(e) => handleChange(e)}
              className={`${block}__input`}
            >
              {optionsArray}
            </select>
            <p className={`${block}__helper-text`}></p>

            <p className={`${block}__label`}>Available Balance:</p>
            <p className={`${block}__field`}> ₡{Number(balanceToShow).toLocaleString()} </p>

            <label id="transferAmount" className={`${block}__label`}>
              Transfer Amount
            </label>
            <input
              aria-labelledby="transferAmount"
              onChange={(e) => handleChange(e)}
              name="transferAmount"
              className={`${block}__input`}
            ></input>
            <p className={`${block}__helper-text`}></p>

            <label id="destinationAccount" className={`${block}__label`}>
              Destination Account
            </label>
            <input
              aria-labelledby="destinationAccount"
              onChange={(e) => handleChange(e)}
              name="destinationAccount"
              className={`${block}__input`}
            ></input>
            <p className={`${block}__helper-text`}></p>

            {redirect.toVerify && (
              <Navigate to="/transfer-verify" replace={true} />
            )}
          </form>
          <div className={`${block}__button-wrapper`}>
            <button
              onClick={() => handleRedirect()}
              className={`${block}__button`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MoneyTransfer;
