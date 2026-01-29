import { useState, useCallback, useEffect } from 'react';
import { API_URL } from '../config/contract';

/**
 * Custom hook for fetching transaction data from backend API
 * Demonstrates off-chain data integration
 */
export function useTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [meta, setMeta] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch transactions from backend API
     */
    const fetchTransactions = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/api/transactions`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();

            if (result.success) {
                setTransactions(result.data.transactions);
                setMeta(result.data.meta);
            } else {
                throw new Error(result.error?.message || 'Failed to fetch transactions');
            }
        } catch (err) {
            console.error('Failed to fetch transactions:', err);

            // Distinguish between network errors and API errors
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                setError({
                    code: 'NETWORK_ERROR',
                    message: 'Cannot connect to backend server. Make sure it is running.'
                });
            } else {
                setError({
                    code: 'FETCH_FAILED',
                    message: err.message || 'Failed to load transactions'
                });
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch on mount
    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return {
        transactions,
        meta,
        isLoading,
        error,
        refresh: fetchTransactions
    };
}
