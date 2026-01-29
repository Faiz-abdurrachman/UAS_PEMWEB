import { useState, useEffect, useCallback } from 'react';
import { Contract, parseEther, formatEther } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/contractConfig';

/**
 * Custom hook for interacting with DonationTransparent contract.
 * Provides read and write functions for donation operations.
 */
export function useContract(signer, provider) {
    const [contract, setContract] = useState(null);
    const [totalDonations, setTotalDonations] = useState('0');
    const [donorCount, setDonorCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [txStatus, setTxStatus] = useState(null);

    // Initialize contract instance when signer is available
    useEffect(() => {
        if (signer && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000') {
            const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            setContract(contractInstance);
        } else if (provider && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000') {
            // Read-only instance if no signer
            const contractInstance = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
            setContract(contractInstance);
        }
    }, [signer, provider]);

    const fetchContractData = useCallback(async () => {
        if (!contract) return;

        setIsLoading(true);
        setError(null);

        try {
            const [total, count] = await Promise.all([
                contract.getTotalDonations(),
                contract.getDonorCount()
            ]);

            setTotalDonations(formatEther(total));
            setDonorCount(Number(count));
        } catch (err) {
            console.error('Failed to fetch contract data:', err);
            setError('Failed to load donation data from contract.');
        } finally {
            setIsLoading(false);
        }
    }, [contract]);

    // Fetch data when contract is initialized
    useEffect(() => {
        fetchContractData();
    }, [fetchContractData]);

    const donate = useCallback(async (amountInEth) => {
        if (!contract || !signer) {
            setError('Wallet not connected.');
            return false;
        }

        if (!amountInEth || parseFloat(amountInEth) <= 0) {
            setError('Please enter a valid donation amount.');
            return false;
        }

        setError(null);
        setTxStatus('pending');

        try {
            const tx = await contract.donate({
                value: parseEther(amountInEth)
            });

            setTxStatus('confirming');
            await tx.wait();

            setTxStatus('confirmed');

            // Refresh data after successful donation
            await fetchContractData();

            return true;
        } catch (err) {
            console.error('Donation failed:', err);

            if (err.code === 'ACTION_REJECTED') {
                setError('Transaction rejected by user.');
            } else if (err.code === 'INSUFFICIENT_FUNDS') {
                setError('Insufficient ETH balance for this transaction.');
            } else {
                setError(err.message || 'Transaction failed.');
            }

            setTxStatus('failed');
            return false;
        }
    }, [contract, signer, fetchContractData]);

    const clearError = useCallback(() => setError(null), []);
    const clearTxStatus = useCallback(() => setTxStatus(null), []);

    return {
        contract,
        totalDonations,
        donorCount,
        isLoading,
        error,
        txStatus,
        donate,
        refresh: fetchContractData,
        clearError,
        clearTxStatus
    };
}
