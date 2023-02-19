import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  loading: { show: false, msg: "" },
  proposals: [],
  numProposals: null,
  walletAddress: "0x",
});

export { useGlobalState, setGlobalState, getGlobalState };
