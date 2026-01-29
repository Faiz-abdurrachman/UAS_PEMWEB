import { useState, useEffect } from 'react';

/**
 * TransactionList Component
 * Fetches and displays off-chain transaction data from backend API.
 */
export function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/transactions');

                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }

                const data = await response.json();
                setTransactions(data.data || []);
            } catch (err) {
                console.error('API fetch error:', err);
                setError('Unable to load transaction history.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

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

    if (isLoading) {
        return (
            <div className="transaction-list">
                <h2>Recent Transactions (Off-chain)</h2>
                <div className="list-loading">Loading transactions...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="transaction-list">
                <h2>Recent Transactions (Off-chain)</h2>
                <div className="list-error">{error}</div>
            </div>
        );
    }

    return (
        <div className="transaction-list">
            <h2>Recent Transactions (Off-chain)</h2>

            {transactions.length === 0 ? (
                <p className="list-empty">No transactions found.</p>
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
                                    <td className="cell-address">{formatAddress(tx.donor)}</td>
                                    <td className="cell-amount">{tx.amount} {tx.currency}</td>
                                    <td className="cell-date">{formatDate(tx.timestamp)}</td>
                                    <td className="cell-hash">{tx.txHash}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
