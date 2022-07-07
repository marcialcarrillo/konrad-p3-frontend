import { useContext, useState } from "react";
import userDataContext from "../../context/UserDataContext";

const Profile = () => {
  const block = "profile";
  const { userData, setUserData } = useContext(userDataContext);

  return (
    <main className={`${block}__root`}>
      <div className={`${block}__wrapper`}>
        <div className={`${block}__container`}>
          <div className={`${block}__form`}>
            <h1 className={`${block}__title`}>Profile Information</h1>
            <div className={`${block}__banner`}>
              <img
                alt="profile"
                className={`${block}__profile-picture`}
                src={userData.profilePicture}
              ></img>

              <div className={`${block}__banner-name`}>
                <p className={`${block}__name`}>{userData.fullName}</p>
                <p className={`${block}__id-number`}>{userData.idNumber}</p>
              </div>
            </div>
            <div className={`${block}__info-wrap`}>
              <p className={`${block}__label`}>Id Photo</p>
              <img
                alt="identification"
                className={`${block}__id-picture`}
                src={userData.idImage}
              ></img>
              <p className={`${block}__label`}>Source Of Income</p>
              <p>{userData.incomeSource}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
