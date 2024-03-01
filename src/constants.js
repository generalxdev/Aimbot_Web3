import { SourceType, Web3Versions } from "@terminal-packages/sdk";

import {
  injected,
} from "./connectors";

export const connectorTypes = {
  Injected: injected,

};

export const connectorNames = {
  Injected: "metamask",
};

export const setWeb3Version = provider => {
  if (provider.isPortis) {
    return Web3Versions.two;
  } else if (provider.isWalletConnect) {
    return Web3Versions.two;
  } else if (provider.isFortmatic) {
    return Web3Versions.two;
  } else {
    return Web3Versions.one;
  }
};


export const setSource = provider => {
  if (provider.isPortis) {
    return SourceType.Portis;
  } else if (provider.isTorus) {
    return SourceType.Torus;
  } else if (provider.isFortmatic) {
    return "Fortmatic";
  } else if (provider.isWalletConnect) {
    return "WalletConnect";
  } else {
    return SourceType.Web3ProviderEngine;
  }
};

export const SOCIAL_LINKS = {
  TWITTER: "https://twitter.com/terminaldotco",
  GITHUB: "https://github.com/Terminal-Systems",
  MEDIUM: "https://medium.com/terminaldotco",
  TERMINAL: "https://terminal.co/"
};
