import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Main } from "../components/Home/components/Layout/components/Main/main.styles";
import { Footer } from "../components/Layout/components/Footer/footer.styles";
import { Summary, SummaryProvider } from "../contexts/summaryContext";
import * as homePage from "../utils/homePage";
import { HomeView } from "../views/HomeView/homeView";

export const getStaticProps: GetStaticProps<Summary> = homePage.getStaticProps;

export const Home = ({
  ...summary
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <SummaryProvider value={{ ...summary }}>
      <HomeView />
    </SummaryProvider>
  );
};

Home.Footer = Footer;
Home.Main = Main;

export default Home;
