FlowFeeScan — Final Technical Documentation (Frontend-Only + Backend Spec + UI Web
Guide)
1. Overview
FlowFeeScan adalah platform analisis fee termurah untuk swap dan bridge lintas blockchain.
Tujuan: memberikan rekomendasi termurah + tombol redirect ke platform swap/bridge secara
langsung.
---
2. Core Logic Sistem
1. Backend memanggil beberapa API aggregator (Jupiter, 1inch, LI.FI, Rango, Socket).
2. Backend menghitung:
- gas fee
- route fee
- slippage
- total effective fee (USD)
3. Backend memilih platform paling murah.
4. Frontend menampilkan:
- rekomendasi termurah
- detail fee
- tombol redirect ke platform
5. User dapat langsung swap di platform tersebut.
---
3. Logic Ringkas (Diagram Mental)
Request → Backend → Query beberapa API → Normalisasi fee → Bandingkan → Kirim data →
Frontend tampilkan → Redirect
---
4. Frontend-Only Flow

Frontend hanya:
- memanggil backend endpoint
- menampilkan UI data
- menyediakan tombol redirect
Redirect TIDAK butuh backend.
Cukup hyperlink seperti:
https://jup.ag/swap
https://app.1inch.io
https://li.fi
---
5. Backend API Spec (Untuk Minimax)
Base URL: /api
Endpoint: GET /fee
Params:
- chain
- from_token
- to_token
Response:
{
"cheapest": "Jupiter",
"fee_usd": 0.23,
"route": ["SOL → USDC"],
"platform_urls": {
"jupiter": "https://jup.ag/swap",
"1inch": "https://app.1inch.io"
}

}
Backend Steps:
1. Panggil API Jupiter
2. Panggil API 1inch
3. Panggil API LI.FI
4. Panggil API Socket
5. Normalisasi costs
6. Return cheapest
---
6. API Provider List (Free & Paid)
FREE:
- Jupiter
- 1inch
- LI.FI basic
- Rango
- Socket
PAID (opsional):
- Alchemy
- QuickNode
- Helius
Untuk project ini, FREE cukup.
---
7. Kenapa Perlu Backend?
- fee harus real-time
- butuh merge beberapa API

- frontend jadi ringan
- supaya bisa caching & mengurangi rate-limit
Minimax bisa langsung build backend otomatis dari dokumen ini.
---
8. UI Web Guide (Untuk Frontend Developer)
Style
- clean, minimalis, fintech vibe
- warna utama: biru gelap + cyan
- font: Inter / Satoshi
Komponen UI Utama
1. Fee Comparison Panel
Card besar berisi:
- chain
- from_token → to_token
- cheapest platform
- total fee
- tombol “Open Platform”
2. Platform Recommendation Section
Tabel kecil:
Platform  Click-to-open
3. Swap & Bridge Education Cards
Agar web terlihat profesional & edukatif.
---
9. UI EDUCATION CARDS

Card: Apa itu Swap?
Swap adalah proses menukar satu aset crypto ke aset lain dalam blockchain yang sama.
Contoh: SOL → USDC di Solana.
Swap memilih rute termurah berdasarkan likuiditas, harga pasar, dan biaya transaksi.
Card: Apa itu Bridge?
Bridge adalah proses memindahkan aset crypto antar blockchain berbeda.
Contoh: USDC dari Solana → Arbitrum.
Bridge memerlukan liquidity provider lintas chain + gas fee di dua chain.
Card: Bagaimana FlowFeeScan Membaca Fee?
FlowFeeScan mengambil data dari beberapa aggregator, membandingkannya, dan menampilkan
opsi paling murah dalam 1 klik.
Card: Kapan Harus Swap dan Kapan Harus Bridge?
- Gunakan Swap jika hanya ingin menukar token dalam chain yang sama.
- Gunakan Bridge jika ingin pindah chain atau ekosistem.
---
10. UI Layout Final (Wireframe Style)
Header
- Logo
- Menu: Home  Docs
Section 1: Hero
- Title: Find The Cheapest Swap & Bridge Fee
- Subtext
- Input Form (chain, token, destination)
- Compare Button

Section 2: Cheapest Result Card
- Platform termurah
- Fee USD
- Route
- CTA: Open Platform
Section 3: Comparison Table
Section 4: Education Cards
- Apa itu swap
- Apa itu bridge
- Bagaimana FlowFeeScan bekerja
- Tips swap/bridge
Section 5: Footer
---
11. Final Note
File ini siap dikirim ke Minimax.
Backend dapat langsung dibuat dari dokumentasi ini.