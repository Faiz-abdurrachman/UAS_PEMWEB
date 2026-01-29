import { useState, useCallback, useEffect } from 'react';
import { Contract, parseEther, formatEther } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, isContractDeployed } from '../config/contract';

/**
 * Custom hook for interacting with the Donation smart contract
 * Handles reading donation stats and sending donations
 */
export function useDonation(provider, account) {
    const [stats, setStats] = useState({
        totalDonations: '0',
        donationCount: 0,
        uniqueDonors: 0,
        userContribution: '0'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDonating, setIsDonating] = useState(false);
    const [error, setError] = useState(null);
    const [txHash, setTxHash] = useState(null);

    const contractDeployed = isContractDeployed();

    /**
     * Fetch donation statistics from the smart contract
     */
    const fetchStats = useCallback(async () => {
        if (!provider || !contractDeployed) return;

        setIsLoading(true);
        setError(null);

        try {
            const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

            // Fetch all stats in parallel for efficiency
            const [totalDonations, donationCount, uniqueDonors, userContribution] = await Promise.all([
                contract.getTotalDonations(),
                contract.getDonationCount(),
                contract.getUniqueDonorCount(),
                account ? contract.getDonorContribution(account) : Promise.resolve(0n)
            ]);

            setStats({
                totalDonations: formatEther(totalDonations),
                donationCount: Number(donationCount),
                uniqueDonors: Number(uniqueDonors),
                userContribution: formatEther(userContribution)
            });
        } catch (err) {
            console.error('Failed to fetch donation stats:', err);
            setError({
                code: 'FETCH_FAILED',
                message: 'Failed to load donation data from contract'
            });
        } finally {
            setIsLoading(false);
        }
    }, [provider, account, contractDeployed]);

    /**
     * Send a donation to the smart contract
     * @param {string} amountEth - Amount to donate in ETH
     */
    const donate = useCallback(async (amountEth) => {
        if (!provider || !account || !contractDeployed) {
            setError({
                code: 'NOT_READY',
                message: 'Please connect your wallet first'
            });
            return false;
        }

        // Validate amount
        const amount = parseFloat(amountEth);
        if (isNaN(amount) || amount <= 0) {
            setError({
                code: 'INVALID_AMOUNT',
                message: 'Please enter a valid donation amount'
            });
            return false;
        }

        setIsDonating(true);
        setError(null);
        setTxHash(null);

        try {
            const signer = await provider.getSigner();
            const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            // Send donation transaction
            const tx = await contract.donate({
                value: parseEther(amountEth)
            });

            setTxHash(tx.hash);

            // Wait for confirmation
            await tx.wait();

            // Refresh stats after successful donation
            await fetchStats();

            return true;
        } catch (err) {
            console.error('Donation failed:', err);

            // Handle specific error cases
            if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
                setError({
                    code: 'USER_REJECTED',
                    message: 'Transaction was rejected'
                });
            } else if (err.code === 'INSUFFICIENT_FUNDS') {
                setError({
                    code: 'INSUFFICIENT_FUNDS',
                    message: 'Insufficient ETH balance for this donation'
                });
            } else {
                setError({
                    code: 'TRANSACTION_FAILED',
                    message: err.reason || err.message || 'Transaction failed'
                });
            }

            return false;
        } finally {
            setIsDonating(false);
        }
    }, [provider, account, contractDeployed, fetchStats]);

    // Fetch stats when provider or account changes
    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return {
        // State
        stats,
        isLoading,
        isDonating,
        error,
        txHash,

        // Computed
        contractDeployed,

        // Actions
        donate,
        refreshStats: fetchStats,
        clearError: () => setError(null)
    };
}
