import { useState, useEffect, useCallback } from 'react';
import {
    fetchBlockchainTransactions,
    getEtherscanTxLink,
    getEtherscanAddressLink
} from '../utils/blockchainApi';

/**
 * TransactionList Component
 * Fetches and displays on-chain transaction data from Etherscan API.
 * Shows real blockchain transactions to the donation contract.
 * Fulfills UAS requirement (c): Reading data from smart contract/blockchain.
 */
export function TransactionList({ refreshTrigger }) {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTransactions = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchBlockchainTransactions(10);
            setTransactions(data);
        } catch (err) {
            console.error('Failed to load transactions:', err);
            setError('Unable to load transaction history from blockchain.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    // Refresh when triggered (e.g., after a new donation)
    useEffect(() => {
        if (refreshTrigger) {
            // Delay refresh to allow blockchain indexing
            const timer = setTimeout(() => {
                loadTransactions();
            }, 5000); // 5 second delay for Etherscan to index the tx

            return () => clearTimeout(timer);
        }
    }, [refreshTrigger, loadTransactions]);

    const formatAddress = (address) => {
        if (!address || address.length < 10) return address;
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleRefresh = () => {
        loadTransactions();
    };

    if (isLoading) {
        return (
            <div className="transaction-list blockchain-list">
                <div className="list-header">
                    <h2>On-chain Transactions</h2>
                    <span className="badge badge-blockchain">Blockchain</span>
                </div>
                <div className="list-loading">
                    <div className="loading-spinner"></div>
                    <span>Loading from blockchain...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="transaction-list blockchain-list">
                <div className="list-header">
                    <h2>On-chain Transactions</h2>
                    <span className="badge badge-blockchain">Blockchain</span>
                </div>
                <div className="list-error">{error}</div>
                <button className="refresh-btn" onClick={handleRefresh}>
                    ↻ Retry
                </button>
            </div>
        );
    }

    return (
        <div className="transaction-list blockchain-list">
            <div className="list-header">
                <h2>On-chain Transactions</h2>
                <span className="badge badge-blockchain">Blockchain</span>
            </div>

            <button
                className="refresh-btn"
                onClick={handleRefresh}
                title="Refresh transactions"
                style={{ marginBottom: '16px' }}
            >
                ↻ Refresh
            </button>

            {transactions.length === 0 ? (
                <p className="list-empty">No donations found on blockchain yet.</p>
            ) : (
                <div className="transactions-table-wrapper">
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Donor</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Tx Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id}>
                                    <td className="cell-address">
                                        <a
                                            href={getEtherscanAddressLink(tx.donor)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="etherscan-link"
                                        >
                                            {formatAddress(tx.donor)}
                                        </a>
                                    </td>
                                    <td className="cell-amount">
                                        {tx.amount} {tx.currency}
                                    </td>
                                    <td className="cell-date">
                                        {formatDate(tx.timestamp)}
                                    </td>
                                    <td className="cell-hash">
                                        <a
                                            href={getEtherscanTxLink(tx.fullTxHash)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="etherscan-link"
                                        >
                                            {tx.txHash}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="blockchain-note">
                <small>
                    📡 Data fetched directly from Sepolia blockchain via Etherscan
                </small>
            </div>
        </div>
    );
}
