// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {DonationTransparent} from "../src/DonationTransparent.sol";

/**
 * @title DonationTransparentTest
 * @notice Unit tests untuk contract DonationTransparent
 */
contract DonationTransparentTest is Test {
    DonationTransparent public donation;
    
    address public donor1 = address(0x1);
    address public donor2 = address(0x2);
    address public donor3 = address(0x3);

    // Event yang sama dengan di contract untuk testing
    event DonationReceived(
        address indexed donor,
        uint256 amount,
        uint256 timestamp
    );

    // Setup: deploy contract baru sebelum setiap test
    function setUp() public {
        donation = new DonationTransparent();
        
        // Berikan ETH ke test addresses
        vm.deal(donor1, 10 ether);
        vm.deal(donor2, 10 ether);
        vm.deal(donor3, 10 ether);
    }

    // ==================== Test Donasi Dasar ====================

    /// @notice Test donasi berhasil
    function test_DonateSuccess() public {
        uint256 donationAmount = 1 ether;
        
        vm.prank(donor1);
        donation.donate{value: donationAmount}();
        
        assertEq(donation.getTotalDonations(), donationAmount);
        assertEq(donation.getDonorCount(), 1);
        assertEq(donation.getDonation(donor1), donationAmount);
        assertEq(donation.getBalance(), donationAmount);
    }

    /// @notice Test donasi dengan nilai 0 harus gagal
    function test_DonateZeroReverts() public {
        vm.prank(donor1);
        vm.expectRevert("Donation must be greater than zero");
        donation.donate{value: 0}();
    }

    /// @notice Test beberapa donasi dari donor yang sama
    function test_MultipleDonationsSameDonor() public {
        vm.startPrank(donor1);
        donation.donate{value: 1 ether}();
        donation.donate{value: 2 ether}();
        donation.donate{value: 0.5 ether}();
        vm.stopPrank();
        
        assertEq(donation.getTotalDonations(), 3.5 ether);
        assertEq(donation.getDonorCount(), 1); // Tetap 1 donor
        assertEq(donation.getDonation(donor1), 3.5 ether);
    }

    /// @notice Test beberapa donasi dari donor berbeda
    function test_MultipleDonorsDifferent() public {
        vm.prank(donor1);
        donation.donate{value: 1 ether}();
        
        vm.prank(donor2);
        donation.donate{value: 2 ether}();
        
        vm.prank(donor3);
        donation.donate{value: 3 ether}();
        
        assertEq(donation.getTotalDonations(), 6 ether);
        assertEq(donation.getDonorCount(), 3);
        assertEq(donation.getDonation(donor1), 1 ether);
        assertEq(donation.getDonation(donor2), 2 ether);
        assertEq(donation.getDonation(donor3), 3 ether);
    }

    // ==================== Test Event ====================

    /// @notice Test event DonationReceived di-emit dengan benar
    function test_DonationEventEmitted() public {
        uint256 donationAmount = 1.5 ether;
        
        vm.prank(donor1);
        vm.expectEmit(true, false, false, true);
        emit DonationReceived(donor1, donationAmount, block.timestamp);
        donation.donate{value: donationAmount}();
    }

    // ==================== Test View Functions ====================

    /// @notice Test getTotalDonations awal adalah 0
    function test_GetTotalDonationsInitialZero() public view {
        assertEq(donation.getTotalDonations(), 0);
    }

    /// @notice Test getDonorCount awal adalah 0
    function test_GetDonorCountInitialZero() public view {
        assertEq(donation.getDonorCount(), 0);
    }

    /// @notice Test getDonation untuk alamat yang belum donasi
    function test_GetDonationNonDonor() public view {
        assertEq(donation.getDonation(donor1), 0);
    }

    /// @notice Test getBalance awal adalah 0
    function test_GetBalanceInitialZero() public view {
        assertEq(donation.getBalance(), 0);
    }

    // ==================== Fuzz Tests ====================

    /// @notice Fuzz test: donasi dengan jumlah random
    function testFuzz_DonateAmount(uint256 amount) public {
        // Batasi amount agar tidak melebihi balance donor
        amount = bound(amount, 1, 10 ether);
        
        vm.prank(donor1);
        donation.donate{value: amount}();
        
        assertEq(donation.getTotalDonations(), amount);
        assertEq(donation.getDonation(donor1), amount);
    }

    /// @notice Fuzz test: multiple donations acak
    function testFuzz_MultipleDonations(uint256 amount1, uint256 amount2) public {
        amount1 = bound(amount1, 1, 5 ether);
        amount2 = bound(amount2, 1, 5 ether);
        
        vm.prank(donor1);
        donation.donate{value: amount1}();
        
        vm.prank(donor2);
        donation.donate{value: amount2}();
        
        assertEq(donation.getTotalDonations(), amount1 + amount2);
        assertEq(donation.getDonorCount(), 2);
    }
}
