import {
  getDaoContractInstance,
  ExecutionContractInstance,
} from "./contractInstances";
import Proposals from "./proposals";
import { fetchAllProposals } from "./proposals";
import { useState } from "react";

export default function VoteAndEx(props) {
  const [numProposals, setNumProposals] = useState(0);
  const [proposals, setProposals] = useState([]);

  const getNumProposalsInDAO = async () => {
    try {
      const provider = await props.fun;
      const contract = getDaoContractInstance(provider);
      const daoNumProposals = await contract.numProposals();
      setNumProposals(daoNumProposals.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const voteOnProposal = async (proposalId, _vote) => {
    try {
      const signer = await props.fun;
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

  const executeProposal = async (proposalId, _code, _value) => {
    try {
      const signer = await props.fun;
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

  const fetchProposalById = async (id) => {
    try {
      const provider = await props.fun2;
      const daoContract = getDaoContractInstance(provider);
      const proposal = await daoContract.proposals(id);
      const parsedProposal = {
        proposalId: id,
        nftTokenId: proposal.nftTokenId.toString(),
        deadline: new Date(parseInt(proposal.deadline.toString()) * 1000),
        yayVotes: proposal.yayvotes.toString(),
        nayVotes: proposal.nayvotes.toString(),
        executed: proposal.executed,
      };
      return parsedProposal;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllProposals = async () => {
    try {
      const proposals = [];
      for (let i = 0; i < numProposals; i++) {
        const proposal = await fetchProposalById(i);
        proposals.push(proposal);
      }
      setProposals(proposals);
      return proposals;
    } catch (error) {
      console.error(error);
    }
  };
}

const changeServiceGuy = async (_address) => {
  try {
    const signer = await props.fun;
    const executionContract = ExecutionContractInstance(signer);
    const tx = await executionContract.setServiceGuy(_address);
    await tx.wait();
  } catch (error) {
    console.error(error);
  }
};
