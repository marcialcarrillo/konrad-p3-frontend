import { useContext, useState } from "react";
import userDataContext from "../../context/UserDataContext";

const LogOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const block = "log-out";
  const { userData, setUserData } = useContext(userDataContext);

  const handleLogOut = async () => {
    setIsLoading(true);
    let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, {
      credentials: "include",
    });
    setUserData(null);
    //TODO set other data to null, delete cookie?
    setIsLoading(false);
  };

  if (isLoading && !userData) {
    return (
      <main className={`${block}__root`}>
        <div className={`${block}__wrapper`}>
          <p>Logging you out... </p>
        </div>
      </main>
    );
  } else if (!isLoading && !userData) {
    return (
      <main className={`${block}__root`}>
        <div className={`${block}__wrapper`}>
          <p>You are logged out</p>
        </div>
      </main>
    );
  }
  if (userData) {
    return (
      <main className={`${block}__main`}>
        <div className={`${block}__root`}>
          <div className={`${block}__wrapper`}>
            <h1 className={`${block}__title--h1`}>Logging out...</h1>
            <p>Are you sure you want to log out?</p>
            <div className={`${block}__button-wrapper`}>
              <button className={`${block}__button-back`}>Back</button>
              <button
                className={`${block}__button`}
                onClick={() => handleLogOut()}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default LogOut;
