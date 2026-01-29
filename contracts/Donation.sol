// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Donation
 * @author Web3 Donation Platform
 * @notice A transparent donation contract for tracking ETH contributions
 * @dev Implements donation tracking with event emissions for transparency
 */
contract Donation {
    // ============ State Variables ============
    
    /// @notice Total amount of ETH donated to this contract
    uint256 private totalDonations;
    
    /// @notice Total number of donation transactions
    uint256 private donationCount;
    
    /// @notice Mapping of donor addresses to their total contributions
    mapping(address => uint256) private donorContributions;
    
    /// @notice Array of all unique donor addresses
    address[] private donors;
    
    /// @notice Tracks whether an address has donated before
    mapping(address => bool) private hasDonated;

    // ============ Events ============
    
    /// @notice Emitted when a donation is received
    /// @param donor The address of the donor
    /// @param amount The amount donated in wei
    /// @param timestamp The block timestamp of the donation
    event DonationReceived(
        address indexed donor,
        uint256 amount,
        uint256 timestamp
    );

    // ============ Errors ============
    
    /// @notice Thrown when donation amount is zero
    error ZeroDonationNotAllowed();

    // ============ External Functions ============

    /**
     * @notice Accept ETH donations
     * @dev Tracks donor contributions and emits DonationReceived event
     */
    function donate() external payable {
        if (msg.value == 0) {
            revert ZeroDonationNotAllowed();
        }

        // Track first-time donors
        if (!hasDonated[msg.sender]) {
            hasDonated[msg.sender] = true;
            donors.push(msg.sender);
        }

        // Update state
        donorContributions[msg.sender] += msg.value;
        totalDonations += msg.value;
        donationCount++;

        emit DonationReceived(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @notice Get the total amount of ETH donated
     * @return The total donations in wei
     */
    function getTotalDonations() external view returns (uint256) {
        return totalDonations;
    }

    /**
     * @notice Get the total number of donations made
     * @return The count of donation transactions
     */
    function getDonationCount() external view returns (uint256) {
        return donationCount;
    }

    /**
     * @notice Get a donor's total contribution
     * @param donor The address of the donor
     * @return The total amount donated by this address in wei
     */
    function getDonorContribution(address donor) external view returns (uint256) {
        return donorContributions[donor];
    }

    /**
     * @notice Get all unique donor addresses
     * @return Array of donor addresses
     */
    function getAllDonors() external view returns (address[] memory) {
        return donors;
    }

    /**
     * @notice Get the number of unique donors
     * @return The count of unique donors
     */
    function getUniqueDonorCount() external view returns (uint256) {
        return donors.length;
    }

    /**
     * @notice Get the contract's current ETH balance
     * @return The balance in wei
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
