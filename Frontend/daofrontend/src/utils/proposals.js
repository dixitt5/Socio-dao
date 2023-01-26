// import getDaoContractInstance from "./contractInstances";
// import Home from "./wallet";
// //have to import signerprovider

// export function Proposals() {
//   const [proposals, setProposals] = useState([]);
//   const [numProposals, setNumProposals] = useState("0");

// const getNumProposalsInDAO = async () => {
//   try {
//     const provider = await getProviderOrSigner();
//     const contract = getDaoContractInstance(provider);
//     const daoNumProposals = await contract.numProposals();
//     setNumProposals(daoNumProposals.toString());
//   } catch (error) {
//     console.error(error);
//   }
// };

//   const fetchProposalById = async (id) => {
//     try {
//       const provider = await getProviderOrSigner();
//       const daoContract = getDaoContractInstance(provider);
//       const proposal = await daoContract.proposals(id);
//       const parsedProposal = {
//         proposalId: id,
//         nftTokenId: proposal.nftTokenId.toString(),
//         deadline: new Date(parseInt(proposal.deadline.toString()) * 1000),
//         yayVotes: proposal.yayvotes.toString(),
//         nayVotes: proposal.nayvotes.toString(),
//         executed: proposal.executed,
//       };
//       return parsedProposal;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchAllProposals = async () => {
//     try {
//       const proposals = [];
//       for (let i = 0; i < numProposals; i++) {
//         const proposal = await fetchProposalById(i);
//         proposals.push(proposal);
//       }
//       setProposals(proposals);
//       return proposals;
//     } catch (error) {
//       console.error(error);
//     }
//   };
// }
// // export {
// //   createProposal,
// //   fetchAllProposals,
// //   fetchProposalById,
// //   getNumProposalsInDAO,
// // };
