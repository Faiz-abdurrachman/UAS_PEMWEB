import { useState } from 'react';

/**
 * DonationForm Component
 * Input form for making ETH donations.
 * Handles validation and transaction status feedback with improved UX.
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

    const getStatusConfig = () => {
        switch (txStatus) {
            case 'pending':
                return {
                    message: 'Waiting for wallet confirmation...',
                    icon: '🔐',
                    showSpinner: true
                };
            case 'confirming':
                return {
                    message: 'Transaction submitted! Confirming on blockchain...',
                    icon: '⛓️',
                    showSpinner: true
                };
            case 'confirmed':
                return {
                    message: 'Donation successful!',
                    icon: '✅',
                    showSpinner: false
                };
            case 'failed':
                return {
                    message: 'Transaction failed.',
                    icon: '❌',
                    showSpinner: false
                };
            default:
                return null;
        }
    };

    const statusConfig = getStatusConfig();
    const isProcessing = txStatus === 'pending' || txStatus === 'confirming';

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
                        ×
                    </button>
                </div>
            )}

            {statusConfig && (
                <div className={`tx-status tx-status-${txStatus}`}>
                    <div className="tx-status-content">
                        {statusConfig.showSpinner && (
                            <div className="tx-spinner"></div>
                        )}
                        <span className="tx-icon">{statusConfig.icon}</span>
                        <span className="tx-message">{statusConfig.message}</span>
                    </div>
                    {(txStatus === 'confirmed' || txStatus === 'failed') && (
                        <button
                            className="error-dismiss"
                            onClick={onClearTxStatus}
                            aria-label="Dismiss status"
                        >
                            ×
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
                        disabled={!isConnected || isProcessing}
                        className="donation-input"
                    />
                    <span className="input-suffix">ETH</span>
                </div>

                <button
                    type="submit"
                    className={`btn btn-primary btn-donate ${isProcessing ? 'btn-processing' : ''}`}
                    disabled={!isConnected || !amount || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <span className="btn-spinner"></span>
                            Processing...
                        </>
                    ) : (
                        'Donate'
                    )}
                </button>
            </form>

            {!isConnected && (
                <p className="form-hint">Connect your wallet to make a donation.</p>
            )}
        </div>
    );
}
