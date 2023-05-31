import { FooterProps } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Footer/footer";
import { BROWSER_URL, LOGO, socials } from "./constants";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";

const footer: FooterProps = {
  feedbackForm: false, // TODO feedback form
  logos: [{ ...LOGO, height: 38, src: logoHumanCellAtlas }],
  navLinks: [
    {
      label: "About",
      url: `${BROWSER_URL}/about`,
    },
    {
      label: "Help",
      url: `${BROWSER_URL}/help`,
    },
    {
      label: "Privacy",
      url: `${BROWSER_URL}/privacy`,
    },
    {
      label: "Contact",
      url: `${BROWSER_URL}/contact`,
    },
  ],
  socials,
};

export default footer;
