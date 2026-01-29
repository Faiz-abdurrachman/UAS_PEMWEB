import { formatAddress, formatDate } from '../utils';
import './TransactionList.css';

/**
 * Display transaction list from backend API
 * Demonstrates off-chain data integration
 */
export function TransactionList({ transactions, meta, isLoading, error, onRefresh }) {
    return (
        <div className="transaction-list card">
            <div className="card-header">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="card-title">📜 Transaction History</h3>
                        <p className="card-subtitle">Off-chain transaction data from API</p>
                    </div>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={onRefresh}
                        disabled={isLoading}
                    >
                        {isLoading ? <span className="spinner"></span> : '🔄'} Refresh
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="alert alert-error">
                    <span>⚠️</span>
                    <div>
                        <strong>{error.code}</strong>: {error.message}
                    </div>
                </div>
            )}

            {/* Loading State */}
            {isLoading && !transactions.length && (
                <div className="transaction-loading">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="transaction-item-skeleton">
                            <div className="skeleton" style={{ width: '40%', height: '16px' }}></div>
                            <div className="skeleton" style={{ width: '25%', height: '14px', marginTop: '8px' }}></div>
                        </div>
                    ))}
                </div>
            )}

            {/* Transaction List */}
            {!isLoading && transactions.length > 0 && (
                <>
                    <div className="transaction-items">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="transaction-item">
                                <div className="tx-main">
                                    <div className="tx-info">
                                        <span className="tx-from">{formatAddress(tx.from, 6)}</span>
                                        <span className="tx-time">{formatDate(tx.timestamp)}</span>
                                    </div>
                                    <div className="tx-amount">
                                        <span className="amount-value">+{tx.amount}</span>
                                        <span className="amount-unit">ETH</span>
                                    </div>
                                </div>
                                <div className="tx-meta">
                                    <span className="badge badge-success">{tx.status}</span>
                                    <span className="tx-hash">Block #{tx.blockNumber}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Footer */}
                    {meta && (
                        <div className="transaction-summary">
                            <div className="summary-item">
                                <span className="summary-value">{meta.count}</span>
                                <span className="summary-label">Transactions</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-item">
                                <span className="summary-value">{meta.totalAmount}</span>
                                <span className="summary-label">Total ETH</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-item">
                                <span className="summary-badge">{meta.source}</span>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Empty State */}
            {!isLoading && !error && transactions.length === 0 && (
                <div className="transaction-empty">
                    <span className="empty-icon">📭</span>
                    <p>No transactions found</p>
                </div>
            )}
        </div>
    );
}
