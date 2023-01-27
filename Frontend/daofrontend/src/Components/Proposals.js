import React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getDaoContractInstance } from "../utils/contractInstances";
import Dialoge from "./Dialoge";
import Box from "@mui/material/Box";

export default function Proposals(props) {
  const [proposals, setProposals] = useState([]);
  const [numProposals, setNumProposals] = useState(0);

  const getNumProposalsInDAO = async () => {
    try {
      const provider = await props.fun;
      const contract = getDaoContractInstance(provider);
      const daoNumProposals = await contract.numProposals();
      console.log("number : " + daoNumProposals.toString());
      //   setNumProposals(daoNumProposals.toString());
      setNumProposals(2);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProposalById = async (id) => {
    try {
      const provider = await props.fun;
      const daoContract = getDaoContractInstance(provider);
      const proposal = await daoContract.proposals(id);
      const parsedProposal = {
        proposalId: id,
        deadline: new Date(parseInt(proposal.deadline.toString()) * 1000),
        yayVotes: proposal.yayvotes.toString(),
        nayVotes: proposal.nayvotes.toString(),
        executed: proposal.executed,
        label: props.idLabel.get(id),
        code: props.idCode.get(id),
        value: props.idValue.get(id),
      };
      console.log(parsedProposal);
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

  const voteOnProposal = async (proposalId, _vote) => {
    try {
      const signer = await props.fun2;
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
      const signer = await props.fun2;
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

  //   useEffect(() => {
  //     fetchAllProposals();
  //   }, [proposals]);

  function renderProposals() {
    fetchAllProposals();
    if (proposals.length === 0) {
      return <div>No proposals added..</div>;
    } else {
      return (
        <div>
          {proposals.map((p, index) => (
            <div key={index}>
              <p>Proposal ID: {p.proposalId}</p>
              {/* <p>Proposal Label: {have to write a state here}</p> */}
              <p>Deadline: {p.deadline.toLocaleString()}</p>
              <p>Yay Votes: {p.yayVotes}</p>
              <p>Nay Votes: {p.nayVotes}</p>
              <p>Executed? : {p.executed.toString()}</p>
              {p.deadline.getTime() > Date.now() && !p.executed ? (
                <div>
                  <button onClick={() => voteOnProposal(p.proposalId, "YAY")}>
                    Vote Yes
                  </button>
                  <button onClick={() => voteOnProposal(p.proposalId, "NAY")}>
                    Vote No
                  </button>
                </div>
              ) : p.deadline.getTime() < Date.now() && !p.executed ? (
                <div>
                  <button onClick={() => executeProposal(p.proposalId)}>
                    Execute Proposal{" "}
                    {p.yayVotes > p.nayVotes ? "(YAY)" : "(NAY)"}
                  </button>
                </div>
              ) : (
                <div>Proposal Executed </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  }
  return (
    <div>
      <Box>
        {/* {fetchAllProposals()} */}
        {renderProposals}
        {/* <p>total number of proposals :{numProposals}</p> */}
      </Box>
      {/* <Dialoge num={} /> */}
    </div>
  );
}
