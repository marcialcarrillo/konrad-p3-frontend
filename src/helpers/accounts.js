/* global BigInt */

const ibanToAccNumber = (iban) => {
  const slicedIban = iban.slice(2);
  //TODO: use env variables
  const account = BigInt(slicedIban) - BigInt(41015201001092741156);
  return Number(account);
};

const accNumberToIban = (accNumber) => {
  //TODO: use env variables
  const account = BigInt(accNumber) + BigInt(41015201001092741156);
  const iban = `CR${account}`;
  return iban;
};

const findAccount = (accountsArray, accountNumber) => {
  return accountsArray.find((acc) => acc.accountNumber === Number(accountNumber));
}

const convertAccountsHistory = (originAccount, destAccount, transactionType) => {
  let newOriginAccount = originAccount;
  let newDestAccount = destAccount;
  if(transactionType !== "External") {
    newOriginAccount = accNumberToIban(originAccount);
  }
  if(transactionType !== "Service")
  {
    newDestAccount = accNumberToIban(destAccount);
  }

  return {
    originAccount: newOriginAccount,
    destinationAccount: newDestAccount,
  };
}

const convertAccounts = (
  originAccount,
  destAccount,
  transactionType
) => {
  let newOriginAccount = originAccount;
  let newDestAccount = destAccount;
  if (transactionType !== "External") {
    newOriginAccount = accNumberToIban(originAccount);
  }
  if (transactionType === "External") {
    newDestAccount = accNumberToIban(destAccount);
  }

  return {
    originAccount: newOriginAccount,
    destinationAccount: newDestAccount,
  };
};

export {
  ibanToAccNumber,
  accNumberToIban,
  findAccount,
  convertAccountsHistory,
  convertAccounts,
};
