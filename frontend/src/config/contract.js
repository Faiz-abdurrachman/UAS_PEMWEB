/**
 * Contract configuration for the Donation smart contract
 * Update CONTRACT_ADDRESS after deploying to Sepolia testnet
 */

// Deployed contract address on Sepolia (update after deployment)
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

// Sepolia testnet chain ID
export const SEPOLIA_CHAIN_ID = parseInt(import.meta.env.VITE_CHAIN_ID) || 11155111;
export const NETWORK_NAME = import.meta.env.VITE_NETWORK_NAME || 'Sepolia';

// Backend API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Contract ABI - minimal interface for frontend interaction
export const CONTRACT_ABI = [
    // Read functions
    {
        "inputs": [],
        "name": "getTotalDonations",
        "outputs": [{ "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDonationCount",
        "outputs": [{ "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "name": "donor", "type": "address" }],
        "name": "getDonorContribution",
        "outputs": [{ "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllDonors",
        "outputs": [{ "type": "address[]" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUniqueDonorCount",
        "outputs": [{ "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [{ "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    // Write functions
    {
        "inputs": [],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    // Events
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "name": "donor", "type": "address" },
            { "indexed": false, "name": "amount", "type": "uint256" },
            { "indexed": false, "name": "timestamp", "type": "uint256" }
        ],
        "name": "DonationReceived",
        "type": "event"
    }
];

/**
 * Check if contract is deployed (not zero address)
 */
export const isContractDeployed = () => {
    return CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';
};
