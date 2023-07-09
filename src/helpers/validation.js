const signUpValidator = (formValues) => {
  let errors = {};

  //check not empty values
  if (!formValues.fullName) {
    errors.fullName = "A name must be provided.";
  }
  if (!formValues.idNumber) {
    errors.id = "An id number must be provided.";
  }

  //check email
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
    errors.email = "A valid email address is needed.";
  }

  //check password format
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.test(
      formValues.password
    )
  ) {
    errors.password =
      "The password must be at least 8 characters, have digits, uppercase and lowercase letters.";
  }

  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = "The passwords must match.";
  }
  //

  return errors;
};

const logInValidator = (formValues) => {
  let errors = {};

  //check email
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
    errors.email = "A valid email address is needed.";
  }

  //check the password is not empty
  if (!formValues.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

const addMoneyValidator = (formValues) => {
  const minimumTransferAmount = 1000;
  let errors = {};

  if (!/^[A-Z]{2}[0-9]{20}$/.test(formValues.originAccount)) {
    errors.originAccount =
      "The account provided doesn't have the correct IBAN format.";
  }

  if (
    !formValues.transferAmount ||
    Number(formValues.transferAmount) < minimumTransferAmount
  ) {
    errors.transferAmount = `The minimum transfer amount is ₡${minimumTransferAmount}.`;
  }

  return errors;
};

const transferMoneyValidator = (formValues) => {
  const minimumTransferAmount = 1000;
  let errors = {};

  if (
    !formValues.transferAmount ||
    Number(formValues.transferAmount) < minimumTransferAmount
  ) {
    errors.transferAmount = `The minimum transfer amount is ₡${minimumTransferAmount}.`;
  }

  if (!/^[A-Z]{2}[0-9]{20}$/.test(formValues.destinationAccount)) {
    errors.destinationAccount =
      "The account provided doesn't have the correct IBAN format.";
  }

  return errors;
};

export {
  signUpValidator,
  logInValidator,
  addMoneyValidator,
  transferMoneyValidator,
};
