/**
 * DonationStats Component
 * Displays total donations and donor count from the smart contract.
 */
export function DonationStats({ totalDonations, donorCount, isLoading }) {
    return (
        <div className="donation-stats">
            <h2>Donation Statistics</h2>

            {isLoading ? (
                <div className="stats-loading">Loading contract data...</div>
            ) : (
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-value">{parseFloat(totalDonations).toFixed(4)}</span>
                        <span className="stat-label">Total ETH Donated</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-value">{donorCount}</span>
                        <span className="stat-label">Unique Donors</span>
                    </div>
                </div>
            )}
        </div>
    );
}
