// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract execution {
    address serviceGuy;

    function setServiceGuy(address _service) external {
        serviceGuy = _service;
    }

    function getServiceGuy() external view returns (address) {
        return serviceGuy;
    }
}
