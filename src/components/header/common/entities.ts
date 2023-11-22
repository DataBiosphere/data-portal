import { Social } from "../components/socials/socials";
import { ReactNode } from "react";

/**
 * Model of header to be used as props for the Header component.
 */
export interface Header {
  authenticationEnabled?: boolean;
  logo: Logo;
  navLinks: NavLinkItem[];
  searchEnabled: boolean;
  slogan?: string;
  socialMedia: SocialMedia;
}

/**
 * Model of logo to be used as props for the Header and Footer component.
 */
export interface Logo {
  alt: string;
  height?: number;
  link: string;
  src: string;
  width?: number;
}

/**
 * Model of nav link item to be use as props for the Header and Footer component.
 */
export interface NavLinkItem {
  label: string;
  target?: string;
  url: string;
}

export interface SocialMedia {
  label: ReactNode;
  socials: Social[];
}
