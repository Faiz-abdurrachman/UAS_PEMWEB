import { formatAddress } from '../utils';
import './Header.css';

/**
 * Header component with branding and wallet status
 */
export function Header({ account, balance, onDisconnect }) {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo & Branding */}
                    <div className="header-brand">
                        <div className="header-logo">
                            <span className="logo-icon">💎</span>
                        </div>
                        <div className="header-title">
                            <h1>DonateChain</h1>
                            <span className="header-network">Sepolia Testnet</span>
                        </div>
                    </div>

                    {/* Wallet Info (when connected) */}
                    {account && (
                        <div className="header-wallet">
                            <div className="wallet-info">
                                <span className="wallet-balance">{parseFloat(balance).toFixed(4)} ETH</span>
                                <span className="wallet-address">{formatAddress(account)}</span>
                            </div>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={onDisconnect}
                            >
                                Disconnect
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
