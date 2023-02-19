import { Contract } from "ethers";
import {SOCIO_DAO_CONTRACT_ADDRESS,
    SOCIO_DAO_ABI} from "../constants"

    
export const getDaoContractInstance = (providerOrSigner) => {
  return new Contract(
    SOCIO_DAO_CONTRACT_ADDRESS,
    SOCIO_DAO_ABI,
    providerOrSigner
  );
};
