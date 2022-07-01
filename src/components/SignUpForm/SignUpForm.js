import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const SignUpForm = () => {
  const block = "sign-up-form";
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
  const [imageData, setImageData] = useState({
    imageFile: null,
    imagePreview: "",
  });

  console.log("rerendering");

  const handleImagePreview = (e) => {
    let imageAsBase64 = URL.createObjectURL(e.target.files[0]);
    let imageAsFiles = e.target.files[0];

    setImageData({
      imagePreview: imageAsBase64,
      imageFile: imageAsFiles,
    });
  };

  
  function handleChange(evt) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
  }

  const handleSignUp = async () => {
    //make the first fetch for the image
    let formData = new FormData();
    formData.append("idImage", imageData.imageFile);
    
    let res = await fetch("http://127.0.0.1:3002/uploads/", {
      method: "POST",
      body: formData
    });
    
    const resJson = await res.json();

    console.log(resJson);
    
    //save the url

    //construct the json request
    const data = {
      fullName: formValues.fullName,
      idNumber: formValues.id,
      idImage: resJson.url,
      incomeSource: formValues.sourceOfIncome,
      email: formValues.email,
      password: formValues.password,
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

    console.log("sending:", JSON.stringify(data));

    //make the second fetch to create a new user
      res = await fetch("http://127.0.0.1:3002/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(await res.json());
  };
  
  function SubmitButton() {
    return (
      <button onClick={() => handleSignUp()} className={`${block}__button`}>
        Submit
      </button>
    );
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
          name="id"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>

        <img className={`${block}__id-preview`} src={imageData.imagePreview} alt="id upload preview" />

        <label className={`${block}__label`}>ID Photo</label>
        <input
          type="file"
          onChange={(e) => handleImagePreview(e)}
          name="idPhoto"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>

        <label className={`${block}__label`}>Source of Income</label>
        <select
          name="sourceOfIncome"
          id="sourceOfIncome"
          onChange={(e) => handleChange(e)}
          className={`${block}__select`}
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
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>
        <label className={`${block}__label`}>Password</label>
        <input
          type="password"
          onChange={(e) => handleChange(e)}
          name="password"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>
        <label className={`${block}__label`}>Confirm Password</label>
        <input
          type="password"
          onChange={(e) => handleChange(e)}
          name="confirmPassword"
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

export default SignUpForm;
