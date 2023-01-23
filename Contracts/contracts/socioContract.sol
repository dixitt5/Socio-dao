// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

interface IExecutionContract {
    // this is where the execution function goes
    function getServiceGuy() external view returns (address);
}

interface ISocioTokens {
    function balanceOf(address owner) external view returns (uint256);
}

contract socioContract is Ownable {
    enum Vote {
        YAY,
        NAY
    }

    struct Proposal {
        string proposal;
        uint256 deadline;
        uint256 yayvotes;
        uint256 nayvotes;
        bool executed;
        mapping(uint256 => bool) voters;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public numProposals;
    address serviceGuy;

    IExecutionContract execution;
    ISocioTokens socioTokens;

    constructor(address _execution, address _socioTokens) payable {
        execution = IExecutionContract(_execution);
        socioTokens = ISocioTokens(_socioTokens);
    }

    modifier tokenHolderOnly() {
        require(socioTokens.balanceOf(msg.sender) > 0, "Not a DAO member");
        _;
    }

    modifier activeProposalOnly(uint256 proposalId) {
        require(
            proposals[proposalId].deadline > block.timestamp,
            "Proposal Inactive"
        );
        _;
    }

    modifier inactiveProposalOnly(uint256 proposalId) {
        require(
            proposals[proposalId].deadline <= block.timestamp,
            "proposal active"
        );
        require(proposals[proposalId].executed == false, "already executed");
        _;
    }

    function addBalance() public payable {
        address to = address(this);
        (bool success, ) = to.call{value: msg.value}("");
        // require(bool,"error!");
        require(success, "tx failed!");
    }

    function treasuryBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function checkUserBalance(address _user) public view returns (uint256) {
        return _user.balance;
    }

    function createProposal(
        string memory _proposal
    ) external tokenHolderOnly returns (uint256) {
        // require(nftMarketplace.available(_nftTokenId), "Nft not for sale");

        Proposal storage proposal = proposals[numProposals];
        proposal.proposal = _proposal;
        proposal.deadline = block.timestamp + 2 minutes;

        numProposals++;
        return numProposals - 1;
    }

    function voteOnProposal(
        uint256 proposalId,
        Vote vote
    ) external tokenHolderOnly activeProposalOnly(proposalId) {
        Proposal storage proposal = proposals[proposalId];

        uint256 voterTokenBalance = socioTokens.balanceOf(msg.sender);

        uint256 numVotes = 1;

        if (voterTokenBalance > 0) {
            if (vote == Vote.YAY) {
                proposal.yayvotes += numVotes;
            } else {
                proposal.nayvotes += numVotes;
            }
        }
    }

    function executeProposal(
        uint256 proposalId,
        uint8 _code,
        uint256 _value
    ) external payable tokenHolderOnly inactiveProposalOnly(proposalId) {
        Proposal storage proposal = proposals[proposalId];
        uint8 code = _code;
        if (proposal.yayvotes > proposal.nayvotes) {
            //this is where the execution part becomes active
            if (code == 1) {
                address to = address(this);
                // address to = payable(_serviceGuy);
                require(checkUserBalance(msg.sender) >= _value);
                (bool success, ) = to.call{value: msg.value}("");
                // require(bool,"error!");
                require(success, "tx failed!");
            } else {
                address to = execution.getServiceGuy();
                require(treasuryBalance() >= _value, "not enough funds");
                (bool success, ) = to.call{value: _value}("");
                require(success, "transaction failed");
            }
        }

        proposal.executed = true;
    }

    function withdrawEther() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    receive() external payable {}

    fallback() external payable {}
}
