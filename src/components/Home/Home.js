import { useContext } from "react";
import modalContext from "../../context/ModalContext";
import HomeHero from "../HomeHero/HomeHero";

const Home = () => {
  const { modalState, setModalState } = useContext(modalContext);
  const block = "home";
  return (
    <main className={`${block}__root`}>
      <HomeHero />
      <div className={`${block}__best-container`}>
        <div className={`${block}__best-wrapper`}>
          <button
            onClick={() =>
              setModalState({
                title: "Login Failed",
                message:
                  "The email or password entered were incorrect, please try again.",
              })
            }
          >
            open modal
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
