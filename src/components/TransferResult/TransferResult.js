import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";
import TransferResultContext from "../../context/TransferResultContext";
import {
  findAccount,
  accNumberToIban,
  convertAccounts,
} from "../../helpers/accounts";

const TransferResult = () => {
  const block = "transaction-result";
  const { userData, setUserData } = useContext(userDataContext);
  const { transferResult, redirect, setRedirect } = useContext(
    TransferResultContext
  );

  useEffect(() => {
    (redirect.toVerify || redirect.toResult) &&
      setRedirect({ toVerify: false, toResult: false });
    setUserData(transferResult.pendingUserData);
  }, [setRedirect, setUserData, redirect.toResult, redirect.toVerify]);

  //select the account to get the balance from based on the type of transaction
  let accountToGetBalanceFrom = 0;
  if (transferResult.formValues.transactionType === "External") {
    accountToGetBalanceFrom = transferResult.formValues.destinationAccount;
  } else {
    accountToGetBalanceFrom = transferResult.formValues.originAccount;
  }

  const convertedAccounts = convertAccounts(
    transferResult.formValues.originAccount,
    transferResult.formValues.destinationAccount,
    transferResult.formValues.transactionType
  );

  return (
    <main className={`${block}__root`}>
      <div className={`${block}__wrapper`}>
        <div className={`${block}__container`}>
          <form className={`${block}__form`}>
            <h1 className={`${block}__title--h1`}>{transferResult.title}</h1>
            <p className={`${block}__title--sub`}>{transferResult.message}</p>

            <p className={`${block}__label`}>Origin Account:</p>
            <p>{convertedAccounts.originAccount}</p>

            <p className={`${block}__label`}>{transferResult.amountLabel}</p>
            <p>₡{transferResult.formValues.transferAmount}</p>

            <p className={`${block}__label`}>
              {transferResult.destinationLabel}
            </p>
            <p>{convertedAccounts.destinationAccount}</p>
          </form>
          <div className={`${block}__button-wrapper`}>
            <Link className={`${block}__button`} to="/dashboard">
              Complete
            </Link>
            <Link
              className={`${block}__alternate-link`}
              to={transferResult.backlink}
            >
              <u>{transferResult.backlinkLabel}</u>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TransferResult;
