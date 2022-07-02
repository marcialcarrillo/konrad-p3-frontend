import { Outlet } from "react-router-dom";
import UserDataContext from "./context/UserDataContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);
  const [services, setServices] = useState(null);

  return (
    <>
      <UserDataContext.Provider
        value={{ userData, setUserData, services, setServices }}
      >
        <Header />
        <Outlet />
        <Footer />
      </UserDataContext.Provider>
    </>
  );
}

export default App;
