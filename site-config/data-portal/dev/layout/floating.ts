import { ViewSupport } from "@databiosphere/findable-ui/lib/components/Support/components/ViewSupport/viewSupport";
import {
  ComponentConfig,
  FloatingConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../components";
import { ROUTES } from "../../../../routes/constants";
import * as V from "../../../../viewModelBuilders/viewModelBuilders";

export const floating: FloatingConfig = {
  components: [
    {
      component: C.CookieBanner,
      viewBuilder: V.buildCookieBanner,
    } as ComponentConfig<typeof C.CookieBanner>,
    {
      component: ViewSupport,
      props: {
        url: ROUTES.HELP,
      },
    } as ComponentConfig<typeof ViewSupport>,
  ],
};
