const handleDBDate = (DBDate) => {
  const date = new Date(DBDate);

  // return date.toLocaleString("en-GB", {
  //   day: "numeric",
  //   month: "numeric",
  //   year: "numeric",
  // });

  return date.toLocaleString();
};

const getSplitDate = (DBDate) => {
  const date = new Date(DBDate);

  const resultDate = {};
  resultDate.month = date.toLocaleString("default", { month: "short" });
  resultDate.day = date.toLocaleString("default", { day: "2-digit" });

  return resultDate;
};

const customMessages = {};

customMessages.unexpected = {
  name: "unexpected",
  title: "Something Went Wrong",
  message:
    "It seems we are having some technical issues on our side, please try again later.",
};

customMessages.accountCreated = {
  name: "accountCreated",
  title: "Welcome To Vermilion Bank",
  message:
    "Your account has been created successfully. Please log in to start banking!",
};

export { handleDBDate, getSplitDate, customMessages };
