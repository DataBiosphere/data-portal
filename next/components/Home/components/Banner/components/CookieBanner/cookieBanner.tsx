import { ButtonPrimary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/ButtonPrimary/buttonPrimary";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { TEXT_BODY_400 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Collapse, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  FEATURES,
  FLAG,
} from "../../../../../../hooks/useFeatureFlag/common/entities";
import { setLocalStorage } from "../../../../../../hooks/useFeatureFlag/common/utils";
import { useFeatureFlag } from "../../../../../../hooks/useFeatureFlag/useFeatureFlag";
import { PORTAL_URL } from "../../../../../../site-config/data-portal/dev/config";
import { Alert } from "./cookieBanner.styles";

export const CookieBanner = (): JSX.Element => {
  const isCookieAccepted = useFeatureFlag(FEATURES.PRIVACY_ACCEPTED);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    setShowBanner(!isCookieAccepted);
  }, [isCookieAccepted]);

  return (
    <Collapse in={showBanner}>
      <Alert icon={false} variant="filled">
        <Typography variant={TEXT_BODY_400}>
          This website uses cookies for security and analytics purposes. By
          using this site, you agree to these uses.{" "}
          <Link
            label="Learn more"
            target={ANCHOR_TARGET.SELF}
            url={`${PORTAL_URL}/privacy`}
          />
        </Typography>
        <ButtonPrimary
          onClick={(): void => {
            setLocalStorage(FEATURES.PRIVACY_ACCEPTED, FLAG.TRUE);
            setShowBanner(false);
          }}
        >
          Ok, Got It
        </ButtonPrimary>
      </Alert>
    </Collapse>
  );
};
