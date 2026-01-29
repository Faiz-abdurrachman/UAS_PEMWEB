// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {DonationTransparent} from "../src/DonationTransparent.sol";

/**
 * @title DeployDonation
 * @notice Foundry script to deploy DonationTransparent contract to Sepolia.
 * @dev Run with: forge script script/DeployDonation.s.sol --rpc-url sepolia --broadcast
 */
contract DeployDonation is Script {
    function run() external returns (DonationTransparent) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        DonationTransparent donation = new DonationTransparent();
        
        console.log("DonationTransparent deployed at:", address(donation));
        
        vm.stopBroadcast();
        
        return donation;
    }
}
