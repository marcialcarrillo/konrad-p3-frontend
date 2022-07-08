import { MdOutlineSavings } from "react-icons/md";
import { accNumberToIban } from "../../helpers/accounts";

const AccountsItem = ({ account }) => {
  const block = "accounts-item";
  return (
    <li className={`${block}__root`}>
      <div className={`${block}__type-wrapper`}>
        <span className={`${block}__type-text`}>Savings</span>
      </div>
      <button
        onClick={(e) => {
          navigator.clipboard.writeText(e.target.innerText);
        }}
        className={`${block}__acc-number`}
      >
        {accNumberToIban(account.accountNumber)}
      </button>
      <div className={`${block}__status`}>CRC</div>
      <div className={`${block}__balance`}>
        ₡{Number(account.balance).toLocaleString()}
      </div>
    </li>
  );
};

const AccountsSummary = ({ accounts }) => {
  const block = "accounts-summary";
  const accountItems = accounts.map((account) => {
    return <AccountsItem key={account.accountNumber} account={account} />;
  });

  return (
    <>
      <div className={`${block}__headers`}>
        <div className={`${block}__type`}>Type</div>
        <div className={`${block}__acc-number`}>Account Number</div>
        <div className={`${block}__currency`}>Currency</div>
        <div className={`${block}__balance`}>Balance</div>
      </div>
      <ul className={`${block}__root`}>{accountItems}</ul>
    </>
  );
};

export { AccountsSummary };
