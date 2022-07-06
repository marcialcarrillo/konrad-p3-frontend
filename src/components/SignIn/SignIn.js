import { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserDataContext from "../../context/UserDataContext";
import { logInValidator } from "../../helpers/validation";
import modalContext from "../../context/ModalContext";

const SignIn = () => {
  const block = "sign-in";

  const { modalState, setModalState } = useContext(modalContext);
  const { userData, setUserData } = useContext(UserDataContext);
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
      let res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL} /login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify(rawJson),
        }
      );

      if (res.ok) {
        res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/account`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        });

        if (res.ok) {
          const jsonRes = await res.json();

          setUserData(jsonRes);
          setRedirect(true);
        } else {
          console.error(res);
        }
      } else {
        setModalState(await res.json());
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
            <label className={`${block}__label`}>Email</label>
            <input
              onChange={(e) => handleChange(e)}
              name="email"
              className={
                formErrors.email ? `${block}__input--error` : `${block}__input`
              }
            ></input>
            <p className={`${block}__helper-text`}>{formErrors.email}</p>

            <label className={`${block}__label`}>Password</label>
            <input
              onChange={(e) => handleChange(e)}
              name="password"
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
