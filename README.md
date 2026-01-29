# Transparent Donation Platform

A full-stack Web3 application for blockchain-based donations on the Ethereum Sepolia testnet.

## Overview

This platform enables transparent, verifiable donations using smart contracts. Users connect their MetaMask wallet, send ETH donations, and view real-time donation statistics directly from the blockchain.

## Architecture

```
Frontend (React + Vite)     Backend (Express.js)
        |                           |
        |--- Ethers.js ------------>|
        |                           |
        v                           v
   Smart Contract            REST API
   (Sepolia)              (/api/transactions)
```

The frontend communicates directly with the smart contract for on-chain operations and with the backend for off-chain transaction data.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Smart Contract | Solidity 0.8.20, Foundry |
| Frontend | React 18, Vite, Ethers.js 6.x |
| Backend | Node.js, Express.js |
| Network | Ethereum Sepolia Testnet |
| Wallet | MetaMask |

## Features

- MetaMask wallet connection with network validation
- ETH balance display
- On-chain donation via smart contract
- Real-time donation statistics from contract
- Off-chain transaction history from backend API
- Responsive UI with dark theme

## Project Structure

```
transparent-donation-dapp/
├── contracts/                  # Foundry workspace
│   ├── src/
│   │   └── DonationTransparent.sol
│   ├── script/
│   │   └── DeployDonation.s.sol
│   └── foundry.toml
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   └── routes/
│   │       └── transactions.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── README.md
└── SETUP.md
```

## Quick Start

See [SETUP.md](./SETUP.md) for complete installation and setup instructions.

## Smart Contract

The `DonationTransparent` contract provides:

- `donate()` - Accept ETH donations
- `getTotalDonations()` - Return total donated amount
- `getDonorCount()` - Return number of unique donors
- `getDonation(address)` - Return donation amount for address
- `getBalance()` - Return contract balance

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/transactions` | GET | List recent transactions |
| `/api/transactions/:id` | GET | Get transaction by ID |
| `/api/health` | GET | Server health check |

## Requirements

- Node.js 18+
- Foundry
- MetaMask browser extension
- Sepolia testnet ETH (from faucet)

## License

MIT
