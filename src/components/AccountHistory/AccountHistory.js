import { useContext, useState } from "react";
import useSessionState from "../../hooks/useSessionState";
import userDataContext from "../../context/UserDataContext";
import LoadingContext from "../../context/LoadingContext";
import {
  convertAccountsHistory,
  accNumberToIban,
} from "../../helpers/accounts";
import { handleDBDate } from "../../helpers/utils";
import { FaSearchDollar } from "react-icons/fa";
import {
  SmallDate,
  TransactionItem,
  TransactionList,
} from "../TransactionsList/TransactionsList";

const AccountHistory = () => {
  const { loadingModal, setLoadingModal } = useContext(LoadingContext);
  const { userData, setUserData } = useContext(userDataContext);
  const [accountTransactions, setAccountTransactions] = useState(null);
  const [isTransactionLoaded, setIsTransactionLoaded] = useState(false);
  // const [accountTransactions, setAccountTransactions] = useSessionState(
  //   "transactions",
  //   null
  // );
  const block = "account-history";

  //initialize the currently selected account by picking the customer's first
  const [currentAccount, setCurrentAccount] = useState(
    userData.accounts[0].accountNumber
  );

  const [currentLoadedAccount, setCurrentLoadedAccount] = useState(
    userData.accounts[0].accountNumber
  );

  //construct option elements with the accounts
  const optionsArray = userData?.accounts.map((acc, i) => {
    return (
      <option value={acc.accountNumber} key={acc.accountNumber}>
        {acc.iban}
      </option>
    );
  });

  const handleTransactionLoad = async () => {
    setLoadingModal(true);
    let res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/transactions/${currentAccount}`,
      {
        credentials: "include",
      }
    );
    setLoadingModal(false);
    if (res.ok) {
      const jsonRes = await res.json();
      setAccountTransactions(jsonRes);
      setCurrentLoadedAccount(currentAccount);
      setIsTransactionLoaded(true);
    } else {
      //TODO modal error
      console.error(res);
    }
  };

  const handleAccountSelection = async (e) => {
    setCurrentAccount(e.target.value);
  };

  return (
    <main className={`${block}__root`}>
      <div className={`${block}__wrapper`}>
        <div className={`${block}__container`}>
          <h1 className={`${block}__title`}>Account History</h1>
        </div>
        <div className={`${block}__container`}>
          <div className={`${block}__form`}>
            <div className={`${block}__button-wrapper`}>
              <div className={`${block}__select-wrapper`}>
                <label id="selectedAccount" className={`${block}__label`}>
                  Account:{" "}
                </label>
                <select
                  aria-labelledby="selectedAccount"
                  name="selectedAccount"
                  value={currentAccount}
                  onChange={(e) => handleAccountSelection(e)}
                  className={`${block}__select`}
                >
                  {optionsArray}
                </select>
              </div>
              <button
                className={`${block}__button`}
                onClick={() => handleTransactionLoad()}
              >
                Load Transactions
              </button>
            </div>
          </div>
        </div>
        <div className={`${block}__container--slim`}>
          {accountTransactions && isTransactionLoaded ? (
            <TransactionList
              selectedAccount={accNumberToIban(currentLoadedAccount)}
              transactions={accountTransactions}
            />
          ) : (
            <>
              <div className={`${block}__load-prompt`}>
                <div className={`${block}__load-icon`}>
                  <FaSearchDollar size={70} />
                </div>
                <span className={`${block}__load-text`}>
                  Select an account and press "Load Transactions" to see a list
                  of the account's movements.
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default AccountHistory;
