// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DonationTransparent
 * @notice A transparent donation contract where all contributions are publicly verifiable on-chain.
 * @dev Stores individual donation amounts per address and tracks cumulative totals.
 */
contract DonationTransparent {
    // Cumulative donation amount in wei
    uint256 private totalDonations;
    
    // Number of unique donors
    uint256 private donorCount;
    
    // Mapping from donor address to their total contribution
    mapping(address => uint256) private donations;
    
    // Tracks whether an address has donated before
    mapping(address => bool) private hasDonated;

    // Emitted when a donation is received
    event DonationReceived(
        address indexed donor,
        uint256 amount,
        uint256 timestamp
    );

    /**
     * @notice Accept ETH donation from sender.
     * @dev Requires non-zero value. Updates donor records and emits event.
     */
    function donate() external payable {
        require(msg.value > 0, "Donation must be greater than zero");

        // Track new donors for count
        if (!hasDonated[msg.sender]) {
            hasDonated[msg.sender] = true;
            donorCount++;
        }

        donations[msg.sender] += msg.value;
        totalDonations += msg.value;

        emit DonationReceived(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @notice Get total donations received by the contract.
     * @return Total amount in wei
     */
    function getTotalDonations() external view returns (uint256) {
        return totalDonations;
    }

    /**
     * @notice Get the number of unique donors.
     * @return Count of unique donor addresses
     */
    function getDonorCount() external view returns (uint256) {
        return donorCount;
    }

    /**
     * @notice Get donation amount for a specific address.
     * @param donor Address to query
     * @return Amount donated by the address in wei
     */
    function getDonation(address donor) external view returns (uint256) {
        return donations[donor];
    }

    /**
     * @notice Get the contract's current ETH balance.
     * @return Balance in wei
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
