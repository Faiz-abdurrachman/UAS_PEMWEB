import { useState } from 'react';
import { isValidEthAmount, getEtherscanUrl } from '../utils';
import './DonationForm.css';

/**
 * Donation form component for sending ETH to the smart contract
 */
export function DonationForm({
    onDonate,
    isDonating,
    error,
    txHash,
    onClearError,
    contractDeployed,
    isConnected
}) {
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEthAmount(amount)) return;

        const success = await onDonate(amount);
        if (success) {
            setAmount(''); // Clear form on success
        }
    };

    const handleAmountChange = (e) => {
        // Clear previous errors when user starts typing
        if (error) onClearError();

        // Only allow valid decimal numbers
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    // Quick amount buttons
    const quickAmounts = ['0.01', '0.05', '0.1', '0.5'];

    // Not connected message
    if (!isConnected) {
        return (
            <div className="donation-form card">
                <div className="card-header">
                    <h3 className="card-title">💝 Make a Donation</h3>
                    <p className="card-subtitle">Send ETH to support the cause</p>
                </div>
                <div className="form-notice">
                    <span>🔗</span>
                    <p>Connect your wallet to make a donation</p>
                </div>
            </div>
        );
    }

    // Contract not deployed message
    if (!contractDeployed) {
        return (
            <div className="donation-form card">
                <div className="card-header">
                    <h3 className="card-title">💝 Make a Donation</h3>
                    <p className="card-subtitle">Send ETH to support the cause</p>
                </div>
                <div className="form-notice">
                    <span>ℹ️</span>
                    <p>Contract not yet deployed. Donations will be available once deployed to Sepolia.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="donation-form card">
            <div className="card-header">
                <h3 className="card-title">💝 Make a Donation</h3>
                <p className="card-subtitle">Send ETH to support the cause</p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Amount Input */}
                <div className="input-group">
                    <label className="input-label">Donation Amount</label>
                    <div className="input-with-suffix">
                        <input
                            type="text"
                            inputMode="decimal"
                            className="input"
                            placeholder="0.00"
                            value={amount}
                            onChange={handleAmountChange}
                            disabled={isDonating}
                        />
                        <span className="input-suffix">ETH</span>
                    </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="quick-amounts">
                    {quickAmounts.map((quickAmount) => (
                        <button
                            key={quickAmount}
                            type="button"
                            className="quick-amount-btn"
                            onClick={() => setAmount(quickAmount)}
                            disabled={isDonating}
                        >
                            {quickAmount} ETH
                        </button>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-error">
                        <span>⚠️</span>
                        {error.message}
                    </div>
                )}

                {/* Success Message with TX Link */}
                {txHash && (
                    <div className="alert alert-success">
                        <span>✅</span>
                        <div>
                            Donation successful!{' '}
                            <a
                                href={getEtherscanUrl(txHash)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View on Etherscan →
                            </a>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    disabled={isDonating || !isValidEthAmount(amount)}
                >
                    {isDonating ? (
                        <>
                            <span className="spinner"></span>
                            Processing...
                        </>
                    ) : (
                        `Donate ${amount || '0'} ETH`
                    )}
                </button>
            </form>
        </div>
    );
}
