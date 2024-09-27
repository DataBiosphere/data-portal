import { LAYOUT_STYLE_NO_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { GetStaticProps } from "next";
import { ContentView } from "../../components";
import { SearchView } from "../../views/SearchView/searchView";

const SearchPage = (): JSX.Element => {
  return (
    <ContentView
      content={<SearchView />}
      layoutStyle={LAYOUT_STYLE_NO_CONTRAST_LIGHTEST}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: "Search",
    },
  };
};

export default SearchPage;

SearchPage.Main = Main;
