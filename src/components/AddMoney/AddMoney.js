import { useContext, useEffect } from "react";
import userDataContext from "../../context/UserDataContext";

const AddMoney = () => {
  const block = "add-money";
  const { userData, setUserData } = useContext(userDataContext);

  function handleChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
  }

  const [formValues, setFormValues] = useState({
    originAccount: 0,
    transactionType: "External",
    currency: "CRC",
    transferAmount: 0,
    destinationAccount: 0,
  });

  //check if the user is logged in TODO: add a localstorage state
  if (!userData) {
    return (
      <main>
        <h1>"Unauthorized"</h1>
      </main>
    );
  }

  //try to grab the user's account information
  //   try {
  //     useEffect(() => {
  //       const fetch = async () => {
  //         const res = await fetch(`http://127.0.0.1:3002/users/`, {
  //           credentials: "include",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Access-Control-Allow-Credentials": "true",
  //           },
  //         });

  //         const jsonRes = await res.json();
  //         console.log(jsonRes);
  //         setUserData(jsonRes);
  //       };
  //       fetch();
  //     }, []);
  //   } catch (e) {
  //     console.log("got error", e);
  //   }

  //construct option elements with the accounts
  const optionsArray = userData?.accounts.map((acc) => {
    <option value={acc.accountNumber} key={acc.accountNumber}>
      acc.iban
    </option>;
  });

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

      <label className={`${block}__label`}>Destination Account</label>
      <select
        name="destinationAccount"
        id="destinationAccount"
        onChange={(e) => handleChange(e)}
        className={`${block}__select`}
      >
        {optionsArray}
      </select>
      <p className={`${block}__helper-text`}></p>
    </main>
  );
};

export default AddMoney;
