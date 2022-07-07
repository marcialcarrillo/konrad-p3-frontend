import { getSplitDate } from "../../helpers/utils";
import { fixTransaction } from "../../helpers/accounts";

const SmallDate = ({ date }) => {
  const block = "small-date";
  const splitDate = getSplitDate(date);
  return (
    <div className={`${block}__root`}>
      <div className={`${block}__month`}>{splitDate.month}</div>
      <div className={`${block}__day`}>{splitDate.day}</div>
    </div>
  );
};

const Description = ({
  selectedAccount,
  transactionType,
  originAccount,
  destinationAccount,
}) => {
  const block = "description";
  let title = "";
  let subTitle = "";

  if (transactionType === "Service") {
    title = destinationAccount;
    subTitle = "Bill Payment";
  } else if (originAccount === selectedAccount) {
    title = "Transfer";
    subTitle = `To: ${destinationAccount}`;
  } else {
    title = "Transfer";
    subTitle = `From: ${originAccount}`;
  }
  return (
    <div className={`${block}__root`}>
      <div className={`${block}__title`}>{title}</div>
      <div className={`${block}__subtitle`}>{subTitle}</div>
    </div>
  );
};

const Balance = ({ selectedAccount, originAccount, children }) => {
  const block = "balance";
  let type = "";
  let sign = "";
  if (originAccount === selectedAccount) {
    type = "minus";
    sign = "-";
  } else {
    type = "plus";
    sign = "+";
  }

  return (
    <div className={`${block}__root--${type}`}>{sign + "₡" + children}</div>
  );
};

const TransactionItem = ({ selectedAccount, transaction }) => {
  const block = "transaction-item";
  return (
    <li className={`${block}__root`}>
      <SmallDate date={transaction.createdAt} />
      <Description
        selectedAccount={selectedAccount}
        transactionType={transaction.transactionType}
        originAccount={transaction.originAccount}
        destinationAccount={transaction.destinationAccount}
      />
      <Balance
        selectedAccount={selectedAccount}
        originAccount={transaction.originAccount}
      >
        {Number(transaction.transferAmount).toLocaleString()}
      </Balance>
    </li>
  );
};

const TransactionList = ({
  selectedAccount,
  transactions,
  indexStart,
  indexEnd,
}) => {
  const newTransactions = transactions.map((trans) => fixTransaction(trans));

  const transactionItems = newTransactions.map((trans) => (
    <TransactionItem
      key={trans.id}
      selectedAccount={selectedAccount}
      transaction={trans}
    />
  ));

  const block = "transaction-list";
  return <ul className={`${block}__root`}>{transactionItems}</ul>;
};

export { TransactionList, TransactionItem, SmallDate };
