import { ethers } from "ethers";
import { Contract, providers } from "ethers";
import { getDaoContractInstance } from "./instances";
import { useGlobalState, setGlobalState, getGlobalState } from "../store";
import { SOCIO_DAO_CONTRACT_ADDRESS } from "../constants";

async function connectWallet() {}
try {
  await getProviderOrSigner();
} catch (error) {
  console.error(error);
}

async function getProviderOrSigner() {
  //   const provider = await web3ModalRef.current.connect();
  //   // console.log(provider);
  //   const web3Provider = new providers.Web3Provider(provider);

  //   const { chainId } = await web3Provider.getNetwork();
  //   if (chainId !== 80001) {
  //     window.alert("Please switch to mumbai network!");
  //     throw new Error("Please switch to mumbai network!");
  //   }

  //   if (needSigner) {
  //     const signer = web3Provider.getSigner();
  //     return signer;
  //   }
  //   return web3Provider;
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setGlobalState("walletAddress", address);
    return provider.getSigner();
  } else {
    alert("Install Metamask Wallet to run the application");
  }
}

async function createProposal(label) {
  try {
    const signer = await getProviderOrSigner();
    const daoContract = getDaoContractInstance(signer);
    const tx = await daoContract.createProposal(label);
    // setLoading(true);
    await tx.wait();
    await getNumProposalsInDAO();
    // setLoading(false);
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
}

async function getNumProposalsInDAO() {
  try {
    const provider = await getProviderOrSigner();
    const contract = getDaoContractInstance(provider);
    const daoNumProposals = await contract.numProposals();
    return daoNumProposals;
  } catch (error) {
    console.error(error);
  }
}

async function fetchProposalById(id) {
  try {
    const provider = await getProviderOrSigner();
    const daoContract = getDaoContractInstance(provider);
    const proposal = await daoContract.proposals(id);
    const parsedProposal = {
      proposalId: id,
      label: proposal.label.toString(),
      deadline: new Date(parseInt(proposal.deadline.toString()) * 1000),
      yayVotes: proposal.yayvotes.toString(),
      nayVotes: proposal.nayvotes.toString(),
      executed: proposal.executed,
    };
    return parsedProposal;
  } catch (error) {
    console.error(error);
  }
}

async function fetchAllProposals() {
  try {
    const proposals = [];
    const num = getGlobalState("numProposals");
    for (let i = 0; i < num; i++) {
      const proposal = await fetchProposalById(i);
      proposals.push(proposal);
    }
    setGlobalState(proposals, proposals);
    return proposals;
  } catch (error) {
    console.error(error);
  }
}

async function voteOnProposal(proposalId, _vote) {
  try {
    const signer = await getProviderOrSigner();
    const daoContract = getDaoContractInstance(signer);
    let vote = _vote === "YAY" ? 0 : 1;
    const tx = await daoContract.voteOnProposal(proposalId, vote);
    //   setLoading(true);
    await tx.wait();
    //   setLoading(false);
    await fetchAllProposals();
  } catch (error) {
    console.error(error);
    window.alert(error.data.message);
  }
}

const getDAOTreasuryBalance = async () => {
  try {
    const provider = await getProviderOrSigner();
    const balance = await provider.getBalance(SOCIO_DAO_CONTRACT_ADDRESS);
    //   setGlobalState(balance.toString());
  } catch (error) {
    console.error(error);
  }
};

const _ = {
  connectWallet,
  getProviderOrSigner,
  createProposal,
  getNumProposalsInDAO,
  fetchProposalById,
  fetchAllProposals,
  voteOnProposal,
  getDAOTreasuryBalance,
};
export default _;
