# Panduan Setup

Instruksi setup lengkap untuk Platform Donasi Transparan.

## Prasyarat

Instal tools berikut sebelum melanjutkan:

### Node.js (v18 atau lebih tinggi)

Unduh dan instal dari [nodejs.org](https://nodejs.org/).

Verifikasi instalasi:
```bash
node --version
npm --version
```

### Foundry

Instal Foundry untuk pengembangan smart contract:

**Windows (PowerShell sebagai Administrator):**
```powershell
# Instal foundryup
curl -L https://foundry.paradigm.xyz | bash

# Restart terminal, kemudian jalankan:
foundryup
```

**Linux/macOS:**
```bash
curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc
foundryup
```

Verifikasi instalasi:
```bash
forge --version
```

### MetaMask

Instal ekstensi browser MetaMask dari [metamask.io](https://metamask.io/).

Tambahkan Sepolia testnet:
1. Buka MetaMask
2. Settings > Networks > Add Network
3. Pilih "Sepolia" dari daftar

Dapatkan ETH test dari faucet:
- [Sepolia Faucet by Alchemy](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

## Setup Proyek

### 1. Clone dan Navigasi

```bash
cd transparent-donation-dapp
```

### 2. Setup Smart Contract

```bash
cd contracts

# Instal dependensi Foundry
forge install

# Salin file environment
cp .env.example .env
```

Edit `.env` dengan nilai Anda:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/API_KEY_ANDA
PRIVATE_KEY=private_key_dompet_deployment_anda
ETHERSCAN_API_KEY=api_key_etherscan_anda
```

Dapatkan RPC URL dari [Alchemy](https://www.alchemy.com/) atau [Infura](https://infura.io/).

**Build contract:**
```bash
forge build
```

**Deploy ke Sepolia:**
```bash
# Muat variabel environment
source .env

# Deploy
forge script script/DeployDonation.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

Simpan alamat contract yang di-deploy dari output.

### 3. Setup Backend

```bash
cd ../backend

# Instal dependensi
npm install

# Salin file environment
cp .env.example .env
```

**Jalankan server:**
```bash
npm run dev
```

Server berjalan di http://localhost:3001

### 4. Setup Frontend

```bash
cd ../frontend

# Instal dependensi
npm install
```

**Konfigurasi alamat contract:**

Edit `src/utils/contractConfig.js`:
```javascript
export const CONTRACT_ADDRESS = '0xALAMAT_CONTRACT_YANG_SUDAH_DIDEPLOY';
```

**Jalankan server development:**
```bash
npm run dev
```

Frontend berjalan di http://localhost:5173

## Ringkasan Variabel Environment

### contracts/.env
| Variabel | Deskripsi |
|----------|-----------|
| SEPOLIA_RPC_URL | Endpoint RPC Alchemy atau Infura untuk Sepolia |
| PRIVATE_KEY | Private key dompet untuk deployment |
| ETHERSCAN_API_KEY | Opsional, untuk verifikasi contract |

### backend/.env
| Variabel | Deskripsi |
|----------|-----------|
| PORT | Port server (default: 3001) |

## Checklist Verifikasi

Setelah setup, verifikasi setiap komponen berfungsi:

### Contract
```bash
cd contracts
forge build
# Hasil yang diharapkan: Kompilasi berhasil
```

### Backend
```bash
cd backend
npm run dev
# Buka http://localhost:3001/api/health
# Hasil yang diharapkan: {"status":"ok","timestamp":"..."}
```

### Frontend
```bash
cd frontend
npm run dev
# Buka http://localhost:5173
```

1. Klik "Connect Wallet"
2. Setujui koneksi MetaMask
3. Verifikasi alamat dan saldo ditampilkan
4. Ganti ke Sepolia jika diminta
5. Masukkan jumlah donasi dan submit
6. Konfirmasi transaksi di MetaMask

## Troubleshooting

### MetaMask tidak terdeteksi
Pastikan ekstensi MetaMask sudah terinstal dan diaktifkan di browser Anda.

### Error jaringan salah
Ganti MetaMask ke Sepolia testnet.

### Panggilan contract gagal
Verifikasi alamat contract di `contractConfig.js` sesuai dengan alamat yang sudah di-deploy.

### Error koneksi backend
Pastikan backend berjalan di port 3001 sebelum menjalankan frontend.

### Dana tidak cukup
Minta ETH test dari Sepolia faucet.

## Build untuk Produksi

### Frontend
```bash
cd frontend
npm run build
# Output di direktori dist/
```

### Backend
```bash
cd backend
npm start
# Menjalankan server produksi
```
