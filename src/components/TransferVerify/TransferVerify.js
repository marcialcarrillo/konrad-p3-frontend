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

  console.log(transferResult.formValues);
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

    const resJson = await res.json();

    console.log(resJson);

    //Construct & set transferResult for an external transfer
    setTransferResult({
      ...transferResult,
      //   destinationAccountBigInt: accNumberToIban(
      //     transferResult.formValues.destinationAccount
      //   ),
      destinationLabel: "Destination Account",
      amountLabel: "Transfer Amount",
      backlinkLabel: "Make another transfer",
      message: "The transfer has been made",
      pendingUserData: resJson,
    });
    setRedirect({
      ...redirect,
      toResult: true,
    });
  };

  const convertedAccounts = convertAccounts(
    transferResult.formValues.originAccount,
    transferResult.formValues.destinationAccount,
    transferResult.formValues.transactionType
  );

  console.log("converted accs: ", convertedAccounts);

  return (
    <main>
      <h1>Verifying transaction</h1>

      <p>Origin Account:</p>
      <p>{convertedAccounts.originAccount}</p>
      {/* {transferResult.formValues.transactionType === "Internal" && <p></p>} */}

      <p>Transfer Amount</p>
      <p>{transferResult.formValues.transferAmount}</p>

      <p>Destination Account</p>
      <p>{convertedAccounts.destinationAccount}</p>

      <Link to="/add-money">Go Back</Link>
      <button onClick={() => handleTransfer()}>Confirm</button>

      {redirect.toResult && (
        <Navigate to="/transaction-result" replace={true} />
      )}
    </main>
  );
};

export default TransferVerify;
