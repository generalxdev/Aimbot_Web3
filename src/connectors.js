import { InjectedConnector } from "@web3-react/injected-connector";

const POLLING_INTERVAL = 8000;

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});
