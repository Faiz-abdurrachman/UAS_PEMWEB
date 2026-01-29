# 📘 PANDUAN LENGKAP - Web3 Transparent Donation Platform

## Daftar Isi
1. [Apa Itu Aplikasi Ini?](#apa-itu-aplikasi-ini)
2. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
3. [Arsitektur Sistem](#arsitektur-sistem)
4. [Persyaratan Sebelum Memulai](#persyaratan-sebelum-memulai)
5. [Panduan Setup Lengkap](#panduan-setup-lengkap)
6. [Deploy Smart Contract ke Sepolia](#deploy-smart-contract-ke-sepolia)
7. [User Flow - Cara Menggunakan Aplikasi](#user-flow---cara-menggunakan-aplikasi)
8. [Troubleshooting / Penyelesaian Masalah](#troubleshooting)
9. [Struktur Kode untuk Penjelasan](#struktur-kode-untuk-penjelasan)

---

## Apa Itu Aplikasi Ini?

**Web3 Transparent Donation Platform** adalah aplikasi donasi berbasis blockchain yang memungkinkan pengguna untuk:

1. **Mendonasikan ETH** secara langsung ke smart contract di blockchain Ethereum
2. **Melihat transparansi donasi** - semua donasi tercatat di blockchain dan bisa diverifikasi publik
3. **Melacak statistik donasi** - total donasi, jumlah donatur, kontribusi personal
4. **Melihat riwayat transaksi** dari backend API

### Mengapa Menggunakan Blockchain?

| Keuntungan | Penjelasan |
|------------|------------|
| **Transparansi** | Semua donasi tercatat permanen di blockchain, tidak bisa dimanipulasi |
| **Trustless** | Tidak perlu percaya pada pihak ketiga, semua terverifikasi di chain |
| **Immutable** | Data tidak bisa diubah atau dihapus setelah tercatat |
| **Decentralized** | Tidak ada single point of failure |

### Untuk Siapa Aplikasi Ini?

- Organisasi yang ingin menerima donasi dengan transparan
- Pengguna yang ingin berdonasi dengan jaminan tercatat di blockchain
- Mahasiswa yang belajar Web3 development

---

## Teknologi yang Digunakan

```
┌─────────────────────────────────────────────────────┐
│                    TECH STACK                        │
├─────────────────────────────────────────────────────┤
│  Frontend:   React 18 + Vite + Ethers.js 6          │
│  Backend:    Node.js + Express 4                     │
│  Blockchain: Solidity 0.8.19 + Ethereum Sepolia     │
│  Styling:    Vanilla CSS dengan CSS Variables       │
│  Wallet:     MetaMask Browser Extension             │
└─────────────────────────────────────────────────────┘
```

---

## Arsitektur Sistem

```
┌────────────────────────────────────────────────────────────────────┐
│                           USER BROWSER                              │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                    React Frontend                           │    │
│  │  - Tampilan UI (components)                                 │    │
│  │  - Koneksi wallet (useWallet hook)                         │    │
│  │  - Interaksi smart contract (useDonation hook)             │    │
│  │  - Fetch data API (useTransactions hook)                   │    │
│  └─────────────────┬────────────────────────┬─────────────────┘    │
│                    │                        │                       │
│                    ▼                        ▼                       │
│  ┌─────────────────────────┐    ┌─────────────────────────────┐    │
│  │      MetaMask           │    │    Express Backend API      │    │
│  │   (Wallet Extension)    │    │   GET /api/transactions     │    │
│  └───────────┬─────────────┘    └─────────────────────────────┘    │
│              │                                                      │
└──────────────┼──────────────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│      Ethereum Sepolia Testnet        │
│  ┌────────────────────────────────┐  │
│  │     Donation Smart Contract    │  │
│  │  - donate() → terima ETH       │  │
│  │  - getTotalDonations()         │  │
│  │  - getDonorContribution()      │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## Persyaratan Sebelum Memulai

### Software yang Harus Diinstall

| Software | Versi | Cara Install | Cek Versi |
|----------|-------|--------------|-----------|
| **Node.js** | 18+ | https://nodejs.org | `node --version` |
| **npm** | 9+ | Sudah termasuk di Node.js | `npm --version` |
| **Git** | Any | https://git-scm.com | `git --version` |
| **MetaMask** | Latest | Chrome/Firefox Extension | - |
| **Browser** | Chrome/Firefox/Brave | - | - |

### Setup MetaMask

1. **Install MetaMask Extension**
   - Buka https://metamask.io/download/
   - Klik "Install MetaMask for Chrome" (atau browser lain)
   - Ikuti proses instalasi

2. **Buat atau Import Wallet**
   - Buat wallet baru ATAU
   - Import wallet yang sudah ada dengan seed phrase

3. **Tambahkan Sepolia Testnet**
   - Buka MetaMask → Settings → Networks → Add Network
   - Atau akan otomatis diminta saat aplikasi berjalan

4. **Dapatkan Sepolia ETH (Gratis)**
   - Buka https://sepoliafaucet.com
   - Atau https://www.alchemy.com/faucets/ethereum-sepolia
   - Masukkan alamat wallet MetaMask kamu
   - Klik "Send Me ETH"
   - Tunggu beberapa menit sampai ETH masuk

---

## Panduan Setup Lengkap

### Step 1: Clone atau Buka Project

Jika sudah ada folder project:
```bash
cd "d:\1 SEMESTER 3\kuliah\pemrograman web\uas\uas\transparent-donation-dapp"
```

### Step 2: Install Dependencies Backend

```bash
# Masuk ke folder backend
cd backend

# Install semua dependencies
npm install

# Copy file environment (jika belum ada)
copy .env.example .env
```

### Step 3: Install Dependencies Frontend

```bash
# Kembali ke root, lalu masuk frontend
cd ../frontend

# Install semua dependencies
npm install

# Copy file environment (jika belum ada)
copy .env.example .env
```

### Step 4: Jalankan Backend Server

Buka terminal BARU:
```bash
cd "d:\1 SEMESTER 3\kuliah\pemrograman web\uas\uas\transparent-donation-dapp\backend"
npm run dev
```

Output yang diharapkan:
```
╔════════════════════════════════════════════════╗
║   Donation Platform Backend API                ║
║   Running on: http://localhost:3001            ║
╚════════════════════════════════════════════════╝
```

### Step 5: Jalankan Frontend Server

Buka terminal BARU lagi:
```bash
cd "d:\1 SEMESTER 3\kuliah\pemrograman web\uas\uas\transparent-donation-dapp\frontend"
npm run dev
```

Output yang diharapkan:
```
VITE v5.4.21  ready in 420 ms

➜  Local:   http://localhost:5173/
```

### Step 6: Buka Aplikasi

1. Buka browser (Chrome/Firefox/Brave)
2. Pergi ke: **http://localhost:5173**
3. Aplikasi akan terbuka!

---

## Deploy Smart Contract ke Sepolia

> ⚠️ **PENTING**: Langkah ini diperlukan agar fitur donasi bisa berfungsi!

### Menggunakan Remix IDE (Cara Termudah)

#### 1. Buka Remix IDE
- Pergi ke: https://remix.ethereum.org

#### 2. Buat File Baru
- Klik folder "contracts" di sidebar
- Klik ikon "New File"
- Beri nama: `Donation.sol`

#### 3. Copy Kode Smart Contract
Copy semua isi dari file `contracts/Donation.sol` ke Remix:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Donation {
    uint256 private totalDonations;
    uint256 private donationCount;
    mapping(address => uint256) private donorContributions;
    address[] private donors;
    mapping(address => bool) private hasDonated;

    event DonationReceived(address indexed donor, uint256 amount, uint256 timestamp);

    error ZeroDonationNotAllowed();

    function donate() external payable {
        if (msg.value == 0) revert ZeroDonationNotAllowed();
        
        if (!hasDonated[msg.sender]) {
            hasDonated[msg.sender] = true;
            donors.push(msg.sender);
        }
        
        donorContributions[msg.sender] += msg.value;
        totalDonations += msg.value;
        donationCount++;
        
        emit DonationReceived(msg.sender, msg.value, block.timestamp);
    }

    function getTotalDonations() external view returns (uint256) { return totalDonations; }
    function getDonationCount() external view returns (uint256) { return donationCount; }
    function getDonorContribution(address donor) external view returns (uint256) { return donorContributions[donor]; }
    function getAllDonors() external view returns (address[] memory) { return donors; }
    function getUniqueDonorCount() external view returns (uint256) { return donors.length; }
    function getContractBalance() external view returns (uint256) { return address(this).balance; }
}
```

#### 4. Compile Contract
- Klik tab "Solidity Compiler" (ikon centang di sidebar)
- Pastikan compiler version: `0.8.19` atau lebih tinggi
- Klik "Compile Donation.sol"
- Pastikan tidak ada error (centang hijau)

#### 5. Deploy ke Sepolia
- Klik tab "Deploy & Run" (ikon panah di sidebar)
- **Environment**: Pilih "Injected Provider - MetaMask"
- MetaMask akan popup → Pastikan terhubung ke **Sepolia testnet**
- Klik "Deploy"
- MetaMask akan popup lagi → Klik "Confirm"
- Tunggu transaksi selesai (30 detik - 1 menit)

#### 6. Salin Contract Address
- Setelah deploy berhasil, lihat di bagian "Deployed Contracts"
- Copy alamat contract (contoh: `0x1234...abcd`)

#### 7. Update Frontend Config
Buka file `frontend/.env` dan update:
```env
VITE_CONTRACT_ADDRESS=0x_ALAMAT_CONTRACT_YANG_BARU_DIDEPLOY
VITE_API_URL=http://localhost:3001
VITE_CHAIN_ID=11155111
VITE_NETWORK_NAME=Sepolia
```

#### 8. Restart Frontend
- Tekan `Ctrl+C` di terminal frontend
- Jalankan lagi: `npm run dev`

---

## User Flow - Cara Menggunakan Aplikasi

### Flow 1: Pertama Kali Membuka Aplikasi

```
┌─────────────────────────────────────────────────────────────┐
│  1. User buka http://localhost:5173                         │
│                    ↓                                         │
│  2. Lihat halaman dengan hero "Transparent Web3 Donations"  │
│                    ↓                                         │
│  3. Lihat tombol "Connect MetaMask"                         │
│                    ↓                                         │
│  4. Lihat Transaction History dari API (di bawah)           │
└─────────────────────────────────────────────────────────────┘
```

### Flow 2: Connect Wallet

```
┌─────────────────────────────────────────────────────────────┐
│  1. User klik "Connect MetaMask"                            │
│                    ↓                                         │
│  2. MetaMask popup muncul                                   │
│                    ↓                                         │
│  3. User pilih akun dan klik "Connect"                      │
│                    ↓                                         │
│  4. Jika network salah → muncul tombol "Switch to Sepolia"  │
│                    ↓                                         │
│  5. Setelah terhubung:                                      │
│     - Alamat wallet muncul di header                        │
│     - Balance ETH muncul di header                          │
│     - Form donasi aktif                                     │
│     - Statistik on-chain muncul                             │
└─────────────────────────────────────────────────────────────┘
```

### Flow 3: Melakukan Donasi

```
┌─────────────────────────────────────────────────────────────┐
│  1. User sudah connect wallet                               │
│                    ↓                                         │
│  2. User masukkan jumlah ETH (misal: 0.01)                  │
│     ATAU klik quick amount button (0.01, 0.05, 0.1, 0.5)    │
│                    ↓                                         │
│  3. Klik tombol "Donate 0.01 ETH"                           │
│                    ↓                                         │
│  4. MetaMask popup → tampilkan detail transaksi             │
│                    ↓                                         │
│  5. User klik "Confirm" di MetaMask                         │
│                    ↓                                         │
│  6. Tunggu transaksi dikonfirmasi (~15-30 detik)            │
│                    ↓                                         │
│  7. Muncul pesan sukses dengan link ke Etherscan            │
│                    ↓                                         │
│  8. Statistik on-chain ter-update otomatis                  │
└─────────────────────────────────────────────────────────────┘
```

### Flow 4: Melihat Transaksi di Etherscan

```
┌─────────────────────────────────────────────────────────────┐
│  1. Setelah donasi sukses, klik "View on Etherscan"         │
│                    ↓                                         │
│  2. Browser buka tab baru ke Sepolia Etherscan              │
│                    ↓                                         │
│  3. Lihat detail transaksi:                                 │
│     - From: alamat wallet kamu                              │
│     - To: alamat smart contract                             │
│     - Value: jumlah ETH yang didonasikan                    │
│     - Status: Success                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### ❌ MetaMask Tidak Terinstall
**Gejala**: Muncul pesan "MetaMask is not installed"  
**Solusi**: Install MetaMask extension dari https://metamask.io/download/

### ❌ Network Salah
**Gejala**: Muncul pesan "Please switch to Sepolia testnet"  
**Solusi**: 
1. Klik tombol "Switch to Sepolia"
2. Atau manual: MetaMask → Klik network dropdown → Pilih Sepolia

### ❌ Tidak Punya Sepolia ETH
**Gejala**: Error "Insufficient funds" saat donasi  
**Solusi**: Dapatkan Sepolia ETH gratis dari:
- https://sepoliafaucet.com
- https://www.alchemy.com/faucets/ethereum-sepolia

### ❌ Contract Not Deployed
**Gejala**: Statistik menunjukkan "Contract Not Deployed"  
**Solusi**: Deploy smart contract ke Sepolia (lihat panduan di atas)

### ❌ Backend Tidak Berjalan
**Gejala**: Transaction history tidak muncul / error  
**Solusi**: Pastikan backend berjalan:
```bash
cd backend
npm run dev
```

### ❌ Frontend Error
**Gejala**: Halaman kosong atau error  
**Solusi**: 
1. Cek console browser (F12 → Console)
2. Restart frontend:
```bash
cd frontend
npm run dev
```

---

## Struktur Kode untuk Penjelasan

Saat sidang/presentasi, jelaskan komponen-komponen ini:

### Smart Contract (contracts/Donation.sol)
- `donate()` - Fungsi payable untuk menerima ETH
- `getTotalDonations()` - Baca total donasi
- `getDonationCount()` - Baca jumlah transaksi
- Event `DonationReceived` - Emit saat ada donasi

### Backend API (backend/src/)
- `index.js` - Entry point Express server
- `routes/transactionRoutes.js` - Definisi route
- `controllers/transactionController.js` - Handler request
- `middleware/errorMiddleware.js` - Error handling

### Frontend Hooks (frontend/src/hooks/)
- `useWallet.js` - Koneksi MetaMask, balance, network
- `useDonation.js` - Interaksi smart contract
- `useTransactions.js` - Fetch data dari API

### Frontend Components (frontend/src/components/)
- `Header.jsx` - Branding + wallet info
- `WalletConnect.jsx` - UI koneksi wallet
- `DonationForm.jsx` - Form input donasi
- `DonationStats.jsx` - Statistik on-chain
- `TransactionList.jsx` - Daftar transaksi API

---

## Quick Start Commands

```bash
# Terminal 1 - Backend
cd "d:\1 SEMESTER 3\kuliah\pemrograman web\uas\uas\transparent-donation-dapp\backend"
npm run dev

# Terminal 2 - Frontend
cd "d:\1 SEMESTER 3\kuliah\pemrograman web\uas\uas\transparent-donation-dapp\frontend"
npm run dev

# Buka browser
# http://localhost:5173
```

---

**Dibuat untuk UAS Pemrograman Web**  
Ethereum Sepolia Testnet | React + Express + Solidity
