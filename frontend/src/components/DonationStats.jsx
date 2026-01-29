/**
 * DonationStats Component
 * Displays total donations and donor count from the smart contract.
 * Includes skeleton loading for better UX.
 */
export function DonationStats({ totalDonations, donorCount, isLoading }) {
    return (
        <div className="donation-stats">
            <h2>Donation Statistics</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    {isLoading ? (
                        <>
                            <div className="skeleton skeleton-value"></div>
                            <span className="stat-label">Total ETH Donated</span>
                        </>
                    ) : (
                        <>
                            <span className="stat-value">{parseFloat(totalDonations).toFixed(4)}</span>
                            <span className="stat-label">Total ETH Donated</span>
                        </>
                    )}
                </div>
                <div className="stat-card">
                    {isLoading ? (
                        <>
                            <div className="skeleton skeleton-value"></div>
                            <span className="stat-label">Unique Donors</span>
                        </>
                    ) : (
                        <>
                            <span className="stat-value">{donorCount}</span>
                            <span className="stat-label">Unique Donors</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
