/**
 * Blockchain API utilities for fetching on-chain transaction data.
 * Uses Etherscan API to get donation events from the smart contract.
 */

import { CONTRACT_ADDRESS, SEPOLIA_CHAIN_ID } from './contractConfig';

// Etherscan API V2 endpoint (unified for all chains)
const ETHERSCAN_API_URL = 'https://api.etherscan.io/v2/api';

// Etherscan API key from environment variable (safer than hardcoding)
// Set in frontend/.env file as VITE_ETHERSCAN_API_KEY
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY || '';

// DonationReceived event topic (keccak256 hash of the event signature)
// Event: DonationReceived(address indexed donor, uint256 amount, uint256 timestamp)
const DONATION_EVENT_TOPIC = '0x' + 'DonationReceived(address,uint256,uint256)'.split('').reduce((hash, char) => {
    // This is a placeholder - we'll use the actual topic from logs
    return hash;
}, '');

/**
 * Fetches donation transactions from Etherscan API V2.
 * Uses the contract's transaction history.
 * @param {number} limit - Maximum number of transactions to return
 * @returns {Promise<Array>} Array of transaction objects
 */
export async function fetchBlockchainTransactions(limit = 10) {
    try {
        // Fetch all transactions to the contract address using V2 API
        const url = new URL(ETHERSCAN_API_URL);
        url.searchParams.set('chainid', String(SEPOLIA_CHAIN_ID)); // Required for V2
        url.searchParams.set('module', 'account');
        url.searchParams.set('action', 'txlist');
        url.searchParams.set('address', CONTRACT_ADDRESS);
        url.searchParams.set('startblock', '0');
        url.searchParams.set('endblock', '99999999');
        url.searchParams.set('page', '1');
        url.searchParams.set('offset', String(limit));
        url.searchParams.set('sort', 'desc');
        url.searchParams.set('apikey', ETHERSCAN_API_KEY);

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Etherscan API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== '1' || !data.result) {
            // No transactions found or API error
            console.log('Etherscan response:', data);
            return [];
        }

        // Transform Etherscan data to our format
        const transactions = data.result
            .filter(tx => tx.value !== '0') // Only include transactions with ETH value (donations)
            .map((tx, index) => ({
                id: `tx_${tx.hash.slice(0, 8)}`,
                donor: tx.from,
                amount: formatWeiToEth(tx.value),
                currency: 'ETH',
                timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
                txHash: formatTxHash(tx.hash),
                fullTxHash: tx.hash,
                blockNumber: tx.blockNumber,
                gasUsed: tx.gasUsed,
                isError: tx.isError === '1'
            }))
            .filter(tx => !tx.isError); // Exclude failed transactions

        return transactions;
    } catch (error) {
        console.error('Failed to fetch blockchain transactions:', error);
        throw error;
    }
}

/**
 * Fetches internal transactions (for contract interactions).
 * @param {number} limit - Maximum number of transactions
 * @returns {Promise<Array>} Array of transaction objects
 */
export async function fetchInternalTransactions(limit = 10) {
    try {
        const url = new URL(ETHERSCAN_API_URL);
        url.searchParams.set('module', 'account');
        url.searchParams.set('action', 'txlistinternal');
        url.searchParams.set('address', CONTRACT_ADDRESS);
        url.searchParams.set('startblock', '0');
        url.searchParams.set('endblock', '99999999');
        url.searchParams.set('page', '1');
        url.searchParams.set('offset', String(limit));
        url.searchParams.set('sort', 'desc');
        url.searchParams.set('apikey', ETHERSCAN_API_KEY);

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.status !== '1') {
            return [];
        }

        return data.result || [];
    } catch (error) {
        console.error('Failed to fetch internal transactions:', error);
        return [];
    }
}

/**
 * Converts Wei to ETH with proper formatting.
 * @param {string} weiValue - Value in Wei
 * @returns {string} Formatted ETH value
 */
function formatWeiToEth(weiValue) {
    const eth = parseFloat(weiValue) / 1e18;
    // Format to show up to 6 decimal places, remove trailing zeros
    return eth.toFixed(6).replace(/\.?0+$/, '') || '0';
}

/**
 * Formats transaction hash for display.
 * @param {string} hash - Full transaction hash
 * @returns {string} Shortened hash (0x1234...5678)
 */
function formatTxHash(hash) {
    if (!hash || hash.length < 16) return hash;
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

/**
 * Gets Etherscan link for a transaction.
 * @param {string} txHash - Full transaction hash
 * @returns {string} Etherscan URL
 */
export function getEtherscanTxLink(txHash) {
    return `https://sepolia.etherscan.io/tx/${txHash}`;
}

/**
 * Gets Etherscan link for an address.
 * @param {string} address - Ethereum address
 * @returns {string} Etherscan URL
 */
export function getEtherscanAddressLink(address) {
    return `https://sepolia.etherscan.io/address/${address}`;
}
