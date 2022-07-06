import { useContext, useState } from "react";
import userDataContext from "../../context/UserDataContext";

const Profile = () => {
  const { userData, setUserData } = useContext(userDataContext);

  return (
    <main>
      <h1>Profile</h1>
      <p>Full Name</p>
      <p>{userData.fullName}</p>
      <p>Profile Picture</p>
      <img src={userData.profilePicture}></img>
      <p>Id Number</p>
      <p>{userData.idNumber}</p>
      <p>Id Photo</p>
      <img src={userData.idImage}></img>
      <p>Source Of Income</p>
      <p>{userData.incomeSource}</p>

    </main>
  );

};

export default Profile;
