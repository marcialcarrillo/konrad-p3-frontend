import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";
import TransferResultContext from "../../context/TransferResultContext";
import { findAccount, accNumberToIban, convertAccounts} from "../../helpers/accounts";

const TransferResult = () => {
  const block = "transaction-result";
  const { userData, setUserData } = useContext(userDataContext);
  const { transferResult, redirect, setRedirect } = useContext(
    TransferResultContext
  );

  useEffect(() => {
    console.log("running use effect again!");
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

  // const newBalance = findAccount(userData.accounts, accountToGetBalanceFrom);

  console.log(transferResult);

  const convertedAccounts = convertAccounts(
    transferResult.formValues.originAccount,
    transferResult.formValues.destinationAccount,
    transferResult.formValues.transactionType
  );

  return (
    <main>
      <h1>Success!</h1>
      <p>{transferResult.message}</p>

      <p>Origin Account:</p>
      <p>{convertedAccounts.originAccount}</p>

      <p>{transferResult.amountLabel}</p>
      <p>{transferResult.formValues.transferAmount}</p>

      <p>{transferResult.destinationLabel}</p>
      <p>{convertedAccounts.destinationAccount}</p>
      {/* {transferResult.formValues.transactionType === "Service" ? (
        <p>{transferResult.formValues.destinationAccount}</p>
      ) : (
        <p>{transferResult?.destinationAccountBigInt}</p>
      )} */}

      {/* <p>New balance</p>
      <p>{newBalance.balance}</p> */}

      <Link to="/dashboard">Complete</Link>
      <Link to={transferResult.backlink}>{transferResult.backlinkLabel}</Link>
    </main>
  );
};

export default TransferResult;
