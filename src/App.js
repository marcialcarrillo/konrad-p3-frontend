import { Outlet } from "react-router-dom";
// import Header from "./components/Header/Header";
// import ShoppingCartContext from "./context/ShoppingCartContext";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
