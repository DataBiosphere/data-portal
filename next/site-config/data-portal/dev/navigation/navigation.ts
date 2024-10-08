import { ABOUT } from "./about";
import { APIS } from "./apis";
import { CONTACT } from "./contact";
import { CONTRIBUTE } from "./contribute";
import { DCP_UPDATES } from "./dcpUpdates";
import { NavigationConfig } from "./entities";
import { GUIDES } from "./guides";
import { HELP } from "./help";
import { METADATA } from "./metadata";
import { PRIVACY } from "./privacy";

// Site map for the MDX pages used to generate the navigation.
export const navigation: NavigationConfig = {
  about: ABOUT,
  apis: APIS,
  contact: CONTACT,
  contribute: CONTRIBUTE,
  "dcp-updates": DCP_UPDATES,
  guides: GUIDES,
  help: HELP,
  metadata: METADATA,
  privacy: PRIVACY,
};
