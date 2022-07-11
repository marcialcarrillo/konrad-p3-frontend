import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingContext from "../../context/LoadingContext";
import ModalContext from "../../context/ModalContext";
import userDataContext from "../../context/UserDataContext";
import { customMessages } from "../../helpers/utils";

const LogOut = () => {
  const block = "log-out";
  const { userData, setUserData } = useContext(userDataContext);
  const { setModalState } = useContext(ModalContext);
  const { setLoadingModal } = useContext(LoadingContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    let res;
    try {
      setLoadingModal(true);
      res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, {
        credentials: "include",
      });
    } catch {
      setLoadingModal(false);
      setModalState(customMessages.unexpected);
    }
    setLoadingModal(false);
    if (res.ok) {
      setUserData(null);
    } else {
      setModalState(await res.json());
    }
  };

  if (userData) {
    return (
      <main className={`${block}__main`}>
        <div className={`${block}__root`}>
          <div className={`${block}__wrapper`}>
            <h1 className={`${block}__title--h1`}>Logging out...</h1>
            <p>Are you sure you want to log out?</p>
            <div className={`${block}__button-wrapper`}>
              <button
                onClick={() => navigate(-1)}
                className={`${block}__button-back`}
              >
                Back
              </button>
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
  } else {
    return <></>;
  }
};

export default LogOut;
