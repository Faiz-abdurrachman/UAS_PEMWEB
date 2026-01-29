import { useWallet, useDonation, useTransactions } from './hooks';
import {
    Header,
    WalletConnect,
    DonationStats,
    DonationForm,
    TransactionList
} from './components';
import './styles/App.css';

/**
 * Main Application Component
 * Orchestrates wallet connection, donation flow, and data display
 */
function App() {
    // Wallet connection hook
    const {
        account,
        balance,
        isConnecting,
        isMetaMaskInstalled,
        isConnected,
        isCorrectNetwork,
        error: walletError,
        provider,
        connect,
        disconnect,
        switchToSepolia
    } = useWallet();

    // Donation hook (requires provider and account)
    const {
        stats,
        isLoading: isLoadingStats,
        isDonating,
        error: donationError,
        txHash,
        contractDeployed,
        donate,
        clearError: clearDonationError
    } = useDonation(provider, account);

    // Backend transactions hook
    const {
        transactions,
        meta,
        isLoading: isLoadingTx,
        error: txError,
        refresh: refreshTransactions
    } = useTransactions();

    return (
        <div className="app">
            {/* Header with wallet status */}
            <Header
                account={account}
                balance={balance}
                onDisconnect={disconnect}
            />

            <main className="main">
                <div className="container">
                    {/* Hero Section */}
                    <section className="hero">
                        <h1 className="hero-title">
                            Transparent <span className="text-gradient">Web3</span> Donations
                        </h1>
                        <p className="hero-subtitle">
                            Make verifiable donations on the Ethereum blockchain.
                            Every contribution is recorded on-chain for complete transparency.
                        </p>
                    </section>

                    {/* Wallet Connection (shown when not connected) */}
                    {!isConnected && (
                        <section className="section">
                            <WalletConnect
                                isConnected={isConnected}
                                isConnecting={isConnecting}
                                isMetaMaskInstalled={isMetaMaskInstalled}
                                isCorrectNetwork={isCorrectNetwork}
                                error={walletError}
                                onConnect={connect}
                                onSwitchNetwork={switchToSepolia}
                            />
                        </section>
                    )}

                    {/* Network Warning (shown when connected to wrong network) */}
                    {isConnected && !isCorrectNetwork && (
                        <section className="section">
                            <WalletConnect
                                isConnected={isConnected}
                                isConnecting={false}
                                isMetaMaskInstalled={true}
                                isCorrectNetwork={isCorrectNetwork}
                                error={walletError}
                                onConnect={connect}
                                onSwitchNetwork={switchToSepolia}
                            />
                        </section>
                    )}

                    {/* Main Content Grid */}
                    <section className="section">
                        <div className="grid grid-2">
                            {/* Donation Form */}
                            <DonationForm
                                onDonate={donate}
                                isDonating={isDonating}
                                error={donationError}
                                txHash={txHash}
                                onClearError={clearDonationError}
                                contractDeployed={contractDeployed}
                                isConnected={isConnected && isCorrectNetwork}
                            />

                            {/* On-Chain Stats */}
                            <DonationStats
                                stats={stats}
                                isLoading={isLoadingStats}
                                contractDeployed={contractDeployed}
                            />
                        </div>
                    </section>

                    {/* Transaction History from API */}
                    <section className="section">
                        <TransactionList
                            transactions={transactions}
                            meta={meta}
                            isLoading={isLoadingTx}
                            error={txError}
                            onRefresh={refreshTransactions}
                        />
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>
                        Built for UAS Pemrograman Web • Ethereum Sepolia Testnet
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
