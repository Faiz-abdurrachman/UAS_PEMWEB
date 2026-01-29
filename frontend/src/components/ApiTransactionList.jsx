import { useState, useEffect } from 'react';

/**
 * ApiTransactionList Component
 * Fetches and displays transaction data from backend REST API.
 * This fulfills the UAS requirement (b): Backend endpoint with dummy data.
 */
export function ApiTransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Fetch from backend API (requirement b)
                const response = await fetch('http://localhost:3001/api/transactions');

                if (!response.ok) {
                    throw new Error('Failed to fetch from API');
                }

                const data = await response.json();
                setTransactions(data.data || []);
            } catch (err) {
                console.error('API fetch error:', err);
                setError('Backend API tidak tersedia. Pastikan backend sudah berjalan di port 3001.');
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
            <div className="transaction-list api-list">
                <div className="list-header">
                    <h2>API Transactions (Backend)</h2>
                    <span className="badge badge-api">REST API</span>
                </div>
                <div className="list-loading">
                    <div className="loading-spinner"></div>
                    <span>Loading from backend API...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="transaction-list api-list">
                <div className="list-header">
                    <h2>API Transactions (Backend)</h2>
                    <span className="badge badge-api">REST API</span>
                </div>
                <div className="list-error">{error}</div>
                <div className="api-hint">
                    <code>cd backend && npm run dev</code>
                </div>
            </div>
        );
    }

    return (
        <div className="transaction-list api-list">
            <div className="list-header">
                <h2>API Transactions (Backend)</h2>
                <span className="badge badge-api">REST API</span>
            </div>

            {transactions.length === 0 ? (
                <p className="list-empty">No transactions from API.</p>
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

            <div className="api-note">
                <small>
                    📦 Data dummy dari <code>GET /api/transactions</code> (Backend Express.js)
                </small>
            </div>
        </div>
    );
}
