import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import TransferResultContext from "../../context/TransferResultContext";
import { convertAccounts } from "../../helpers/accounts";
import ModalContext from "../../context/ModalContext";
import LoadingContext from "../../context/LoadingContext";
import { customMessages } from "../../helpers/utils";

const TransferVerify = () => {
  const block = "transfer-verify";
  const { setModalState } = useContext(ModalContext);
  const { setLoadingModal } = useContext(LoadingContext);
  const { transferResult, setTransferResult, redirect, setRedirect } =
    useContext(TransferResultContext);

  //reset redirects
  useEffect(() => {
    redirect.toVerify && setRedirect({ ...redirect, toVerify: false });
  }, [setRedirect, redirect]);

  const handleTransfer = async () => {
    setLoadingModal(true);
    let res;
    try {
      res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transferResult.formValues),
      });
    } catch {
      setLoadingModal(false);
      setModalState(customMessages.unexpected);
    }
    setLoadingModal(false);
    if (res.ok) {
      const resJson = await res.json();

      //Construct & set transferResult for a transfer
      setTransferResult({
        ...transferResult,
        title: "Transaction Completed",
        destinationLabel: "Destination Account",
        amountLabel: "Transfer Amount",
        backlinkLabel: "Make another transfer",
        message: "The transfer has been made successfully.",
        pendingUserData: resJson,
      });
      setRedirect({
        ...redirect,
        toResult: true,
      });
    } else {
      setModalState(await res.json());
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

            <p className={`${block}__label`}>Origin Account</p>
            <p className={`${block}__field`}>
              {convertedAccounts.originAccount}
            </p>

            <p className={`${block}__label`}>Transfer Amount</p>
            <p className={`${block}__field`}>
              ₡
              {Number(
                transferResult.formValues.transferAmount
              ).toLocaleString()}
            </p>

            <p className={`${block}__label`}>Destination Account</p>
            <p className={`${block}__field`}>
              {convertedAccounts.destinationAccount}
            </p>
          </form>

          <div className={`${block}__button-wrapper`}>
            <Link
              className={`${block}__button-back`}
              to={transferResult.backlink}
            >
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
