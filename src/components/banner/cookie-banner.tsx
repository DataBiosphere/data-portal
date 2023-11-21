import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Button, Collapse, Typography } from "@mui/material";
import * as EnvironmentService from "../../utils/environment/environment.service";
import { Alert } from "./cookie-banner.styles";
import { useFeatureFlag } from "../../hooks/useFeatureFlag/useFeatureFlag";
import { FEATURES, FLAG } from "../../hooks/useFeatureFlag/common/entities";
import { setLocalStorage } from "../../hooks/useFeatureFlag/common/utils";

export const CookieBanner = (): JSX.Element => {
  const isCookieAccepted = useFeatureFlag(FEATURES.PRIVACY_ACCEPTED);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const privacyPath = EnvironmentService.isLungMAP()
    ? "/lungmap-privacy"
    : "/privacy";

  useEffect(() => {
    setShowBanner(!isCookieAccepted);
  }, [isCookieAccepted]);

  return (
    <Collapse in={showBanner}>
      <Alert icon={false} variant="filled">
        <Typography variant="text-body-400">
          This website uses cookies for security and analytics purposes. By
          using this site, you agree to these uses.{" "}
          <Link to={privacyPath}>Learn More</Link>
        </Typography>
        <Button
          color="primary"
          onClick={(): void => {
            setLocalStorage(FEATURES.PRIVACY_ACCEPTED, FLAG.TRUE);
            setShowBanner(false);
          }}
          variant="contained"
        >
          Ok, Got It
        </Button>
      </Alert>
    </Collapse>
  );
};
