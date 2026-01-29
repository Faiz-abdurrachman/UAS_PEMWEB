/**
 * Simulated off-chain transaction data
 * In production, this would come from a database or blockchain indexer
 */
const MOCK_TRANSACTIONS = [
    {
        id: 'tx_001',
        hash: '0x8a7d3b9c1e2f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
        from: '0x742d35Cc6634C0532925a3b844Bc9e7595f8bE21',
        amount: '0.05',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'confirmed',
        blockNumber: 4892156
    },
    {
        id: 'tx_002',
        hash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
        from: '0x9Af3C8B7D6E5F4A3B2C1D0E9F8A7B6C5D4E3F2A1',
        amount: '0.1',
        timestamp: '2024-01-15T14:45:00Z',
        status: 'confirmed',
        blockNumber: 4892342
    },
    {
        id: 'tx_003',
        hash: '0x3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e',
        from: '0xFe8B9C7D6E5F4A3B2C1D0E9F8A7B6C5D4E3F2A1B',
        amount: '0.25',
        timestamp: '2024-01-16T09:15:00Z',
        status: 'confirmed',
        blockNumber: 4893021
    },
    {
        id: 'tx_004',
        hash: '0x5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a',
        from: '0xAb1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8B9C',
        amount: '0.075',
        timestamp: '2024-01-16T16:30:00Z',
        status: 'confirmed',
        blockNumber: 4893456
    },
    {
        id: 'tx_005',
        hash: '0x7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c',
        from: '0x123456789AbCdEf0123456789aBcDeF012345678',
        amount: '0.5',
        timestamp: '2024-01-17T11:00:00Z',
        status: 'confirmed',
        blockNumber: 4894102
    }
];

/**
 * Get all simulated transactions
 * @param {import('express').Request} _req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const getTransactions = (_req, res) => {
    // Calculate summary statistics
    const totalAmount = MOCK_TRANSACTIONS.reduce(
        (sum, tx) => sum + parseFloat(tx.amount),
        0
    );

    res.json({
        success: true,
        data: {
            transactions: MOCK_TRANSACTIONS,
            meta: {
                count: MOCK_TRANSACTIONS.length,
                totalAmount: totalAmount.toFixed(4),
                currency: 'ETH',
                source: 'off-chain-simulation'
            }
        },
        timestamp: new Date().toISOString()
    });
};
