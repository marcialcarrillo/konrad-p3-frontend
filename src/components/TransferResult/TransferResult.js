import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import userDataContext from "../../context/UserDataContext";
import TransferResultContext from "../../context/TransferResultContext";
import { convertAccounts } from "../../helpers/accounts";

const TransferResult = () => {
  const block = "transaction-result";
  const { setUserData } = useContext(userDataContext);
  const { transferResult, redirect, setRedirect } = useContext(
    TransferResultContext
  );

  console.log("re-render check");

  useEffect(() => {
    (redirect.toVerify || redirect.toResult) &&
      setRedirect({ toVerify: false, toResult: false });
    setUserData(transferResult.pendingUserData);
  }, [
    setRedirect,
    setUserData,
    redirect.toResult,
    redirect.toVerify,
    transferResult.pendingUserData,
  ]);

  //select the account to get the balance from based on the type of transaction
  // let accountToGetBalanceFrom = 0;
  // if (transferResult.formValues.transactionType === "External") {
  //   accountToGetBalanceFrom = transferResult.formValues.destinationAccount;
  // } else {
  //   accountToGetBalanceFrom = transferResult.formValues.originAccount;
  // }

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

            <p className={`${block}__label`}>Origin Account</p>
            <p className={`${block}__field`}>
              {convertedAccounts.originAccount}
            </p>

            <p className={`${block}__label`}>{transferResult.amountLabel}</p>
            <p className={`${block}__field`}>
              ₡
              {Number(
                transferResult.formValues.transferAmount
              ).toLocaleString()}
            </p>

            <p className={`${block}__label`}>
              {transferResult.destinationLabel}
            </p>
            <p className={`${block}__field`}>
              {convertedAccounts.destinationAccount}
            </p>
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
