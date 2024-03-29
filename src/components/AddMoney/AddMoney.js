import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";
import TransferResultContext from "../../context/TransferResultContext";
import TransferResult from "../TransferResult/TransferResult";
import { addMoneyValidator } from "../../helpers/validation";

const AddMoney = () => {
  const block = "add-money";
  const { userData } = useContext(userDataContext);
  const [formErrors, setFormErrors] = useState({});
  const { setTransferResult, redirect, setRedirect } = useContext(
    TransferResultContext
  );

  //initialize the currently selected account by picking the customer's first
  const [currentAccount, setCurrentAccount] = useState(
    userData.accounts[0].accountNumber
  );

  const [formValues, setFormValues] = useState({
    originAccount: 0,
    transactionType: "External",
    currency: "CRC",
    transferAmount: 0,
    destinationAccount: userData.accounts[0].accountNumber,
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
    if (evt.target.name === "destinationAccount") {
      setCurrentAccount(value);
    }
  }

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

  const currentAccObject = userData.accounts.find(
    (acc) => acc.accountNumber === Number(currentAccount)
  );

  let balanceToShow = currentAccObject.balance;

  const handleRedirect = () => {
    const errors = addMoneyValidator(formValues);

    if (Object.keys(errors).length === 0) {
      setFormErrors(errors);
      setTransferResult({
        ...TransferResult,
        backlink: "/add-money",
        formValues: formValues,
      });

      setRedirect({
        ...redirect,
        toVerify: true,
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <main className={`${block}__root`}>
      <div className={`${block}__wrapper`}>
        <div className={`${block}__container`}>
          <form className={`${block}__form`}>
            <h1 className={`${block}__title--h1`}>Add Money</h1>
            <label id="originAccount" className={`${block}__label`}>
              Origin Account
            </label>
            <input
              aria-labelledby="originAccount"
              onChange={(e) => handleChange(e)}
              name="originAccount"
              className={`${block}__input`}
            ></input>
            <p className={`${block}__helper-text`}>
              {formErrors.originAccount}
            </p>

            <label id="transferAmount" className={`${block}__label`}>
              Transfer Amount
            </label>
            <input
              onChange={(e) => handleChange(e)}
              name="transferAmount"
              type="number"
              aria-labelledby="transferAmount"
              className={`${block}__input`}
            ></input>
            <p className={`${block}__helper-text`}>
              {formErrors.transferAmount}
            </p>

            <label id="destinationAccount" className={`${block}__label`}>
              Destination Account
            </label>
            <select
              aria-labelledby="destinationAccount"
              name="destinationAccount"
              value={currentAccount}
              onChange={(e) => handleChange(e)}
              className={`${block}__input`}
            >
              {optionsArray}
            </select>
            <p className={`${block}__helper-text`}></p>

            <p className={`${block}__label`}>Current Balance:</p>
            <p className={`${block}__field`}>
              {" "}
              ₡{Number(balanceToShow).toLocaleString()}{" "}
            </p>
          </form>
          <div className={`${block}__button-wrapper`}>
            <button
              onClick={() => handleRedirect()}
              className={`${block}__button`}
            >
              Submit
            </button>
          </div>

          {redirect.toVerify && (
            <Navigate to="/transfer-verify" replace={true} />
          )}
        </div>
      </div>
    </main>
  );
};

export default AddMoney;
