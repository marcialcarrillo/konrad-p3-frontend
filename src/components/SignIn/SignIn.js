import { Link } from "react-router-dom";
import { useState } from "react";
// import SingUpForm from "../SingUPForm/SingUpForm";

const SignIn = () => {
  const block = "sign-in";

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

    let res = await fetch("http://127.0.0.1:3002/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawJson),
    });

    const jsonRes = await res.json();
    console.log(jsonRes.token);
  };

  return (
    <main className={`${block}__root`}>
      <div className={`${block}__container`}>
        <h2 className={`${block}__title--h2`}>Login Page</h2>
        <form className={`${block}__form--delivery`}>
          <label className={`${block}__label`}>Email</label>
          <input
            onChange={(e) => handleChange(e)}
            name="email"
            className={`${block}__input`}
          ></input>
          <p className={`${block}__helper-text`}></p>

          <label className={`${block}__label`}>Password</label>
          <input
            onChange={(e) => handleChange(e)}
            name="password"
            className={`${block}__input`}
          ></input>
          <p className={`${block}__helper-text`}></p>
          <button onClick={(e) => handleLogIn(e)}>Log In</button>
        </form>
        <span>
          Don't have an account yet? <Link to="/sign-up">Sign Up!</Link>
        </span>
      </div>
    </main>
  );
};

export default SignIn;
