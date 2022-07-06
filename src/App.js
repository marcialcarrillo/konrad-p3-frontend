import { Outlet } from "react-router-dom";
import UserDataContext from "./context/UserDataContext";
import TransferResultContext from "./context/TransferResultContext";
import ModalContext from "./context/ModalContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import useSessionState from "./hooks/useSessionState";
import Modal from "./components/Modal/Modal";

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

  return (
    <>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <TransferResultContext.Provider
          value={{ transferResult, setTransferResult, redirect, setRedirect }}
        >
          <ModalContext.Provider value={{ modalState, setModalState }}>
            <Header />
            <Outlet />
            <Footer />
            <Modal />
          </ModalContext.Provider>
        </TransferResultContext.Provider>
      </UserDataContext.Provider>
    </>
  );
}

export default App;
