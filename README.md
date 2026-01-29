# Platform Donasi Transparan

Aplikasi full-stack Web3 untuk donasi berbasis blockchain di Ethereum Sepolia testnet.

## Gambaran Umum

Platform ini memungkinkan donasi yang transparan dan terverifikasi menggunakan smart contract. Pengguna menghubungkan dompet MetaMask mereka, mengirim donasi ETH, dan melihat statistik donasi secara real-time langsung dari blockchain.

## Arsitektur

```
Frontend (React + Vite)     Backend (Express.js)
        |                           |
        |--- Ethers.js ------------>|
        |                           |
        v                           v
   Smart Contract            REST API
   (Sepolia)              (/api/transactions)
```

Frontend berkomunikasi langsung dengan smart contract untuk operasi on-chain dan dengan backend untuk data transaksi off-chain.

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Smart Contract | Solidity 0.8.20, Foundry |
| Frontend | React 18, Vite, Ethers.js 6.x |
| Backend | Node.js, Express.js |
| Jaringan | Ethereum Sepolia Testnet |
| Dompet | MetaMask |

## Fitur

- Koneksi dompet MetaMask dengan validasi jaringan
- Menampilkan saldo ETH
- Donasi on-chain melalui smart contract
- Statistik donasi real-time dari contract
- Riwayat transaksi off-chain dari backend API
- UI responsif dengan tema gelap

## Struktur Proyek

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

## Mulai Cepat

Lihat [SETUP.md](./SETUP.md) untuk instruksi instalasi dan setup lengkap.

## Smart Contract

Contract `DonationTransparent` menyediakan:

- `donate()` - Menerima donasi ETH
- `getTotalDonations()` - Mengembalikan total jumlah donasi
- `getDonorCount()` - Mengembalikan jumlah donatur unik
- `getDonation(address)` - Mengembalikan jumlah donasi untuk alamat tertentu
- `getBalance()` - Mengembalikan saldo contract

## API Endpoints

| Endpoint | Metode | Deskripsi |
|----------|--------|-----------|
| `/api/transactions` | GET | Daftar transaksi terbaru |
| `/api/transactions/:id` | GET | Mendapatkan transaksi berdasarkan ID |
| `/api/health` | GET | Cek kesehatan server |

## Persyaratan

- Node.js 18+
- Foundry
- Ekstensi browser MetaMask
- ETH Sepolia testnet (dari faucet)

## Lisensi

MIT
