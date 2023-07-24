import { Main } from "../components/Home/components/Layout/components/Main/main.styles";
import { HomeView } from "../views/HomeView/homeView";
import { NextPageWithMain } from "./_app";

const Home: NextPageWithMain = () => {
  return <HomeView />;
};

Home.Main = Main;

export default Home;
