import { Outlet } from "react-router-dom";
import UserDataContext from "./context/UserDataContext";
import TransferResultContext from "./context/TransferResultContext";
import ModalContext from "./context/ModalContext";
import LoadingContext from "./context/LoadingContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import useSessionState from "./hooks/useSessionState";
import Modal from "./components/Modal/Modal";
import LoadingModal from "./components/LoadingModal/LoadingModal";

function App() {
  // const [userData, setUserData] = useState(null);

  const [userData, setUserData] = useSessionState("userData", null);
  const [transferResult, setTransferResult] = useSessionState(
    "transferResult",
    null
  );
  const [redirect, setRedirect] = useState({
    toVerify: false,
    toResult: false,
  });
  const [modalState, setModalState] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  return (
    <>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <TransferResultContext.Provider
          value={{ transferResult, setTransferResult, redirect, setRedirect }}
        >
          <ModalContext.Provider value={{ modalState, setModalState }}>
            <LoadingContext.Provider value={{ loadingModal, setLoadingModal }}>
              <Header />
              <Outlet />
              <Footer />
              {loadingModal ? <LoadingModal /> : <Modal />}
            </LoadingContext.Provider>
          </ModalContext.Provider>
        </TransferResultContext.Provider>
      </UserDataContext.Provider>
    </>
  );
}

export default App;
