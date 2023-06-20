import { SectionBioNetworkAtlases } from "../../components/Home/components/SectionBioNetworkAtlases/sectionBioNetworkAtlases";
import { SectionHero } from "../../components/Home/components/SectionHero/sectionHero";

export const HomeView = (): JSX.Element => {
  return (
    <>
      <SectionHero />
      <SectionBioNetworkAtlases />
    </>
  );
};
