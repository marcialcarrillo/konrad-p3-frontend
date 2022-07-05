const handleDBDate = (DBDate) => {
  const date = new Date(DBDate);

  // return date.toLocaleString("en-GB", {
  //   day: "numeric",
  //   month: "numeric",
  //   year: "numeric",
  // });

  return date.toLocaleString();
};

export { handleDBDate };
