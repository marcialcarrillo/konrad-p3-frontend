import { useContext, useEffect, useState } from "react";
import modalContext from "../../context/ModalContext";
import HomeCard from "../HomeCard/HomeCard";
import HomeHero from "../HomeHero/HomeHero";
import { BsBank } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";

const Home = () => {
  const { modalState, setModalState } = useContext(modalContext);
  const [offsetY, setOffsetY] = useState(0);
  const block = "home";

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(offsetY);

  return (
    <main className={`${block}__root`}>
      <HomeHero />
      <h1
        className={`${block}__title-test`}
        style={{
          transform: `translateX(${offsetY * 0.75}px) translateY(${offsetY * 0.75}px)`,
          opacity: `${Math.max(1 - offsetY / 500, 0)}`,
        }}
      >
        This is another Title
      </h1>
      <div
        className={`${block}__home-cards`}
        style={{
          transform: `translateY(${offsetY * 0.25}px)`,
        }}
      >
        <HomeCard
          title="My Title"
          message="Please open an account with us today!"
        >
          <BsBank size={60} />
        </HomeCard>
        <HomeCard
          title="My Title"
          message="Please open an account with us today!"
        >
          <GiReceiveMoney size={60} />
        </HomeCard>
        <HomeCard
          title="My Title"
          message="Please open an account with us today!"
        >
          <GiPayMoney size={60} />
        </HomeCard>
      </div>

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
