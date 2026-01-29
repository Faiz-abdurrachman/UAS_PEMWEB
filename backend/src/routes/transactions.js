const express = require('express');
const router = express.Router();

/**
 * Simulated off-chain transaction data.
 * In production, this would come from a database or blockchain indexer.
 */
const mockTransactions = [
    {
        id: 'tx_001',
        donor: '0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21',
        amount: '0.05',
        currency: 'ETH',
        timestamp: '2026-01-28T10:30:00Z',
        txHash: '0x8a7d...3f2e'
    },
    {
        id: 'tx_002',
        donor: '0x8B3a5C...7F2d',
        amount: '0.1',
        currency: 'ETH',
        timestamp: '2026-01-28T14:15:00Z',
        txHash: '0x3c9b...8a1f'
    },
    {
        id: 'tx_003',
        donor: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
        amount: '0.25',
        currency: 'ETH',
        timestamp: '2026-01-29T09:45:00Z',
        txHash: '0x7f2e...4b3c'
    },
    {
        id: 'tx_004',
        donor: '0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6',
        amount: '0.02',
        currency: 'ETH',
        timestamp: '2026-01-29T16:20:00Z',
        txHash: '0x5d1a...9e8f'
    },
    {
        id: 'tx_005',
        donor: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
        amount: '0.5',
        currency: 'ETH',
        timestamp: '2026-01-30T08:00:00Z',
        txHash: '0x2b4f...6c7d'
    }
];

/**
 * GET /api/transactions
 * Returns list of simulated off-chain transaction records.
 * Query params:
 *   - limit: number of records to return (default: 10)
 */
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const transactions = mockTransactions.slice(0, limit);

    res.json({
        success: true,
        count: transactions.length,
        data: transactions
    });
});

/**
 * GET /api/transactions/:id
 * Returns a single transaction by ID.
 */
router.get('/:id', (req, res) => {
    const transaction = mockTransactions.find(tx => tx.id === req.params.id);

    if (!transaction) {
        return res.status(404).json({
            success: false,
            error: 'Transaction not found'
        });
    }

    res.json({
        success: true,
        data: transaction
    });
});

module.exports = router;
