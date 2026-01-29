# Web3 Transparent Donation Platform

A professional-grade full-stack Web3 application for transparent ETH donations on the Ethereum Sepolia testnet. Built as a university final exam (UAS) project demonstrating industry-standard code quality.

![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-blue)
![React](https://img.shields.io/badge/React-18.2-61DAFB)
![Express](https://img.shields.io/badge/Express-4.18-000000)
![Solidity](https://img.shields.io/badge/Solidity-0.8.19-363636)

## 📋 Overview

This platform enables users to:
- Connect MetaMask wallet to the application
- Make transparent ETH donations recorded on-chain
- View real-time donation statistics from smart contract
- Track donation history through off-chain API

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                    (React + Vite)                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Components  │  │   Hooks     │  │   Config/Utils      │  │
│  │ - Header    │  │ - useWallet │  │ - Contract ABI      │  │
│  │ - Donation  │  │ - useDonate │  │ - Format helpers    │  │
│  │ - Stats     │  │ - useTx     │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────┬───────────────────┬───────────────┘
                          │                   │
                          ▼                   ▼
┌─────────────────────────────────┐  ┌────────────────────────┐
│      Ethereum Sepolia           │  │   Backend Express API  │
│      (Smart Contract)           │  │   GET /api/transactions│
│  - donate()                     │  │   (Off-chain data)     │
│  - getTotalDonations()          │  │                        │
│  - getDonorContribution()       │  │                        │
└─────────────────────────────────┘  └────────────────────────┘
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, Ethers.js 6 |
| **Backend** | Node.js, Express 4 |
| **Blockchain** | Solidity 0.8.19, Ethereum Sepolia |
| **Styling** | Vanilla CSS with CSS Variables |

## 📁 Project Structure

```
transparent-donation-dapp/
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── Header.jsx
│   │   │   ├── WalletConnect.jsx
│   │   │   ├── DonationForm.jsx
│   │   │   ├── DonationStats.jsx
│   │   │   └── TransactionList.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useWallet.js
│   │   │   ├── useDonation.js
│   │   │   └── useTransactions.js
│   │   ├── utils/           # Helper functions
│   │   ├── config/          # Contract ABI & addresses
│   │   ├── styles/          # CSS files
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/          # Express routes
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Error handling
│   │   └── index.js
│   └── package.json
├── contracts/
│   └── Donation.sol         # Solidity smart contract
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MetaMask browser extension
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd transparent-donation-dapp
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```

4. **Configure environment variables**
   
   Edit `frontend/.env`:
   ```env
   VITE_CONTRACT_ADDRESS=<deployed-contract-address>
   VITE_API_URL=http://localhost:3001
   VITE_CHAIN_ID=11155111
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs at: http://localhost:3001

2. **Start the frontend dev server**
   ```bash
   cd frontend
   npm run dev
   ```
   App runs at: http://localhost:5173

### Smart Contract Deployment

Deploy `contracts/Donation.sol` to Sepolia using:
- [Remix IDE](https://remix.ethereum.org)
- [Hardhat](https://hardhat.org)
- [Foundry](https://book.getfoundry.sh)

After deployment, update `VITE_CONTRACT_ADDRESS` in `frontend/.env`.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/transactions` | Get simulated transaction history |

### Example Response

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "tx_001",
        "from": "0x742d...bE21",
        "amount": "0.05",
        "timestamp": "2024-01-15T10:30:00Z",
        "status": "confirmed"
      }
    ],
    "meta": {
      "count": 5,
      "totalAmount": "0.9750",
      "currency": "ETH"
    }
  }
}
```

## 🔐 Smart Contract

### Functions

| Function | Type | Description |
|----------|------|-------------|
| `donate()` | Payable | Accept ETH donations |
| `getTotalDonations()` | View | Get total ETH donated |
| `getDonationCount()` | View | Get number of donations |
| `getDonorContribution(address)` | View | Get donor's total contribution |
| `getAllDonors()` | View | Get list of donor addresses |
| `getUniqueDonorCount()` | View | Get unique donor count |

### Events

```solidity
event DonationReceived(address indexed donor, uint256 amount, uint256 timestamp);
```

## ⚠️ Error Handling

The application handles these scenarios:

| Scenario | User Feedback |
|----------|---------------|
| MetaMask not installed | Install MetaMask prompt |
| User rejects connection | Retry connection message |
| Wrong network | Switch to Sepolia button |
| Transaction rejected | Clear error message |
| Insufficient funds | Balance warning |
| API unreachable | Connection error |

## 🎨 Features

- **Wallet Integration**: Seamless MetaMask connection with balance display
- **Responsive Design**: Mobile-first CSS with dark theme
- **Real-time Updates**: Auto-refresh after donations
- **Transaction Tracking**: On-chain and off-chain history
- **Error Boundaries**: Graceful error handling throughout

## 📄 License

MIT License - See LICENSE file for details.

---

**Built for UAS Pemrograman Web** | Ethereum Sepolia Testnet
