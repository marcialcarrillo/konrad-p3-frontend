import { useContext, useState } from "react";
import Cookies from "js-cookie";
import userDataContext from "../../context/UserDataContext";

const AddMoney = () => {
  const block = "add-money";
  const { userData, setUserData } = useContext(userDataContext);

  //initialize the currently selected account by picking the customer's first
  const [currentAccount, setCurrentAccount] = useState(
    userData.accounts[0].accountNumber
  );

  const [formValues, setFormValues] = useState({
    originAccount: 0,
    transactionType: "External",
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
    if(evt.target.name === "destinationAccount"){
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

  const handleTransfer = async () => {
    const res = await fetch("http://127.0.0.1:3002/transactions", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const resJson = await res.json();

    console.log(resJson);
    setUserData(resJson);
  };

  return (
    <main>
      <h1>Add Money Page</h1>
      <label className={`${block}__label`}>Origin Account</label>
      <input
        onChange={(e) => handleChange(e)}
        name="originAccount"
        className={`${block}__input`}
      ></input>
      <p className={`${block}__helper-text`}></p>

      <label className={`${block}__label`}>Transfer Amount</label>
      <input
        onChange={(e) => handleChange(e)}
        name="transferAmount"
        className={`${block}__input`}
      ></input>
      <p className={`${block}__helper-text`}></p>

      <label className={`${block}__label`}>Destination Account</label>
      <select
        name="destinationAccount"
        id="destinationAccount"
        value={currentAccount}
        onChange={(e) => handleChange(e)}
        className={`${block}__select`}
      >
        {optionsArray}
      </select>
      <p className={`${block}__helper-text`}></p>

      <p>Available Balance: {balanceToShow} </p>

      <button onClick={() => handleTransfer()} className={`${block}__button`}>
        Submit
      </button>
    </main>
  );
};

export default AddMoney;
