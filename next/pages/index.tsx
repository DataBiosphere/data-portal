import { Main } from "../components/Home/components/Layout/components/Main/main.styles";
import { Footer } from "../components/Layout/components/Footer/footer.styles";
import { HomeView } from "../views/HomeView/homeView";
import { NextPageWithMain } from "./_app";

const Home: NextPageWithMain = () => {
  return <HomeView />;
};

Home.Footer = Footer;
Home.Main = Main;

export default Home;
