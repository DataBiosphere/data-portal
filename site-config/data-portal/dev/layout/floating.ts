import * as V from "@/viewModelBuilders/viewModelBuilders";
import { CookieBanner } from "@databiosphere/findable-ui/lib/components/common/Banner/components/CookieBanner/cookieBanner";
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
  ],
};
