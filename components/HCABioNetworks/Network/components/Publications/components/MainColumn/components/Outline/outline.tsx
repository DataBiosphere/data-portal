import { useLayoutState } from "@databiosphere/findable-ui/lib/hooks/useLayoutState";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { Tab, Tabs, TabTitle } from "./outline.styles";

enum TAB_VALUE {
  DEFAULT = "DEFAULT",
}

export interface OutlineProps {
  categoryIdByCategory: Map<string, string>;
}

export const Outline = ({
  categoryIdByCategory,
}: OutlineProps): JSX.Element => {
  const {
    layoutState: { headerHeight },
  } = useLayoutState();
  const { asPath } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>(
    initActiveCategory(asPath)
  );

  // Callback fired when selected tab value changes.
  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    categoryId: string
  ): void => {
    setActiveCategory(categoryId);
  };

  return (
    <Tabs
      headerHeight={headerHeight}
      indicatorColor={
        activeCategory === TAB_VALUE.DEFAULT ? "transparent" : "primary"
      }
      onChange={handleChange}
      orientation="vertical"
      value={activeCategory}
    >
      <TabTitle label="Contents" value={TAB_VALUE.DEFAULT} />
      {[...categoryIdByCategory].map(([category, categoryId]) => {
        return (
          <Tab
            key={category}
            component="a"
            label={category}
            href={`#${categoryId}`}
            value={categoryId}
          />
        );
      })}
    </Tabs>
  );
};

/**
 * Initializes active category.
 * @param asPath - Current path.
 * @returns active category.
 */
function initActiveCategory(asPath: string): string {
  if (asPath.includes("#")) {
    return asPath.split("#")[1];
  }
  return TAB_VALUE.DEFAULT;
}
