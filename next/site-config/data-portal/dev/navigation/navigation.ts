import { ABOUT } from "./about";
import { APIS } from "./apis";
import { CONTACT } from "./contact";
import { DCP_UPDATES } from "./dcpUpdates";
import { NavigationConfig } from "./entities";
import { GUIDES } from "./guides";
import { HELP } from "./help";
import { PRIVACY } from "./privacy";

// Site map for the MDX pages used to generate the navigation.
export const navigation: NavigationConfig = {
  about: ABOUT,
  apis: APIS,
  contact: CONTACT,
  "dcp-updates": DCP_UPDATES,
  guides: GUIDES,
  help: HELP,
  privacy: PRIVACY,
};
