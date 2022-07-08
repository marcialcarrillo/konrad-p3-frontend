import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import SimpleFileUpload from "react-simple-file-upload";
import ModalContext from "../../context/ModalContext";
import { signUpValidator } from "../../helpers/validation";
import LoadingContext from "../../context/LoadingContext";

const SignUpForm = () => {
  const block = "sign-up-form";
  const { modalState, setModalState } = useContext(ModalContext);
  const { loadingModal, setLoadingModal } = useContext(LoadingContext);
  const [redirect, setRedirect] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    fullName: "",
    id: "",
    idPhoto: "",
    sourceOfIncome: "Employed / Salaried",
    email: "",
    zip: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
  }

  const handleSignUp = async () => {
    const data = {
      fullName: formValues.fullName,
      idNumber: formValues.id,
      idImage: formValues.idImage,
      profilePicture: formValues.profilePicture,
      incomeSource: formValues.sourceOfIncome,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      accounts: [
        {
          accountCountry: "CR",
          currency: "CRC",
        },
        {
          accountCountry: "CR",
          currency: "CRC",
        },
      ],
    };

    const errors = signUpValidator(data);

    if (Object.keys(errors).length === 0) {
      //no errors found on form, delete old errors
      setFormErrors(errors);

      //create the new user
      setLoadingModal(true);
      let res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      setLoadingModal(false);
      if (res.ok) {
        setRedirect(true);
      } else {
        setModalState(await res.json());
      }
    } else {
      //show errors
      setFormErrors(errors);
    }
  };

  function handleIdPhotoUpload(url) {
    setFormValues({
      ...formValues,
      idImage: url,
    });
  }

  function handleProfilePictureUpload(url) {
    setFormValues({
      ...formValues,
      profilePicture: url,
    });
  }

  function SubmitButton() {
    return (
      <button onClick={() => handleSignUp()} className={`${block}__button`}>
        Submit
      </button>
    );
  }

  return (
    <div className={`${block}__root`}>
      {redirect && <Navigate to="/sign-in" />}
      <h2 className={`${block}__title--h1`}>Create Your Account</h2>
      <form className={`${block}__form--delivery`}>
        <label className={`${block}__label`}>Full name</label>
        <input
          onChange={(e) => handleChange(e)}
          name="fullName"
          className={
            formErrors.fullName ? `${block}__input--error` : `${block}__input`
          }
          placeholder="John Doe"
        ></input>
        <p className={`${block}__helper-text`}>{formErrors.fullName}</p>
        <label className={`${block}__label`}>Id</label>
        <input
          onChange={(e) => handleChange(e)}
          name="id"
          className={
            formErrors.id ? `${block}__input--error` : `${block}__input`
          }
          placeholder="11234567890"
        ></input>
        <p className={`${block}__helper-text`}>{formErrors.id}</p>
        <label className={`${block}__label`}>ID Image</label>
        <SimpleFileUpload
          apiKey={process.env.REACT_APP_SIMPLE_FILE_UPLOAD_KEY}
          onSuccess={handleIdPhotoUpload}
          preview="
          true"
        />
        <p className={`${block}__helper-text`}>{formErrors.idImage}</p>
        <label className={`${block}__label`}>Profile Picture</label>
        <SimpleFileUpload
          apiKey={process.env.REACT_APP_SIMPLE_FILE_UPLOAD_KEY}
          onSuccess={handleProfilePictureUpload}
          preview="true"
        />
        <p className={`${block}__helper-text`}>{formErrors.profilePicture}</p>

        <label className={`${block}__label`}>Source of Income</label>
        <select
          name="sourceOfIncome"
          id="sourceOfIncome"
          onChange={(e) => handleChange(e)}
          className={`${block}__input`}
        >
          <option value="Employed / Salaried">Employed / Salaried</option>
          <option value="Business Owner">Business Owner</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Retired">Retired</option>
          <option value="Investor">Investor</option>
          <option value="Other">Other</option>
        </select>
        <p className={`${block}__helper-text`}></p>

        <label className={`${block}__label`}>Email</label>
        <input
          onChange={(e) => handleChange(e)}
          name="email"
          className={
            formErrors.email ? `${block}__input--error` : `${block}__input`
          }
          placeholder="joe.doe@mail.com"
        ></input>
        <p className={`${block}__helper-text`}>{formErrors.email}</p>

        <label className={`${block}__label`}>Password</label>
        <input
          type="password"
          onChange={(e) => handleChange(e)}
          name="password"
          className={
            formErrors.password ? `${block}__input--error` : `${block}__input`
          }
        ></input>
        <p className={`${block}__helper-text`}>{formErrors.password}</p>

        <label className={`${block}__label`}>Confirm Password</label>
        <input
          type="password"
          onChange={(e) => handleChange(e)}
          name="confirmPassword"
          className={
            formErrors.confirmPassword
              ? `${block}__input--error`
              : `${block}__input`
          }
        ></input>
        <p className={`${block}__helper-text`}>{formErrors.confirmPassword}</p>
      </form>

      <div className={`${block}__button-wrapper`}>
        <SubmitButton />
        <span className={`${block}__alternate-link`}>
          Already have an account?{" "}
          <u>
            <Link to="/sign-in">Log in</Link>
          </u>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
