import { Link } from "react-router-dom";
import { useState } from "react";

const CheckoutDeliveryInfo = () => {
  const block = "sing-up-form";
  const [formValues, setFormValues] = useState({
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    pla: "",
    plae: "",
    plac: "",
  });

  function SubmitButton() {
    if (
      formValues.fullName &&
      formValues.line1 &&
      formValues.line2 &&
      formValues.city &&
      formValues.state &&
      formValues.zip &&
      formValues.pla &&
      formValues.plae &&
      formValues.plac
    ) {
      return (
        <Link to="/process-payment" className={`${block}__button`}>
          Make Purchase
        </Link>
      );
    } else {
      return (
        <button disabled className={`${block}__button`}>
          Fill out your information
        </button>
      );
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
  }

  return (
    <div className={`${block}__root`}>
      <h2 className={`${block}__title--h2`}>1. Sign up</h2>
      <form className={`${block}__form--delivery`}>
        <label className={`${block}__label`}>Full name</label>
        <input
          onChange={(e) => handleChange(e)}
          name="fullName"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>
        <label className={`${block}__label`}>Id</label>
        <input
          onChange={(e) => handleChange(e)}
          name="Id"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>
        <label className={`${block}__label`}>ID Photo</label>
        <input
          type="file"
          onChange={(e) => handleChange(e)}
          name="ID Photo"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>
        <label className={`${block}__label`}>Source of Income</label>
        <select name="sourceOfIncome" id="sourceOfIncome">
          <option value="Employed / Salaried">Employed / Salaried</option>
          <option value="Business Owner">Business Owner</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Retired">Retired</option>
          <option value="Investor">Investor</option>
          <option value="Other">Other</option>
        </select>

        {/* <input
          onChange={(e) => handleChange(e)}
          name="city"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p> */}
        <label className={`${block}__label`}>Email</label>
        <input
          onChange={(e) => handleChange(e)}
          name="state"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>
        <label className={`${block}__label`}>Password</label>
        <input
          onChange={(e) => handleChange(e)}
          name="zip"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>
        <label className={`${block}__label`}>Confirm Password</label>
        <input
          onChange={(e) => handleChange(e)}
          name="zip"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>
      </form>
      
      <div className={`${block}__button-wrapper`}>
        <SubmitButton />
      </div>
    </div>
  );
};

export default CheckoutDeliveryInfo;
