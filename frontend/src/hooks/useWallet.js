import { useState, useCallback, useEffect } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import { SEPOLIA_CHAIN_ID, NETWORK_NAME } from '../config/contract';

/**
 * Custom hook for MetaMask wallet connection and management
 * Handles connection, disconnection, balance fetching, and network validation
 */
export function useWallet() {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [provider, setProvider] = useState(null);

    // Check if MetaMask is installed
    const isMetaMaskInstalled = typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask);

    // Validate network is Sepolia
    const isCorrectNetwork = chainId === SEPOLIA_CHAIN_ID;

    /**
     * Fetch ETH balance for connected account
     */
    const fetchBalance = useCallback(async (address, browserProvider) => {
        try {
            const balanceWei = await browserProvider.getBalance(address);
            setBalance(formatEther(balanceWei));
        } catch (err) {
            console.error('Failed to fetch balance:', err);
            setBalance(null);
        }
    }, []);

    /**
     * Connect to MetaMask wallet
     */
    const connect = useCallback(async () => {
        // Clear previous errors
        setError(null);

        // Check MetaMask installation
        if (!isMetaMaskInstalled) {
            setError({
                code: 'METAMASK_NOT_INSTALLED',
                message: 'MetaMask is not installed. Please install MetaMask extension to continue.'
            });
            return;
        }

        setIsConnecting(true);

        try {
            const browserProvider = new BrowserProvider(window.ethereum);

            // Request account access
            const accounts = await browserProvider.send('eth_requestAccounts', []);

            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }

            const address = accounts[0];

            // Get network info
            const network = await browserProvider.getNetwork();
            const currentChainId = Number(network.chainId);

            setProvider(browserProvider);
            setAccount(address);
            setChainId(currentChainId);

            // Fetch balance
            await fetchBalance(address, browserProvider);

            // Warn if wrong network (don't block connection)
            if (currentChainId !== SEPOLIA_CHAIN_ID) {
                setError({
                    code: 'WRONG_NETWORK',
                    message: `Please switch to ${NETWORK_NAME} testnet (Chain ID: ${SEPOLIA_CHAIN_ID})`
                });
            }
        } catch (err) {
            console.error('Connection error:', err);

            // Handle user rejection
            if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
                setError({
                    code: 'USER_REJECTED',
                    message: 'Connection request was rejected. Please try again.'
                });
            } else {
                setError({
                    code: 'CONNECTION_FAILED',
                    message: err.message || 'Failed to connect wallet'
                });
            }
        } finally {
            setIsConnecting(false);
        }
    }, [isMetaMaskInstalled, fetchBalance]);

    /**
     * Switch to Sepolia network
     */
    const switchToSepolia = useCallback(async () => {
        if (!window.ethereum) return;

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` }]
            });
            setError(null);
        } catch (err) {
            // Chain not added to MetaMask
            if (err.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
                            chainName: 'Sepolia Testnet',
                            nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
                            rpcUrls: ['https://sepolia.infura.io/v3/'],
                            blockExplorerUrls: ['https://sepolia.etherscan.io/']
                        }]
                    });
                } catch (addError) {
                    console.error('Failed to add Sepolia network:', addError);
                }
            }
        }
    }, []);

    /**
     * Disconnect wallet (clear state)
     */
    const disconnect = useCallback(() => {
        setAccount(null);
        setBalance(null);
        setChainId(null);
        setProvider(null);
        setError(null);
    }, []);

    /**
     * Listen for account and chain changes
     */
    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                disconnect();
            } else if (accounts[0] !== account) {
                setAccount(accounts[0]);
                if (provider) {
                    fetchBalance(accounts[0], provider);
                }
            }
        };

        const handleChainChanged = (chainIdHex) => {
            const newChainId = parseInt(chainIdHex, 16);
            setChainId(newChainId);

            if (newChainId !== SEPOLIA_CHAIN_ID) {
                setError({
                    code: 'WRONG_NETWORK',
                    message: `Please switch to ${NETWORK_NAME} testnet`
                });
            } else {
                setError(null);
            }
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
    }, [account, provider, disconnect, fetchBalance]);

    /**
     * Refresh balance manually
     */
    const refreshBalance = useCallback(async () => {
        if (account && provider) {
            await fetchBalance(account, provider);
        }
    }, [account, provider, fetchBalance]);

    return {
        // State
        account,
        balance,
        chainId,
        isConnecting,
        error,
        provider,

        // Computed
        isConnected: Boolean(account),
        isMetaMaskInstalled,
        isCorrectNetwork,

        // Actions
        connect,
        disconnect,
        switchToSepolia,
        refreshBalance
    };
}
