import { useState } from 'react';

/**
 * DonationForm Component
 * Input form for making ETH donations.
 * Handles validation and transaction status feedback.
 */
export function DonationForm({
    onDonate,
    isConnected,
    txStatus,
    error,
    onClearError,
    onClearTxStatus
}) {
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || parseFloat(amount) <= 0) return;

        const success = await onDonate(amount);
        if (success) {
            setAmount('');
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Allow only valid decimal numbers
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const getStatusMessage = () => {
        switch (txStatus) {
            case 'pending':
                return 'Waiting for wallet confirmation...';
            case 'confirming':
                return 'Transaction submitted. Waiting for confirmation...';
            case 'confirmed':
                return 'Donation successful!';
            case 'failed':
                return 'Transaction failed.';
            default:
                return null;
        }
    };

    const statusMessage = getStatusMessage();

    return (
        <div className="donation-form-container">
            <h2>Make a Donation</h2>

            {error && (
                <div className="form-error">
                    <span>{error}</span>
                    <button
                        className="error-dismiss"
                        onClick={onClearError}
                        aria-label="Dismiss error"
                    >
                        x
                    </button>
                </div>
            )}

            {statusMessage && (
                <div className={`tx-status tx-status-${txStatus}`}>
                    <span>{statusMessage}</span>
                    {(txStatus === 'confirmed' || txStatus === 'failed') && (
                        <button
                            className="error-dismiss"
                            onClick={onClearTxStatus}
                            aria-label="Dismiss status"
                        >
                            x
                        </button>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit} className="donation-form">
                <div className="input-group">
                    <input
                        type="text"
                        inputMode="decimal"
                        placeholder="0.01"
                        value={amount}
                        onChange={handleAmountChange}
                        disabled={!isConnected || txStatus === 'pending' || txStatus === 'confirming'}
                        className="donation-input"
                    />
                    <span className="input-suffix">ETH</span>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-donate"
                    disabled={!isConnected || !amount || txStatus === 'pending' || txStatus === 'confirming'}
                >
                    {txStatus === 'pending' || txStatus === 'confirming'
                        ? 'Processing...'
                        : 'Donate'}
                </button>
            </form>

            {!isConnected && (
                <p className="form-hint">Connect your wallet to make a donation.</p>
            )}
        </div>
    );
}
