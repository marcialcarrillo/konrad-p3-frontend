import HomeHero from "../HomeHero/HomeHero";

const Home = () => {
  const block = "home";
  return (
    <main className={`${block}__root`}>
      <HomeHero />
      <div className={`${block}__best-container`}>
        <div className={`${block}__best-wrapper`}>
          <h2 className={`${block}__best-title`}>Our Best Sellers</h2>
        </div>
      </div>
    </main>
  );
};

export default Home;
