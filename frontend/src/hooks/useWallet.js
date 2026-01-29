import { useState, useCallback } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import { SEPOLIA_CHAIN_ID } from '../utils/contractConfig';

/**
 * Custom hook for MetaMask wallet connection.
 * Handles connection, network validation, and balance retrieval.
 */
export function useWallet() {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [error, setError] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const clearError = useCallback(() => setError(null), []);

    const checkNetwork = useCallback(async (provider) => {
        const network = await provider.getNetwork();
        const chainId = Number(network.chainId);

        if (chainId !== SEPOLIA_CHAIN_ID) {
            throw new Error(
                `Wrong network. Please switch to Sepolia testnet. Current chain ID: ${chainId}`
            );
        }
        return true;
    }, []);

    const connect = useCallback(async () => {
        setError(null);
        setIsConnecting(true);

        try {
            // Check if MetaMask is installed
            if (!window.ethereum) {
                throw new Error(
                    'MetaMask not detected. Please install MetaMask browser extension.'
                );
            }

            const browserProvider = new BrowserProvider(window.ethereum);

            // Request account access
            const accounts = await browserProvider.send('eth_requestAccounts', []);

            if (accounts.length === 0) {
                throw new Error('No accounts found. Please unlock MetaMask.');
            }

            // Validate network
            await checkNetwork(browserProvider);

            const walletSigner = await browserProvider.getSigner();
            const walletAddress = await walletSigner.getAddress();
            const walletBalance = await browserProvider.getBalance(walletAddress);

            setProvider(browserProvider);
            setSigner(walletSigner);
            setAccount(walletAddress);
            setBalance(formatEther(walletBalance));

        } catch (err) {
            // Handle specific MetaMask errors
            if (err.code === 4001) {
                setError('Connection rejected by user.');
            } else if (err.code === -32002) {
                setError('Connection request pending. Check MetaMask.');
            } else {
                setError(err.message || 'Failed to connect wallet.');
            }
            setAccount(null);
            setBalance(null);
        } finally {
            setIsConnecting(false);
        }
    }, [checkNetwork]);

    const disconnect = useCallback(() => {
        setAccount(null);
        setBalance(null);
        setProvider(null);
        setSigner(null);
        setError(null);
    }, []);

    const refreshBalance = useCallback(async () => {
        if (!provider || !account) return;

        try {
            const walletBalance = await provider.getBalance(account);
            setBalance(formatEther(walletBalance));
        } catch (err) {
            console.error('Failed to refresh balance:', err);
        }
    }, [provider, account]);

    return {
        account,
        balance,
        provider,
        signer,
        error,
        isConnecting,
        connect,
        disconnect,
        refreshBalance,
        clearError
    };
}
