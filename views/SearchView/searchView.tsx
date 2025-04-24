import { LoadingIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/LoadingIcon/loadingIcon";
import { Tabs } from "@databiosphere/findable-ui/lib/components/common/Tabs/tabs";
import { NoResults } from "@databiosphere/findable-ui/lib/components/NoResults/noResults";
import { Fragment } from "react";
import { Heading } from "../../components/common/Typography/components/Heading/heading";
import { TABS } from "./common/constants";
import { Pagination } from "./components/Pagination/pagination";
import { Results } from "./components/Results/results";
import { useSearch } from "./hooks/useSearch";
import { useSearchCategory } from "./hooks/useSearchCategory";
import { ViewLayout } from "./searchView.styles";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";

export const SearchView = (): JSX.Element => {
  const { isLoading, isSuccess, isValid, onSearch, pagination, results } =
    useSearch();
  const { category, onChangeCategory } = useSearchCategory();
  return (
    <ViewLayout>
      <Heading enableAnchor={false} headingValue="Search" />
      <Tabs onTabChange={onChangeCategory} tabs={TABS} value={category} />
      {isValid ? (
        <Fragment>
          {isLoading && <LoadingIcon color="primary" fontSize="medium" />}
          {isSuccess && (
            <Fragment>
              <Results results={results} />
              <Pagination onSearch={onSearch} pagination={pagination} />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <NoResults Paper={RoundedPaper} title="Please enter a search term." />
      )}
    </ViewLayout>
  );
};
