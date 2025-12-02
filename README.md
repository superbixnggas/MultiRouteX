# FlowFeeScan - Platform Analisis Fee Termurah

**FlowFeeScan** adalah platform analisis fee termurah untuk swap dan bridge lintas blockchain yang mengintegrasikan multiple DEX aggregator untuk memberikan rekomendasi platform dengan fee terendah.

## 🎯 Fitur Utama

- **Fee Comparison Real-time** dari 5+ platform aggregator
- **Swap & Bridge Support** untuk multiple blockchain
- **Input Jumlah Token** dengan estimasi otomatis
- **Redirect Otomatis** ke platform termurah
- **Education Cards** untuk memahami swap vs bridge
- **API Backend** dengan Supabase Edge Functions
- **Responsive Design** untuk semua device

## 🚀 Live Demo

**Website:** https://txj87p3e50by.space.minimax.io

## 🏗️ Teknologi Stack

### Backend
- **Supabase Edge Functions** - API backend untuk fee comparison
- **PostgreSQL** dengan RLS policies
- **Real-time Fee Calculation** dari multiple APIs
- **Caching System** untuk mengurangi rate limit

### Frontend
- **React 18** dengan TypeScript
- **Tailwind CSS** untuk styling
- **Vite** untuk build tooling
- **Radix UI** untuk komponen UI
- **React Router** untuk navigation

## 📦 Struktur Project

```
MultiRouteX/
├── supabase/                  # Backend Supabase configuration
│   ├── functions/             # Edge Functions
│   │   └── fee-compare/       # Fee comparison API
│   ├── migrations/            # Database migrations
│   └── tables/               # Table definitions
├── flowfeescan/              # Frontend React application
│   ├── src/                  # Source code
│   ├── public/               # Static assets
│   └── dist/                # Build output
├── browser/                  # Testing screenshots & reports
├── extract/                  # Original project documentation
└── README.md                # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm package manager
- Supabase account

### Frontend Setup
```bash
cd flowfeescan
pnpm install
pnpm dev
```

### Backend Setup
1. Setup Supabase project
2. Deploy Edge Functions:
```bash
supabase functions deploy fee-compare
```
3. Apply migrations:
```bash
supabase db push
```

## 🔌 API Integrations

FlowFeeScan terintegrasi dengan platform DEX aggregator berikut:

- **Jupiter** (Solana ecosystem)
- **1inch** (Multi-chain DEX) 
- **LI.FI** (Cross-chain bridge)
- **Rango** (Cross-chain aggregator)
- **Socket** (Infrastructure bridge)

## 📖 API Documentation

### Fee Comparison Endpoint
```
GET /functions/v1/fee-compare
```

**Parameters:**
- `chain` (string): Source blockchain
- `from_token` (string): Source token symbol
- `to_token` (string): Destination token symbol
- `amount` (string, optional): Token amount to swap

**Response:**
```json
{
  "cheapest": "Jupiter",
  "fee_usd": 0.23,
  "route": ["SOL → USDC"],
  "platform_urls": {
    "jupiter": "https://jup.ag/swap",
    "1inch": "https://app.1inch.io"
  },
  "input_amount": "1.0"
}
```

## 🎨 Design System

- **Color Palette:** Dark blue + Cyan gradients
- **Typography:** Inter font family
- **Components:** Radix UI primitives
- **Responsive:** Mobile-first approach

## 🧪 Testing Results

✅ All major features tested and verified:
- Fee comparison functionality
- Multi-platform integration
- Input validation
- Responsive design
- API integration
- Navigation & routing

## 📱 Supported Blockchains

- Ethereum
- Arbitrum
- Polygon
- BSC (Binance Smart Chain)
- Solana

## 🔗 Resources

**Documentation & Support:**
- [Dokumentasi Lengkap](https://txj87p3e50by.space.minimax.io/resources)
- [API Reference](https://txj87p3e50by.space.minimax.io/resources#api)
- [FAQ](https://txj87p3e50by.space.minimax.io/resources#faq)
- [Kebijakan Privasi](https://txj87p3e50by.space.minimax.io/resources#privacy)
- [Syarat & Ketentuan](https://txj87p3e50by.space.minimax.io/resources#terms)

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- **Project:** FlowFeeScan
- **Repository:** [MultiRouteX](https://github.com/superbixnggas/MultiRouteX)
- **Live Demo:** [https://txj87p3e50by.space.minimax.io](https://txj87p3e50by.space.minimax.io)

---

**Last Updated:** December 2, 2025  
**Version:** 1.0.0