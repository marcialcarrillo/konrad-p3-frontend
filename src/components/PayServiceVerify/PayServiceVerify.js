import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";
import TransferResultContext from "../../context/TransferResultContext";
import LoadingContext from "../../context/LoadingContext";
import ModalContext from "../../context/ModalContext";
import { customMessages } from "../../helpers/utils";

const PayServicesVerify = () => {
  const block = "pay-service-verify";
  const { service } = useParams();
  const { userData } = useContext(userDataContext);
  const { setTransferResult, redirect, setRedirect } = useContext(
    TransferResultContext
  );
  const { setModalState } = useContext(ModalContext);
  const { setLoadingModal } = useContext(LoadingContext);

  //initialize the currently selected account by picking the customer's first
  const [currentAccount, setCurrentAccount] = useState(
    userData.accounts[0].accountNumber
  );

  const currentService = userData.bills.find(
    (item) => item.id === Number(service)
  );

  const [formValues, setFormValues] = useState({
    originAccount: currentAccount,
    transactionType: "Service",
    currency: "CRC",
    transferAmount: currentService.amountToPay,
    destinationAccount: currentService.serviceName,
  });

  function handleAccChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      originAccount: value,
    });
    setCurrentAccount(value);
  }

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

  const makeTransfer = async () => {
    try {
      setLoadingModal(true);
      let res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/transactions`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      setLoadingModal(false);
      if (res.ok) {
        const resJson = await res.json();

        //Construct transferResult for a service payment
        const tResult = {
          formValues: formValues,
          title: "Payment Complete",
          destinationLabel: "Service Paid",
          amountLabel: "Amount Paid",
          backlink: "/pay-services",
          backlinkLabel: "Pay another service",
          message: "The service selected has been paid successfully.",
          pendingUserData: resJson,
        };

        setTransferResult(tResult);
        setRedirect({
          ...redirect,
          toResult: true,
        });
      } else {
        setModalState(await res.json());
      }
    } catch {
      setLoadingModal(false);
      setModalState(customMessages.unexpected);
    }
  };

  return (
    <main className={`${block}__root`}>
      <div className={`${block}__wrapper`}>
        <div className={`${block}__container`}>
          <form className={`${block}__form`}>
            <h1 className={`${block}__title`}>
              Paying {currentService.serviceName}
            </h1>

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
            <p className={`${block}__label`}>Available Balance</p>
            <p className={`${block}__field`}>
              ₡{Number(balanceToShow).toLocaleString()}
            </p>
            <p className={`${block}__label`}>Service Payment</p>
            <p className={`${block}__field`}>
              ₡{Number(currentService.amountToPay).toLocaleString()}
            </p>
          </form>
          <div className={`${block}__button-wrapper`}>
            <Link className={`${block}__button-back`} to="/pay-services">
              Go Back
            </Link>
            <button
              className={`${block}__button`}
              onClick={() => makeTransfer()}
            >
              Confirm
            </button>
          </div>
          {redirect.toResult && (
            <Navigate to="/transaction-result" replace={true} />
          )}
        </div>
      </div>
    </main>
  );
};

export default PayServicesVerify;
