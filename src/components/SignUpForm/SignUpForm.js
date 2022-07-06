import { useState } from "react";
import SimpleFileUpload from "react-simple-file-upload";

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

  const [profileData, setProfileData] = useState({
    imageFile: null,
    imagePreview: "",
  });

  const handleImagePreview = (e) => {
    let imageAsBase64 = URL.createObjectURL(e.target.files[0]);
    let imageAsFiles = e.target.files[0];

    setImageData({
      imagePreview: imageAsBase64,
      imageFile: imageAsFiles,
    });
  };

  const handleProfilePreview = (e) => {
    let imageAsBase64 = URL.createObjectURL(e.target.files[0]);
    let imageAsFiles = e.target.files[0];

    setProfileData({
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
    //make the first fetch for the imageID
    // let formDataID = new FormData();
    // formDataID.append("idImage", imageData.imageFile);

    // let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/uploads/`, {
    //   method: "POST",
    //   body: formDataID,
    // });

    // const resJson = await res.json();

    // //Get the url for the profile as well
    // let formDataProfile = new FormData();
    // formDataProfile.append("idImage", profileData.imageFile);

    // let profileUrl = await fetch(
    //   `${process.env.REACT_APP_BACKEND_URL}/uploads/`,
    //   {
    //     method: "POST",
    //     body: formDataProfile,
    //   }
    // );

    // const parsedProfileUrl = await profileUrl.json();

    //save the url

    //construct the json request
    const data = {
      fullName: formValues.fullName,
      idNumber: formValues.id,
      idImage: formValues.idImage,
      profilePicture: formValues.profilePicture,
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

    console.log("sending:", data);

    //make the second fetch to create a new user
    let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(await res.json());
  };

  function SubmitButton() {
    // return (
    //   <button onClick={() => console.log("pressed")} className={`${block}__button`}>
    //     Submit
    //   </button>
    // );
    return (
      <button onClick={() => handleSignUp()} className={`${block}__button`}>
        Submit
      </button>
    );
  }

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
        {/* <img
          className={`${block}__id-preview`}
          src={imageData.imagePreview}
          alt="id upload preview"
        />

        <label className={`${block}__label`}>ID Photo</label>
        <input
          type="file"
          onChange={(e) => handleImagePreview(e)}
          name="idPhoto"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p>

        <img
          className={`${block}__id-preview`}
          src={profileData.imagePreview}
          alt="id upload preview"
        />

        <label className={`${block}__label`}>Profile Picture</label>
        <input
          type="file"
          onChange={(e) => handleProfilePreview(e)}
          name="profilePicture"
          className={`${block}__input`}
        ></input>
        <p className={`${block}__helper-text`}></p> */}

        <label className={`${block}__label`}>ID Image</label>
        <SimpleFileUpload
          // apiKey={process.env.REACT_APP_SIMPLE_FILE_UPLOAD_KEY}
          apiKey="d803a503b020e3fb0bdab4572cabdc79"
          onSuccess={handleIdPhotoUpload}
          preview="true"
        />
        <label className={`${block}__label`}>Profile Picture</label>
        <SimpleFileUpload
          // apiKey={process.env.REACT_APP_SIMPLE_FILE_UPLOAD_KEY}
          apiKey="d803a503b020e3fb0bdab4572cabdc79"
          onSuccess={handleProfilePictureUpload}
          preview="true"
        />
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
