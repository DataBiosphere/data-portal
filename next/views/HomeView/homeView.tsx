import { SectionDivider } from "../../components/Home/components/Section/section.styles";
import { SectionBioNetworkAtlases } from "../../components/Home/components/SectionBioNetworkAtlases/sectionBioNetworkAtlases";
import { SectionHero } from "../../components/Home/components/SectionHero/sectionHero";
import { SectionStayUpToDate } from "../../components/Home/components/SectionStayUpToDate/sectionStayUpToDate";

export const HomeView = (): JSX.Element => {
  return (
    <>
      <SectionHero />
      <SectionBioNetworkAtlases />
      <SectionDivider />
      <SectionStayUpToDate />
    </>
  );
};
