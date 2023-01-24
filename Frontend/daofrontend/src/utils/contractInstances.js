import { Contract } from "ethers";
import {
  Sociodao_CONTRACT_ADDRESS,
  Sociodao_CONTRACT_ABI,
  EXECUTION_CONTRACT_ADDRESS,
  EXECUTION_CONTRACT_ABI,
} from "../constants";
import Home from "./wallet";

export const getDaoContractInstance = (providerOrSigner) => {
  return new Contract(
    Sociodao_CONTRACT_ADDRESS,
    Sociodao_CONTRACT_ABI,
    providerOrSigner
  );
};

export const ExecutionContractInstance = (providerOrSigner) => {
  return new Contract(
    EXECUTION_CONTRACT_ADDRESS,
    EXECUTION_CONTRACT_ABI,
    providerOrSigner
  );
};
