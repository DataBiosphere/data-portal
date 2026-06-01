import { GetStaticProps, InferGetStaticPropsType } from "next";
import { JSX } from "react";
import { Main } from "../components/Home/components/Layout/components/Main/main.styles";
import { Footer } from "../components/Layout/components/Footer/footer.styles";
import { SummaryProvider } from "../contexts/summaryContext";
import { NetworkListProvider } from "../hooks/useNetworkList";
import * as homePage from "../utils/homePage";
import { HomeStaticProps } from "../utils/homePage";
import { HomeView } from "../views/HomeView/homeView";

export const getStaticProps: GetStaticProps<HomeStaticProps> =
  homePage.getStaticProps;

export const Home = ({
  networks,
  ...summary
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <NetworkListProvider value={networks}>
      <SummaryProvider value={{ ...summary }}>
        <HomeView />
      </SummaryProvider>
    </NetworkListProvider>
  );
};

Home.Footer = Footer;
Home.Main = Main;

export default Home;
