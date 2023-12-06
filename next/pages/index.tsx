import { Main } from "../components/Home/components/Layout/components/Main/main.styles";
import { Footer } from "../components/Layout/components/Footer/footer.styles";
import { HomeView } from "../views/HomeView/homeView";
import { NextPageWithComponent } from "./_app";

const Home: NextPageWithComponent = () => {
  return <HomeView />;
};

Home.Footer = Footer;
Home.Main = Main;

export default Home;
