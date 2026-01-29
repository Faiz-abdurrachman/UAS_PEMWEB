import { useWallet } from './hooks/useWallet';
import { useContract } from './hooks/useContract';
import { WalletConnect } from './components/WalletConnect';
import { DonationForm } from './components/DonationForm';
import { DonationStats } from './components/DonationStats';
import { TransactionList } from './components/TransactionList';
import { ApiTransactionList } from './components/ApiTransactionList';

/**
 * Root application component.
 * Composes wallet connection, donation form, stats, and dual transaction lists.
 * 
 * UAS Requirements fulfilled:
 * - (a) Frontend: React + Ethers.js + wallet connection + balance display
 * - (b) Backend: API transactions from Express.js endpoint
 * - (c) Blockchain: Smart contract integration + on-chain transactions
 */
function App() {
    const {
        account,
        balance,
        provider,
        signer,
        error: walletError,
        isConnecting,
        connect,
        disconnect,
        refreshBalance,
        clearError: clearWalletError
    } = useWallet();

    const {
        totalDonations,
        donorCount,
        isLoading: contractLoading,
        error: contractError,
        txStatus,
        donate,
        clearError: clearContractError,
        clearTxStatus
    } = useContract(signer, provider);

    const handleDonate = async (amount) => {
        const success = await donate(amount);
        if (success) {
            refreshBalance();
        }
        return success;
    };

    return (
        <div className="app">
            <header className="header">
                <div className="container header-content">
                    <h1 className="logo">Transparent Donation</h1>
                    <WalletConnect
                        account={account}
                        balance={balance}
                        error={walletError}
                        isConnecting={isConnecting}
                        onConnect={connect}
                        onDisconnect={disconnect}
                        onClearError={clearWalletError}
                    />
                </div>
            </header>

            <main className="main">
                <div className="container">
                    <section className="hero">
                        <h2>Support Causes Transparently</h2>
                        <p>Every donation is recorded on the Ethereum blockchain, ensuring full transparency and accountability.</p>
                    </section>

                    {/* Primary Content: Form + Stats */}
                    <div className="content-grid">
                        <div className="content-primary">
                            <DonationForm
                                onDonate={handleDonate}
                                isConnected={!!account}
                                txStatus={txStatus}
                                error={contractError}
                                onClearError={clearContractError}
                                onClearTxStatus={clearTxStatus}
                            />

                            <DonationStats
                                totalDonations={totalDonations}
                                donorCount={donorCount}
                                isLoading={contractLoading}
                            />
                        </div>

                        {/* On-chain Transaction List (Blockchain) */}
                        <div className="content-secondary">
                            <TransactionList refreshTrigger={txStatus === 'confirmed'} />
                        </div>
                    </div>

                    {/* Backend API Transaction List (Dummy Data) */}
                    <section className="api-section">
                        <ApiTransactionList />
                    </section>
                </div>
            </main>

            <footer className="footer">
                <div className="container">
                    <p>Built for UAS Pemrograman Web | Sepolia Testnet</p>
                    <p className="footer-tech">React.js + Express.js + Solidity + Ethers.js</p>
                </div>
            </footer>
        </div>
    );
}

export default App;

