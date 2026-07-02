import { LoadingIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/LoadingIcon/loadingIcon";
import { Tabs } from "@databiosphere/findable-ui/lib/components/common/Tabs/tabs";
import { NoResults } from "@databiosphere/findable-ui/lib/components/NoResults/noResults";
import { useRouter } from "next/router";
import { Fragment, JSX } from "react";
import { Heading } from "../../components/common/Typography/components/Heading/heading";
import { TABS } from "./common/constants";
import { Pagination } from "./components/Pagination/pagination";
import { Results } from "./components/Results/results";
import { useSearch } from "./hooks/useSearch";
import { useSearchCategory } from "./hooks/useSearchCategory";
import { StyledRoundedPaper, ViewLayout } from "./searchView.styles";

export const SearchView = (): JSX.Element | null => {
  const { isReady } = useRouter();
  const { isLoading, isSuccess, isValid, pagination, results } = useSearch();
  const { category, onChangeCategory } = useSearchCategory();
  // The search page is statically prerendered without URL query params; defer
  // all URL-driven rendering until the router has hydrated to avoid a hydration
  // mismatch between the server HTML and the first client render.
  if (!isReady) return null;
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
              <Pagination pagination={pagination} />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <StyledRoundedPaper>
          <NoResults Paper={null} title="Please enter a search term." />
        </StyledRoundedPaper>
      )}
    </ViewLayout>
  );
};
