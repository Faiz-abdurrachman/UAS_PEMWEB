import { Router } from 'express';
import { getTransactions } from '../controllers/transactionController.js';

const router = Router();

/**
 * @route   GET /api/transactions
 * @desc    Retrieve simulated off-chain transaction data
 * @access  Public
 */
router.get('/transactions', getTransactions);

export default router;
