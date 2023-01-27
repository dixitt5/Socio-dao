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
}
