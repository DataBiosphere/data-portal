import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { VISIBLE } from "../../../common/constants";
import { NavigationEntry } from "../navigation/entities";

/**
 * Retuns menu items for the navigation entry.
 * @param navigationEntry - Navigation entry.
 * @returns menu items.
 */
export function buildMenuItems(
  navigationEntry: NavigationEntry
): NavLinkItem[] {
  return navigationEntry.nodes.map(
    ({
      flatten,
      label,
      navigation: menuItems,
      selectedMatch,
      url,
      visible,
    }) => {
      return {
        flatten,
        label,
        menuItems: menuItems?.map((m) => ({
          ...m,
          visible: VISIBLE.MD_DOWN,
        })),
        selectedMatch,
        url,
        visible,
      } as NavLinkItem;
    }
  );
}
