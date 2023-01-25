import {
  getDaoContractInstance,
  ExecutionContractInstance,
} from "./contractInstances";
import Home from "./wallet";
import Proposals from "./proposals";
import { fetchAllProposals } from "./proposals";
export const voteOnProposal = async (proposalId, _vote) => {
  try {
    const signer = await getProviderOrSigner(true);
    const daoContract = getDaoContractInstance(signer);
    let vote = _vote === "YAY" ? 0 : 1;
    const tx = await daoContract.voteOnProposal(proposalId, vote);
    // setLoading(true);
    await tx.wait();
    // setLoading(false);
    await fetchAllProposals();
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};

export const executeProposal = async (proposalId, _code, _value) => {
  try {
    const signer = await getProviderOrSigner(true);
    const daoContract = getDaoContractInstance(signer);
    const tx = await daoContract.executeProposal(proposalId, _code, _value);
    // setLoading(true);
    await tx.wait();
    // setLoading(false);
    await fetchAllProposals();
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
};
export const changeServiceGuy = async (_address) => {
  try {
    const signer = await getProviderOrSigner(true);
    const executionContract = ExecutionContractInstance(signer);
    const tx = await executionContract.setServiceGuy(_address);
    await tx.wait();
  } catch (error) {
    console.error(error);
  }
};
