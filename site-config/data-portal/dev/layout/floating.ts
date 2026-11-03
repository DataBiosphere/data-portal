import { ROUTES } from "@/routes/constants";
import * as V from "@/viewModelBuilders/viewModelBuilders";
import { CookieBanner } from "@databiosphere/findable-ui/lib/components/common/Banner/components/CookieBanner/cookieBanner";
import { ViewSupport } from "@databiosphere/findable-ui/lib/components/Support/components/ViewSupport/viewSupport";
import {
  ComponentConfig,
  FloatingConfig,
} from "@databiosphere/findable-ui/lib/config/entities";

export const floating: FloatingConfig = {
  components: [
    {
      component: CookieBanner,
      viewBuilder: V.buildCookieBanner,
    } as ComponentConfig<typeof CookieBanner>,
    {
      component: ViewSupport,
      props: {
        url: ROUTES.HELP,
      },
    } as ComponentConfig<typeof ViewSupport>,
  ],
};
