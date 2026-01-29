import { formatBalance } from '../utils';
import './DonationStats.css';

/**
 * Display on-chain donation statistics from smart contract
 */
export function DonationStats({
    stats,
    isLoading,
    contractDeployed,
    userContribution
}) {
    // Contract not deployed message
    if (!contractDeployed) {
        return (
            <div className="donation-stats card">
                <div className="card-header">
                    <h3 className="card-title">📊 On-Chain Statistics</h3>
                    <p className="card-subtitle">Live data from smart contract</p>
                </div>
                <div className="stats-notice">
                    <span className="notice-icon">ℹ️</span>
                    <div>
                        <strong>Contract Not Deployed</strong>
                        <p>Deploy the Donation contract to Sepolia testnet to see live statistics.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="donation-stats card">
            <div className="card-header">
                <h3 className="card-title">📊 On-Chain Statistics</h3>
                <p className="card-subtitle">Live data from smart contract</p>
            </div>

            <div className="stats-grid">
                <div className="stat-item">
                    {isLoading ? (
                        <div className="skeleton stat-skeleton"></div>
                    ) : (
                        <>
                            <span className="stat-value">{formatBalance(stats.totalDonations, 4)}</span>
                            <span className="stat-unit">ETH</span>
                        </>
                    )}
                    <span className="stat-label">Total Donated</span>
                </div>

                <div className="stat-item">
                    {isLoading ? (
                        <div className="skeleton stat-skeleton"></div>
                    ) : (
                        <span className="stat-value">{stats.donationCount}</span>
                    )}
                    <span className="stat-label">Donations</span>
                </div>

                <div className="stat-item">
                    {isLoading ? (
                        <div className="skeleton stat-skeleton"></div>
                    ) : (
                        <span className="stat-value">{stats.uniqueDonors}</span>
                    )}
                    <span className="stat-label">Unique Donors</span>
                </div>

                <div className="stat-item stat-item-highlight">
                    {isLoading ? (
                        <div className="skeleton stat-skeleton"></div>
                    ) : (
                        <>
                            <span className="stat-value">{formatBalance(stats.userContribution, 4)}</span>
                            <span className="stat-unit">ETH</span>
                        </>
                    )}
                    <span className="stat-label">Your Contribution</span>
                </div>
            </div>
        </div>
    );
}
