// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./socioToken.sol";

contract socioContract is Ownable, ChainlinkClient {
    using Chainlink for Chainlink.Request;
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

    address public oracle;
    string public jobId;
    string public claims;

    mapping(uint256 => Proposal) public proposals;
    mapping(uint64 => uint256) public price;
    uint256 public numProposals;

    uint256 public fee;
    uint256 public countMember;

    uint256[64] public aadhar;

    ICircuitValidator public validator;
    ICircuitValidator.CircuitQuery public query;
    socioToken property;

    event RequestFulfilled(bytes32 indexed requestId);

    error NeedMoreEth();

    constructor(
        address _oracle,
        string memory _jobId,
        address _link,
        address _property,
        address _validator,
        uint256 _schema,
        uint256 _slotIndex,
        uint256 _operator,
        string memory _circuitId
    ) {

        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }

        oracle = _oracle;
        jobId = _jobId;
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)

        property = socioToken(_property);
        validator = ICircuitValidator(_validator);
        query.schema = _schema;
        query.slotIndex = _slotIndex;
        query.operator = _operator;
        query.value = aadhar;
        query.circuitId = _circuitId;

        countMember = 0;
    }

    modifier tokenHolderOnly() {
        uint256 tokens = property.balanceOf(msg.sender, 0) +
            property.balanceOf(msg.sender, 1) +
            property.balanceOf(msg.sender, 2);
        require(tokens > 0, "Not a DAO member");
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

    function purchaseProperty(uint64 tokenId) public payable {
        if (msg.value < price[tokenId]) {
            revert NeedMoreEth();
        }
        property.set_TRANSFER_REQUEST_ID(tokenId);
        property.setZKPRequest(tokenId, validator, query);
    }

    // user will need to pass their aadhar no. as parameter
    function createIdentity(string memory id) public {
        Chainlink.Request memory request = buildOperatorRequest(
            stringToBytes32(jobId),
            this.fulfill.selector
        );
        request.add("aadhar", id);
        sendOperatorRequestTo(oracle, request, fee);
    }

    function fulfill(
        bytes32 requestId,
        string memory _claimId,
        uint256 _aadharId
    ) public recordChainlinkFulfillment(requestId) {
        emit RequestFulfilled(requestId);
        aadhar[countMember] = _aadharId;
        countMember++;
        query.value = aadhar;
        claims = _claimId;
    }

    function createProposal(string memory _proposal)
        external
        tokenHolderOnly
        returns (uint256)
    {

        Proposal storage proposal = proposals[numProposals];
        proposal.proposal = _proposal;
        proposal.deadline = block.timestamp + 2 minutes;

        numProposals++;
        return numProposals - 1;
    }

    function voteOnProposal(uint256 proposalId, Vote vote)
        external
        tokenHolderOnly
        activeProposalOnly(proposalId)
    {
        Proposal storage proposal = proposals[proposalId];
        uint256 numVotes = 1;

        if (vote == Vote.YAY) {
            proposal.yayvotes += numVotes;
        } else {
            proposal.nayvotes += numVotes;
        }
    }

    // function executeProposal(
    //     uint256 proposalId,
    //     uint8 _code,
    //     uint256 _value
    // ) external payable tokenHolderOnly inactiveProposalOnly(proposalId) {
    //     Proposal storage proposal = proposals[proposalId];
    //     uint8 code = _code;
    //     if (proposal.yayvotes > proposal.nayvotes) {
    //         //this is where the execution part becomes active
    //         if (code == 1) {
    //             address to = address(this);
    //             // address to = payable(_serviceGuy);
    //             require(checkUserBalance(msg.sender) >= _value);
    //             (bool success, ) = to.call{value: msg.value}("");
    //             // require(bool,"error!");
    //             require(success, "tx failed!");
    //         } else {
    //             address to = execution.getServiceGuy();
    //             require(treasuryBalance() >= _value, "not enough funds");
    //             (bool success, ) = to.call{value: _value}("");
    //             require(success, "transaction failed");
    //         }
    //     }

    //     proposal.executed = true;
    // }

    // set the price of each property. only allowed by owner of the contract
    function setPrice(uint64 tokenId, uint256 _price) public onlyOwner {
        price[tokenId] = _price;
    }

    function treasuryBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function checkUserBalance(address _user) public view returns (uint256) {
        return _user.balance;
    }


    // Helper functions!!

    function contractBalances()
        public
        view
        returns (uint256 eth, uint256 link)
    {
        eth = address(this).balance;

        LinkTokenInterface linkContract = LinkTokenInterface(
            chainlinkTokenAddress()
        );
        link = linkContract.balanceOf(address(this));
    }

    function withdrawEther() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer Link"
        );
    }

    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }

    receive() external payable {}

    fallback() external payable {}
}
