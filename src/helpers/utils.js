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

export { handleDBDate, getSplitDate };
