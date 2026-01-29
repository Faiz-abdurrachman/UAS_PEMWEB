import { useWallet } from './hooks/useWallet';
import { useContract } from './hooks/useContract';
import { WalletConnect } from './components/WalletConnect';
import { DonationForm } from './components/DonationForm';
import { DonationStats } from './components/DonationStats';
import { TransactionList } from './components/TransactionList';

/**
 * Root application component.
 * Composes wallet connection, donation form, stats, and transaction list.
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

                        <div className="content-secondary">
                            <TransactionList />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <div className="container">
                    <p>Built for UAS Pemrograman Web | Sepolia Testnet</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
