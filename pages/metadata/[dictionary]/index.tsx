import { DataDictionaryView } from "../../../views/DataDictionaryView/dataDictionaryView";
import { Main } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/components/Main/main";
import { useRouter } from "next/router";

const Page = (): JSX.Element => {
  const router = useRouter();

  // Wait for the router to resolve the [dictionary] parameter in the path;
  // this is required for setting up the initial state of the corresponding
  // React Table.
  return router.isReady ? <DataDictionaryView /> : <></>;
};

Page.Main = Main;

export default Page;
