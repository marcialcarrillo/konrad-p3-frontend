const signUpValidator = (formValues) => {
  let errors = {};

  //check not empty values
  if (!formValues.fullName) {
    errors.fullName = "A name must be provided";
  }
  if (!formValues.idNumber) {
    errors.id = "An id number must be provided";
  }
  if (!formValues.idImage) {
    errors.idImage = "A photo of the Id must be uploaded";
  }
  if (!formValues.profilePicture) {
    errors.profilePicture = "An image of the customer must be uploaded";
  }

  //check email
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
    errors.email = "A valid email address is needed";
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
    errors.confirmPassword = "The passwords must match";
  }
  //

  return errors;
};

const logInValidator = (formValues) => {
  let errors = {};

  //check email
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) {
    errors.email = "A valid email address is needed";
  }

  //check the password is not empty
  if (!formValues.password) {
    errors.password = "Please enter a password";
  }

  return errors;
};

export { signUpValidator, logInValidator };
