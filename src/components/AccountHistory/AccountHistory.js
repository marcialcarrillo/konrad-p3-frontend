import { useContext, useState } from "react";
import userDataContext from "../../context/UserDataContext";
import {
  convertAccountsHistory,
} from "../../helpers/accounts";
import { handleDBDate } from "../../helpers/utils";

const AccountHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useContext(userDataContext);
  const [accountTransactions, setAccountTransactions] = useState(null);
  const block = "account-history";

  //initialize the currently selected account by picking the customer's first
  const [currentAccount, setCurrentAccount] = useState(
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
    setIsLoading(true);
    let res = await fetch(
      `http://127.0.0.1:3002/transactions/${currentAccount}`,
      {
        credentials: "include",
      }
    );
    const jsonRes = await res.json();
    setIsLoading(false);
    setAccountTransactions(jsonRes);
  };

  const handleAccountSelection = async (e) => {
    setCurrentAccount(e.target.value);
  };

  //construct transaction elements with the response gotten
  const transactionsArray = accountTransactions?.map((tran) => {
    const convertedAccounts = convertAccountsHistory(
      tran.originAccount,
      tran.destinationAccount,
      tran.transactionType
    );
    return (
      <tr key={tran.id}>
        <td>{tran.id}</td>
        <td>{convertedAccounts.originAccount}</td>
        <td>{tran.currency}</td>
        <td>{tran.transactionType}</td>
        <td>{tran.transferAmount}</td>
        <td>{handleDBDate(tran.createdAt)}</td>
        <td>{convertedAccounts.destinationAccount}</td>
      </tr>
    );
  });

  return (
    <main className={`${block}__root`}>
      <h1>Account History</h1>

      <label className={`${block}__label`}>Account: </label>
      <select
        name="selectedAccount"
        value={currentAccount}
        onChange={(e) => handleAccountSelection(e)}
        className={`${block}__select`}
      >
        {optionsArray}
      </select>

      <button onClick={() => handleTransactionLoad()}>Load Transactions</button>

      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Origin Account Number</th>
            <th>Currency</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Transaction Date</th>
            <th>Destination Account</th>
          </tr>
        </thead>
        <tbody> {transactionsArray}</tbody>
      </table>
    </main>
  );
};

export default AccountHistory;
