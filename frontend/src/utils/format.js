/**
 * Format Ethereum address for display
 * @param {string} address - Full Ethereum address
 * @param {number} chars - Characters to show at start/end
 */
export function formatAddress(address, chars = 4) {
    if (!address) return '';
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format ETH balance with specified decimals
 * @param {string|number} balance - Balance in ETH
 * @param {number} decimals - Decimal places to show
 */
export function formatBalance(balance, decimals = 4) {
    if (!balance) return '0';
    const num = parseFloat(balance);
    return num.toFixed(decimals);
}

/**
 * Format timestamp to locale date string
 * @param {string} timestamp - ISO timestamp
 */
export function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Generate Sepolia Etherscan URL for transaction
 * @param {string} txHash - Transaction hash
 */
export function getEtherscanUrl(txHash) {
    return `https://sepolia.etherscan.io/tx/${txHash}`;
}

/**
 * Validate ETH amount input
 * @param {string} value - Input value
 * @returns {boolean} - Whether value is valid
 */
export function isValidEthAmount(value) {
    if (!value) return false;
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
}
