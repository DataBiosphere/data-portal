import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { Fragment } from "react";
import { BICCNPublication } from "../../../../../../../@types/network";
import {
  useNetwork,
  useNetworkContent,
} from "../../../../../../../contexts/networkContext";
import { MDXSection } from "../../../../../../common/Section/section.styles";
import { Outline } from "./components/Outline/outline";
import { Publication } from "./components/Publication/publication";
import {
  BackPageContentSingleColumn,
  StyledTypography,
  Publications,
} from "./mainColumn.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export const MainColumn = (): JSX.Element => {
  const { network } = useNetwork();
  const { Publication: Overview } = useNetworkContent();
  const { BICCNPublications } = network;
  const publicationsByCategory = getPublicationsByCategory(BICCNPublications);
  const categoryIdByCategory = getCategoryIdByCategory(publicationsByCategory);
  return (
    <BackPageContentSingleColumn>
      <Publications>
        {Overview && (
          <FluidPaper>
            <MDXSection>
              <Overview />
            </MDXSection>
          </FluidPaper>
        )}
        {publicationsByCategory.size &&
          [...publicationsByCategory].map(([category, publications]) => {
            return (
              <Fragment key={category}>
                <StyledTypography
                  id={categoryIdByCategory.get(category)}
                  component="h3"
                  variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL}
                >
                  {category}
                </StyledTypography>
                {publications.map((publication) => (
                  <Publication
                    key={publication.doi}
                    publication={publication}
                  />
                ))}
              </Fragment>
            );
          })}
      </Publications>
      <Outline categoryIdByCategory={categoryIdByCategory} />
    </BackPageContentSingleColumn>
  );
};

/**
 * Returns category id for the given category.
 * @param category - Category.
 * @returns category id.
 */
function generateCategoryId(category: string): string {
  return category.toLowerCase().replace(/\W/g, "-");
}

/**
 * Returns map of category to category id.
 * @param publicationsByCategory - Map of publication category to publications.
 * @returns map of category to category id.
 */
function getCategoryIdByCategory(
  publicationsByCategory: Map<string, BICCNPublication[]>
): Map<string, string> {
  const categoryIdByCategory = new Map<string, string>();
  for (const [category] of publicationsByCategory) {
    categoryIdByCategory.set(category, generateCategoryId(category));
  }
  return categoryIdByCategory;
}

/**
 * Returns map of publication category to publications.
 * @param publications - BICCN Publications.
 * @returns map of publication category to publications.
 */
function getPublicationsByCategory(
  publications: BICCNPublication[] = []
): Map<string, BICCNPublication[]> {
  const publicationsByCategory = new Map<string, BICCNPublication[]>();
  for (const publication of publications) {
    const { category } = publication;
    if (!category) {
      continue;
    }
    if (!publicationsByCategory.has(category)) {
      publicationsByCategory.set(category, []);
    }
    publicationsByCategory.get(category)?.push(publication);
  }
  return publicationsByCategory;
}
