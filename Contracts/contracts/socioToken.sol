// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";

contract socioToken is ERC1155URIStorage, ZKPVerifier {
    uint64 public TRANSFER_REQUEST_ID = 0;

    uint256 public constant _1BHK = 0;
    uint256 public constant _2BHK = 1;
    uint256 public constant _3BHK = 2;

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    constructor(
        string memory uri,
        uint256 count1,
        uint256 count2,
        uint256 count3
    ) public ERC1155(uri) {
        _mint(msg.sender, _1BHK, count1, "");
        _mint(msg.sender, _2BHK, count2, "");
        _mint(msg.sender, _3BHK, count3, "");
    }

    function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that challenge input of the proof is equal to the msg.sender
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );

        uint256 id = inputs[validator.getChallengeInputIndex()];
        // mint the token
        if (idToAddress[id] == address(0)) {
            safeTransferFrom(address(this), _msgSender(), requestId, 1, "0x0");
            addressToId[_msgSender()] = id;
            idToAddress[id] = _msgSender();
        }
    }

    function _beforeTokenTransfer(
        address, /* from */
        address to,
        uint256 /* amount */
    ) internal view {
        require(
            proofs[to][TRANSFER_REQUEST_ID] == true,
            "only identities who provided proof are allowed to receive tokens"
        );
    }

    function set_TRANSFER_REQUEST_ID(uint64 tokenId) public {
        TRANSFER_REQUEST_ID = tokenId;
    }

    function _safeBatchTransferFrom(
        address, /*from */
        address, /*to */
        uint256[] memory, /* ids */
        uint256[] memory, /* amounts */
        bytes memory /*data */
    ) internal pure override {
        revert("No batch transfer allowed");
    }
}
