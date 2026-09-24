import { VISIBLE } from "@/site-config/common/constants";
import { NavigationEntry } from "@/site-config/data-portal/dev/navigation/entities";
import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";

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
