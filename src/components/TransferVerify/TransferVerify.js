import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import TransferResultContext from "../../context/TransferResultContext";
import { convertAccounts } from "../../helpers/accounts";

const TransferVerify = () => {
  const block = "transfer-verify";
  const { transferResult, setTransferResult, redirect, setRedirect } =
    useContext(TransferResultContext);

  //reset redirects
  useEffect(() => {
    redirect.toVerify && setRedirect({ ...redirect, toVerify: false });
  }, [setRedirect, redirect]);

  //get the information to make the transfer with in a state (transfer Result)
  //   transferResult.formValues;

  //TODO: get the current balance from the appropriate account

  //have a method to send that information in a fetch
  //redirect after the fetch completes successfully to the result page
  const handleTransfer = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/transactions`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transferResult.formValues),
      }
    );

    if (res.ok) {
      const resJson = await res.json();

      //Construct & set transferResult for a transfer
      setTransferResult({
        ...transferResult,
        title: "Transaction Completed",
        destinationLabel: "Destination Account",
        amountLabel: "Transfer Amount",
        backlinkLabel: "Make another transfer",
        message: "The transfer has been made successfully",
        pendingUserData: resJson,
      });
      setRedirect({
        ...redirect,
        toResult: true,
      });
    } else {
      console.error(res);
    }
  };

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
            <h1 className={`${block}__title--h1`}>Verifying Transaction</h1>

            <p className={`${block}__label`}>Origin Account:</p>
            <p>{convertedAccounts.originAccount}</p>
            {/* {transferResult.formValues.transactionType === "Internal" && <p></p>} */}

            <p className={`${block}__label`}>Transfer Amount</p>
            <p>₡{transferResult.formValues.transferAmount}</p>

            <p className={`${block}__label`}>Destination Account</p>
            <p>{convertedAccounts.destinationAccount}</p>
          </form>

          <div className={`${block}__button-wrapper`}>
            <Link className={`${block}__button-back`} to="/add-money">
              Go Back
            </Link>
            <button
              tabIndex="0"
              type="submit"
              className={`${block}__button`}
              onClick={() => handleTransfer()}
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

export default TransferVerify;
