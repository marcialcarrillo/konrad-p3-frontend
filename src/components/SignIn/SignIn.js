import { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserDataContext from "../../context/UserDataContext";
import LoadingContext from "../../context/LoadingContext";
import { logInValidator } from "../../helpers/validation";
import modalContext from "../../context/ModalContext";
import { customMessages } from "../../helpers/utils";

const SignIn = () => {
  const block = "sign-in";

  const { setModalState } = useContext(modalContext);
  const { setUserData } = useContext(UserDataContext);
  const { setLoadingModal } = useContext(LoadingContext);
  const [redirect, setRedirect] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  function handleChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
  }
  const [formValues, setFormValues] = useState({
    fullName: "",
    password: "",
  });

  const handleLogIn = async (e) => {
    e.preventDefault();

    //construct json object
    const rawJson = {
      email: formValues.email,
      password: formValues.password,
    };

    const errors = logInValidator(rawJson);

    if (Object.keys(errors).length === 0) {
      //no errors found on form, delete old errors
      setFormErrors(errors);
      setLoadingModal(true);
      let res;
      try {
        res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify(rawJson),
        });
      } catch {
        setLoadingModal(false);
        setModalState(customMessages.unexpected);
      }

      const resJson = await res.json();

      if (res.ok) {
        try {
          res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/users/account`,
            {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
              },
            }
          );
        } catch {
          setLoadingModal(false);
          setModalState(customMessages.unexpected);
        }
        setLoadingModal(false);
        if (res.ok) {
          const jsonRes = await res.json();

          setUserData(jsonRes);
          setRedirect(true);
        } else {
          console.error(res);
        }
      } else {
        setLoadingModal(false);
        setModalState(resJson);
      }
    } else {
      //show errors
      setFormErrors(errors);
    }
  };

  return (
    <main className={`${block}__root`}>
      {redirect && <Navigate to="/dashboard" />}
      <div className={`${block}__wrapper`}>
        <div className={`${block}__container`}>
          <form className={`${block}__form`}>
            <h1 className={`${block}__title--h1`}>Login</h1>
            <label id="email" className={`${block}__label`}>
              Email
            </label>
            <input
              aria-labelledby="email"
              onChange={(e) => handleChange(e)}
              name="email"
              className={
                formErrors.email ? `${block}__input--error` : `${block}__input`
              }
            ></input>
            <p className={`${block}__helper-text`}>{formErrors.email}</p>

            <label id="password" className={`${block}__label`}>
              Password
            </label>
            <input
              aria-labelledby="password"
              onChange={(e) => handleChange(e)}
              name="password"
              type="password"
              className={
                formErrors.password
                  ? `${block}__input--error`
                  : `${block}__input`
              }
            ></input>
            <p className={`${block}__helper-text`}>{formErrors.password}</p>
          </form>

          <div className={`${block}__button-wrapper`}>
            <button
              onClick={(e) => handleLogIn(e)}
              className={`${block}__button`}
            >
              Log In
            </button>
            <span className={`${block}__alternate-link`}>
              Don't have an account yet?
              <u>
                <Link to="/sign-up">Sign Up!</Link>
              </u>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
