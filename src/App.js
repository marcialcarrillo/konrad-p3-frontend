import { Outlet } from "react-router-dom";
import UserDataContext from "./context/UserDataContext";
import TransferResultContext from "./context/TransferResultContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import useSessionState from "./hooks/useSessionState";

function App() {
  // const [userData, setUserData] = useState(null);
  const [userData, setUserData] = useSessionState("userData", null);
  const [transferResult, setTransferResult] = useSessionState(
    "transferResult",
    null
  );
  const [redirect, setRedirect] = useState({toVerify:false,toResult:false});

  return (
    <>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <TransferResultContext.Provider
          value={{ transferResult, setTransferResult, redirect, setRedirect }}
        >
          <Header />
          <Outlet />
          <Footer />
        </TransferResultContext.Provider>
      </UserDataContext.Provider>
    </>
  );
}

export default App;
