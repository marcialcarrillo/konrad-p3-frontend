import { useContext, useState } from "react";
import userDataContext from "../../context/UserDataContext";

const LogOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const block = "log-out";
  const { userData, setUserData } = useContext(userDataContext);

  const handleLogOut = async () => {
    setIsLoading(true);
    let res = await fetch("http://127.0.0.1:3002/users/logout", {
      credentials: "include",
    });
    setUserData(null);
    setIsLoading(false);
  };

  if (isLoading && !userData) {
    return (
      <main className={`${block}__root`}>
        <p>Logging you out... </p>
      </main>
    );
  } else if (!isLoading && !userData) {
    return (
      <main className={`${block}__root`}>
        <p>You are logged out</p>
      </main>
    );
  }
  if (userData) {
    return (
      <main className={`${block}__root`}>
        <p>Are you sure you want to log out?</p>
        <button>Back</button>
        <button onClick={() => handleLogOut()}>Log Out</button>
      </main>
    );
  }
};

export default LogOut;
