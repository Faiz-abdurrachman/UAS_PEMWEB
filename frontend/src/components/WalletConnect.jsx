/**
 * WalletConnect Component
 * Displays wallet connection button, address, and balance.
 * Handles connection states and errors.
 */
export function WalletConnect({
    account,
    balance,
    error,
    isConnecting,
    onConnect,
    onDisconnect,
    onClearError
}) {
    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="wallet-connect">
            {error && (
                <div className="wallet-error">
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

            {!account ? (
                <button
                    className="btn btn-primary"
                    onClick={onConnect}
                    disabled={isConnecting}
                >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
            ) : (
                <div className="wallet-info">
                    <div className="wallet-details">
                        <span className="wallet-label">Connected</span>
                        <span className="wallet-address">{formatAddress(account)}</span>
                        <span className="wallet-balance">{parseFloat(balance).toFixed(4)} ETH</span>
                    </div>
                    <button
                        className="btn btn-secondary"
                        onClick={onDisconnect}
                    >
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
}
