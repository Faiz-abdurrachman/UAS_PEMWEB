# Setup Guide

Complete setup instructions for the Transparent Donation Platform.

## Prerequisites

Install the following tools before proceeding:

### Node.js (v18 or higher)

Download and install from [nodejs.org](https://nodejs.org/).

Verify installation:
```bash
node --version
npm --version
```

### Foundry

Install Foundry for smart contract development:

**Windows (PowerShell as Administrator):**
```powershell
# Install foundryup
curl -L https://foundry.paradigm.xyz | bash

# Restart terminal, then run:
foundryup
```

**Linux/macOS:**
```bash
curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc
foundryup
```

Verify installation:
```bash
forge --version
```

### MetaMask

Install the MetaMask browser extension from [metamask.io](https://metamask.io/).

Add Sepolia testnet:
1. Open MetaMask
2. Settings > Networks > Add Network
3. Select "Sepolia" from the list

Get test ETH from a faucet:
- [Sepolia Faucet by Alchemy](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

## Project Setup

### 1. Clone and Navigate

```bash
cd transparent-donation-dapp
```

### 2. Smart Contract Setup

```bash
cd contracts

# Install Foundry dependencies
forge install

# Copy environment file
cp .env.example .env
```

Edit `.env` with your values:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_deployment_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Get an RPC URL from [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/).

**Build the contract:**
```bash
forge build
```

**Deploy to Sepolia:**
```bash
# Load environment variables
source .env

# Deploy
forge script script/DeployDonation.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

Save the deployed contract address from the output.

### 3. Backend Setup

```bash
cd ../backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

**Start the server:**
```bash
npm run dev
```

Server runs on http://localhost:3001

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

**Configure contract address:**

Edit `src/utils/contractConfig.js`:
```javascript
export const CONTRACT_ADDRESS = '0xYOUR_DEPLOYED_CONTRACT_ADDRESS';
```

**Start development server:**
```bash
npm run dev
```

Frontend runs on http://localhost:5173

## Environment Variables Summary

### contracts/.env
| Variable | Description |
|----------|-------------|
| SEPOLIA_RPC_URL | Alchemy or Infura RPC endpoint for Sepolia |
| PRIVATE_KEY | Deployment wallet private key |
| ETHERSCAN_API_KEY | Optional, for contract verification |

### backend/.env
| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 3001) |

## Verification Checklist

After setup, verify each component works:

### Contract
```bash
cd contracts
forge build
# Expected: Successful compilation
```

### Backend
```bash
cd backend
npm run dev
# Open http://localhost:3001/api/health
# Expected: {"status":"ok","timestamp":"..."}
```

### Frontend
```bash
cd frontend
npm run dev
# Open http://localhost:5173
```

1. Click "Connect Wallet"
2. Approve MetaMask connection
3. Verify address and balance display
4. Switch to Sepolia if prompted
5. Enter donation amount and submit
6. Confirm transaction in MetaMask

## Troubleshooting

### MetaMask not detected
Ensure MetaMask extension is installed and enabled in your browser.

### Wrong network error
Switch MetaMask to Sepolia testnet.

### Contract calls fail
Verify the contract address in `contractConfig.js` matches your deployed address.

### Backend connection error
Ensure backend is running on port 3001 before starting frontend.

### Insufficient funds
Request test ETH from a Sepolia faucet.

## Build for Production

### Frontend
```bash
cd frontend
npm run build
# Output in dist/ directory
```

### Backend
```bash
cd backend
npm start
# Runs production server
```
