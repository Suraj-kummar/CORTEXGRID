// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { MessageHashUtils } from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract CortexLease {
    using ECDSA for bytes32;

    struct Lease {
        address provider;
        address consumer;
        uint256 amount;
        uint256 lastHeartbeat;
        bool active;
        uint256 startTime;
    }

    mapping(uint256 => Lease) public leases;
    uint256 public leaseCount;

    event LeaseCreated(uint256 indexed leaseId, address indexed provider, address indexed consumer, uint256 amount);
    event HeartbeatVerified(uint256 indexed leaseId, uint256 timestamp);
    event ProviderSlashed(uint256 indexed leaseId, address indexed provider, uint256 slashAmount);

    function createLease(address _provider) external payable {
        leaseCount++;
        leases[leaseCount] = Lease({
            provider: _provider,
            consumer: msg.sender,
            amount: msg.value,
            lastHeartbeat: block.timestamp,
            active: true,
            startTime: block.timestamp
        });

        emit LeaseCreated(leaseCount, _provider, msg.sender, msg.value);
    }

    function verifyHeartbeat(uint256 _leaseId, uint256 _timestamp, bytes calldata _signature) external {
        Lease storage lease = leases[_leaseId];
        require(lease.active, "Lease not active");
        
        bytes32 messageHash = keccak256(abi.encodePacked("CortexGrid Heartbeat: ", _timestamp));
        bytes32 ethSignedHash = MessageHashUtils.toEthSignedMessageHash(messageHash);
        
        address signer = ethSignedHash.recover(_signature);
        require(signer == lease.provider, "Invalid signature");
        require(_timestamp > lease.lastHeartbeat, "Old heartbeat");

        lease.lastHeartbeat = _timestamp;
        emit HeartbeatVerified(_leaseId, _timestamp);
    }

    function slashProvider(uint256 _leaseId) external {
        Lease storage lease = leases[_leaseId];
        require(lease.active, "Lease not active");
        require(block.timestamp > lease.lastHeartbeat + 120, "Heartbeat still fresh");

        uint256 slashAmount = lease.amount;
        lease.amount = 0;
        lease.active = false;

        payable(lease.consumer).transfer(slashAmount);
        emit ProviderSlashed(_leaseId, lease.provider, slashAmount);
    }

    function completeLease(uint256 _leaseId) external {
        Lease storage lease = leases[_leaseId];
        require(lease.active, "Lease not active");
        require(msg.sender == lease.consumer, "Only consumer can complete");

        lease.active = false;
        payable(lease.provider).transfer(lease.amount);
    }
}
