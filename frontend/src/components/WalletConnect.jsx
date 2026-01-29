import './WalletConnect.css';

/**
 * Wallet connection component with comprehensive error handling
 * Displays appropriate UI based on connection state
 */
export function WalletConnect({
    isConnected,
    isConnecting,
    isMetaMaskInstalled,
    isCorrectNetwork,
    error,
    onConnect,
    onSwitchNetwork
}) {
    // MetaMask not installed
    if (!isMetaMaskInstalled) {
        return (
            <div className="wallet-connect card">
                <div className="wallet-connect-content">
                    <div className="wallet-icon wallet-icon-warning">🦊</div>
                    <h3>MetaMask Required</h3>
                    <p>Please install MetaMask browser extension to connect your wallet and make donations.</p>
                    <a
                        href="https://metamask.io/download/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-lg"
                    >
                        Install MetaMask
                    </a>
                </div>
            </div>
        );
    }

    // Already connected
    if (isConnected) {
        // Wrong network warning
        if (!isCorrectNetwork) {
            return (
                <div className="wallet-connect card wallet-connect-warning">
                    <div className="wallet-connect-content">
                        <div className="wallet-icon wallet-icon-warning">⚠️</div>
                        <h3>Wrong Network</h3>
                        <p>Please switch to Sepolia testnet to use this application.</p>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={onSwitchNetwork}
                        >
                            Switch to Sepolia
                        </button>
                    </div>
                </div>
            );
        }

        // Connected successfully - don't render anything (header shows wallet info)
        return null;
    }

    // Not connected - show connect UI
    return (
        <div className="wallet-connect card">
            <div className="wallet-connect-content">
                <div className="wallet-icon">🔗</div>
                <h3>Connect Your Wallet</h3>
                <p>Connect your MetaMask wallet to view donation stats and make contributions.</p>

                {error && (
                    <div className="alert alert-error">
                        <span>⚠️</span>
                        {error.message}
                    </div>
                )}

                <button
                    className="btn btn-primary btn-lg"
                    onClick={onConnect}
                    disabled={isConnecting}
                >
                    {isConnecting ? (
                        <>
                            <span className="spinner"></span>
                            Connecting...
                        </>
                    ) : (
                        'Connect MetaMask'
                    )}
                </button>
            </div>
        </div>
    );
}
