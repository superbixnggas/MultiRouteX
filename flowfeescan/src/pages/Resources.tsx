import { useState } from 'react';
import { Book, HelpCircle, Shield, FileText, ChevronDown } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';

export default function Resources() {
  const [activeTab, setActiveTab] = useState('documentation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sumber Daya</h1>
          <p className="text-slate-300">Dokumentasi lengkap, FAQ, dan kebijakan FlowFeeScan</p>
          <p className="text-sm text-slate-400 mt-2">Terakhir diperbarui: 2 Desember 2025</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab List */}
          <Tabs.List className="flex flex-wrap gap-2 mb-8 border-b border-slate-700 pb-4">
            <Tabs.Trigger
              value="documentation"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all data-[state=active]:bg-cyan-500 data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 hover:bg-slate-800"
            >
              <Book className="w-5 h-5" />
              <span className="font-medium">Dokumentasi</span>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="faq"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all data-[state=active]:bg-cyan-500 data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 hover:bg-slate-800"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">FAQ</span>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="privacy"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all data-[state=active]:bg-cyan-500 data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 hover:bg-slate-800"
            >
              <Shield className="w-5 h-5" />
              <span className="font-medium">Kebijakan Privasi</span>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="terms"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all data-[state=active]:bg-cyan-500 data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 hover:bg-slate-800"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Syarat & Ketentuan</span>
            </Tabs.Trigger>
          </Tabs.List>

          {/* Documentation Tab */}
          <Tabs.Content value="documentation" className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Panduan Penggunaan</h2>
              
              <div className="space-y-6 text-slate-300">
                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Cara Menggunakan FlowFeeScan</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Pilih mode transaksi: <strong>Swap</strong> (tukar token dalam blockchain yang sama) atau <strong>Bridge</strong> (pindahkan token antar blockchain)</li>
                    <li>Pilih blockchain sumber (From Chain)</li>
                    <li>Pilih token yang ingin ditukar atau dipindahkan (From Token)</li>
                    <li>Masukkan jumlah token yang akan ditransaksikan (minimal 0.0001 token)</li>
                    <li>Pilih blockchain tujuan (To Chain) - untuk Bridge, pilih blockchain berbeda</li>
                    <li>Pilih token tujuan (To Token)</li>
                    <li>Klik tombol "Bandingkan Fee" untuk melihat perbandingan biaya</li>
                    <li>Lihat hasil perbandingan yang menampilkan platform termurah dengan breakdown fee (gas + routing)</li>
                    <li>Klik "Lanjut ke Platform" untuk membuka aplikasi platform terpilih</li>
                  </ol>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Fitur Utama</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Perbandingan Real-time:</strong> Mendapatkan data fee terkini dari 5 platform agregator (Jupiter, 1inch, LI.FI, Rango, Socket)</li>
                    <li><strong>Estimasi Output:</strong> Menampilkan perkiraan jumlah token yang akan diterima berdasarkan nilai tukar saat ini</li>
                    <li><strong>Breakdown Fee:</strong> Menampilkan detail biaya gas dan biaya routing secara terpisah</li>
                    <li><strong>Multi-Chain Support:</strong> Mendukung Ethereum, Polygon, BNB Chain, Arbitrum, Optimism, Solana, Avalanche</li>
                    <li><strong>Redirect Otomatis:</strong> Tombol langsung ke platform termurah untuk melanjutkan transaksi</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Persyaratan Browser</h3>
                  <p className="mb-2">FlowFeeScan bekerja optimal pada browser modern dengan dukungan JavaScript aktif:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Google Chrome (versi 90+)</li>
                    <li>Mozilla Firefox (versi 88+)</li>
                    <li>Safari (versi 14+)</li>
                    <li>Microsoft Edge (versi 90+)</li>
                    <li>Brave Browser (versi 1.24+)</li>
                  </ul>
                  <p className="mt-3 text-yellow-400">⚠️ Pastikan JavaScript dan cookies diaktifkan untuk pengalaman terbaik.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">API Documentation</h3>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <h4 className="font-semibold text-white mb-2">Endpoint Perbandingan Fee</h4>
                    <code className="text-sm text-cyan-300 block mb-3">
                      POST https://fhwywghnhfrlndivdigl.supabase.co/functions/v1/fee-compare
                    </code>
                    
                    <h5 className="font-semibold text-white mb-2">Request Body:</h5>
                    <pre className="bg-slate-950 rounded p-3 overflow-x-auto text-sm text-green-400 mb-3">
{`{
  "mode": "swap" | "bridge",
  "fromChain": "ethereum",
  "toChain": "polygon",
  "fromToken": "ETH",
  "toToken": "USDC",
  "amount": "1.5"
}`}
                    </pre>

                    <h5 className="font-semibold text-white mb-2">Response:</h5>
                    <pre className="bg-slate-950 rounded p-3 overflow-x-auto text-sm text-green-400">
{`{
  "platform": "Jupiter",
  "total_fee": "0.0025",
  "gas_fee": "0.002",
  "route_fee": "0.0005",
  "redirect_url": "https://jup.ag/swap",
  "input_amount": "1.5 ETH",
  "estimated_output": "3750 USDC"
}`}
                    </pre>
                  </div>
                </section>
              </div>
            </div>
          </Tabs.Content>

          {/* FAQ Tab */}
          <Tabs.Content value="faq" className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Pertanyaan yang Sering Diajukan</h2>
              
              <Accordion.Root type="single" collapsible className="space-y-4">
                <Accordion.Item value="q1" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Apa itu FlowFeeScan?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    FlowFeeScan adalah platform analisis yang membandingkan biaya (fee) transaksi swap dan bridge dari berbagai agregator DEX terkemuka seperti Jupiter, 1inch, LI.FI, Rango, dan Socket. Platform ini membantu Anda menemukan opsi termurah untuk setiap transaksi.
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="q2" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Apa perbedaan antara Swap dan Bridge?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    <strong>Swap</strong> adalah pertukaran token dalam blockchain yang sama (contoh: ETH ke USDC di Ethereum). <strong>Bridge</strong> adalah pemindahan token dari satu blockchain ke blockchain lainnya (contoh: ETH dari Ethereum ke Polygon).
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="q3" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Apakah FlowFeeScan menyimpan dana saya?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    <strong>Tidak.</strong> FlowFeeScan adalah platform analisis perbandingan fee saja. Kami tidak menyimpan, mengelola, atau memiliki akses ke dana Anda. Transaksi aktual dilakukan langsung di platform agregator yang Anda pilih (Jupiter, 1inch, LI.FI, Rango, atau Socket).
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="q4" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Bagaimana FlowFeeScan menghitung fee?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    FlowFeeScan mengambil data real-time dari API resmi setiap platform agregator, kemudian membandingkan total biaya yang terdiri dari gas fee (biaya jaringan blockchain) dan route fee (biaya routing platform). Kami menampilkan platform dengan total biaya terendah.
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="q5" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Apakah ada biaya untuk menggunakan FlowFeeScan?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    <strong>Tidak ada biaya.</strong> FlowFeeScan adalah platform gratis 100%. Kami tidak mengenakan biaya apapun untuk analisis perbandingan fee. Anda hanya membayar fee transaksi di platform agregator yang Anda pilih.
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="q6" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Blockchain apa saja yang didukung?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    FlowFeeScan saat ini mendukung 7 blockchain utama: Ethereum, Polygon, BNB Chain (BSC), Arbitrum, Optimism, Solana, dan Avalanche. Kami terus menambahkan dukungan untuk blockchain baru.
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="q7" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Seberapa akurat estimasi output yang ditampilkan?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    Estimasi output dihitung berdasarkan nilai tukar pasar real-time dan merupakan perkiraan. Jumlah aktual yang Anda terima mungkin sedikit berbeda karena fluktuasi harga, slippage, dan kondisi pasar. Untuk nilai pasti, selalu cek langsung di platform agregator sebelum konfirmasi transaksi.
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="q8" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Mengapa hasil perbandingan kadang berbeda setiap kali saya cek?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    Harga cryptocurrency dan biaya gas blockchain sangat dinamis dan berubah setiap saat berdasarkan kondisi jaringan dan volume perdagangan. FlowFeeScan selalu mengambil data terkini dari setiap platform, sehingga hasil perbandingan mencerminkan kondisi pasar real-time.
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="q9" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Bagaimana jika platform yang ditampilkan tidak tersedia di negara saya?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    FlowFeeScan menampilkan semua opsi platform yang tersedia secara global. Ketersediaan layanan di negara tertentu tergantung pada kebijakan masing-masing platform agregator. Kami menyarankan untuk memeriksa syarat layanan platform tujuan sebelum melakukan transaksi.
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="q10" className="bg-slate-900/50 rounded-lg border border-slate-600 overflow-hidden">
                  <Accordion.Trigger className="flex items-center justify-between w-full px-6 py-4 text-left text-white hover:bg-slate-800/50 transition-colors">
                    <span className="font-semibold">Bagaimana cara melaporkan bug atau memberikan feedback?</span>
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-6 py-4 text-slate-300 border-t border-slate-700">
                    Kami sangat menghargai feedback Anda! Untuk melaporkan bug atau memberikan saran, silakan hubungi tim kami melalui GitHub Issues di repository proyek atau email ke support@flowfeescan.io (jika tersedia). Masukan Anda membantu kami meningkatkan layanan.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          </Tabs.Content>

          {/* Privacy Policy Tab */}
          <Tabs.Content value="privacy" className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Kebijakan Privasi</h2>
              
              <div className="space-y-6 text-slate-300">
                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">1. Informasi yang Kami Kumpulkan</h3>
                  <p className="mb-3">FlowFeeScan mengumpulkan informasi minimal untuk memberikan layanan perbandingan fee:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Data Transaksi Anonim:</strong> Parameter transaksi yang Anda masukkan (blockchain, token, jumlah) untuk melakukan perbandingan fee. Data ini tidak terkait dengan identitas pribadi Anda.</li>
                    <li><strong>Data Teknis:</strong> Informasi browser (user agent), alamat IP, dan waktu akses untuk analisis kinerja dan keamanan platform.</li>
                    <li><strong>Cache Data:</strong> Hasil perbandingan fee disimpan sementara dalam cache untuk meningkatkan kecepatan layanan.</li>
                  </ul>
                  <p className="mt-3 text-yellow-400">⚠️ Kami TIDAK mengumpulkan: private keys, seed phrases, passwords, atau informasi dompet wallet Anda.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">2. Bagaimana Kami Menggunakan Informasi</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Menyediakan layanan perbandingan fee real-time dari berbagai platform agregator</li>
                    <li>Meningkatkan kecepatan dan akurasi hasil perbandingan melalui caching</li>
                    <li>Menganalisis pola penggunaan untuk meningkatkan kualitas layanan</li>
                    <li>Mencegah penyalahgunaan dan menjaga keamanan platform</li>
                    <li>Mematuhi kewajiban hukum jika diperlukan</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">3. Perlindungan Data</h3>
                  <p className="mb-3">Kami menerapkan langkah-langkah keamanan untuk melindungi data Anda:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Enkripsi HTTPS:</strong> Semua komunikasi antara browser Anda dan server kami dienkripsi menggunakan SSL/TLS</li>
                    <li><strong>Database Security:</strong> Data cache dilindungi dengan Row Level Security (RLS) di Supabase</li>
                    <li><strong>No Personal Data Storage:</strong> Kami tidak menyimpan informasi pribadi atau data sensitif wallet</li>
                    <li><strong>Automatic Data Expiry:</strong> Cache data otomatis kedaluwarsa setelah periode tertentu</li>
                    <li><strong>Regular Security Audits:</strong> Kami melakukan audit keamanan berkala untuk mencegah kerentanan</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">4. Berbagi Data dengan Pihak Ketiga</h3>
                  <p className="mb-3">FlowFeeScan membagikan data terbatas dengan:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Platform Agregator:</strong> Jupiter, 1inch, LI.FI, Rango, Socket - untuk mendapatkan quote fee (hanya parameter transaksi, tanpa identitas pribadi)</li>
                    <li><strong>Infrastructure Providers:</strong> Supabase untuk hosting backend dan database</li>
                    <li><strong>Analytics Services:</strong> Data anonim untuk analisis penggunaan platform</li>
                  </ul>
                  <p className="mt-3">Kami TIDAK menjual atau menyewakan data Anda kepada pihak ketiga untuk tujuan pemasaran.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">5. Cookies dan Teknologi Pelacakan</h3>
                  <p className="mb-3">FlowFeeScan menggunakan cookies dan teknologi serupa untuk:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Menyimpan preferensi pengguna (dark mode, bahasa, dll)</li>
                    <li>Meningkatkan pengalaman pengguna dengan caching lokal</li>
                    <li>Menganalisis traffic dan pola penggunaan platform</li>
                  </ul>
                  <p className="mt-3">Anda dapat menonaktifkan cookies melalui pengaturan browser, namun beberapa fitur mungkin tidak berfungsi optimal.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">6. Hak Pengguna</h3>
                  <p className="mb-3">Anda memiliki hak untuk:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Akses:</strong> Meminta informasi tentang data yang kami simpan tentang penggunaan Anda</li>
                    <li><strong>Penghapusan:</strong> Meminta penghapusan cache data yang terkait dengan sesi Anda</li>
                    <li><strong>Koreksi:</strong> Memperbaiki informasi yang tidak akurat (jika ada)</li>
                    <li><strong>Opt-out:</strong> Menolak pengumpulan data analytics dengan menonaktifkan cookies</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">7. Perubahan Kebijakan</h3>
                  <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan material akan dinotifikasikan melalui banner di website atau email (jika Anda berlangganan newsletter). Tanggal "Terakhir diperbarui" di bagian atas halaman menunjukkan revisi terakhir.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">8. Kontak</h3>
                  <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak-hak Anda, silakan hubungi:</p>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600 mt-3">
                    <p className="text-white">Email: privacy@flowfeescan.io</p>
                    <p className="text-white">GitHub: https://github.com/flowfeescan</p>
                  </div>
                </section>
              </div>
            </div>
          </Tabs.Content>

          {/* Terms of Service Tab */}
          <Tabs.Content value="terms" className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Syarat & Ketentuan Layanan</h2>
              
              <div className="space-y-6 text-slate-300">
                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">1. Penerimaan Syarat</h3>
                  <p>Dengan mengakses dan menggunakan FlowFeeScan, Anda menyetujui untuk terikat dengan Syarat & Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak boleh menggunakan layanan kami.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">2. Deskripsi Layanan</h3>
                  <p className="mb-3">FlowFeeScan menyediakan:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Platform analisis perbandingan biaya transaksi (fee) untuk swap dan bridge cryptocurrency</li>
                    <li>Agregasi data real-time dari berbagai platform DEX agregator (Jupiter, 1inch, LI.FI, Rango, Socket)</li>
                    <li>Estimasi output dan breakdown biaya transaksi</li>
                    <li>Redirect link ke platform agregator pilihan untuk eksekusi transaksi</li>
                  </ul>
                  <p className="mt-3 text-yellow-400">⚠️ PENTING: FlowFeeScan adalah alat analisis saja. Kami TIDAK mengeksekusi, menyimpan, atau mengelola transaksi cryptocurrency Anda.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">3. Penggunaan yang Diizinkan</h3>
                  <p className="mb-3">Anda setuju untuk menggunakan FlowFeeScan hanya untuk tujuan yang sah dan sesuai dengan:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Hukum dan regulasi yang berlaku di yurisdiksi Anda</li>
                    <li>Syarat & Ketentuan ini</li>
                    <li>Praktik industri yang diterima secara umum</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">4. Penggunaan yang Dilarang</h3>
                  <p className="mb-3">Anda TIDAK boleh:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Menggunakan layanan untuk tujuan ilegal atau penipuan</li>
                    <li>Melakukan serangan DDoS, hacking, atau aktivitas yang merusak infrastruktur</li>
                    <li>Menggunakan bot atau automated scraping tanpa izin tertulis</li>
                    <li>Menyalahgunakan API atau melakukan excessive requests yang membebani server</li>
                    <li>Memodifikasi, menyalin, atau mendistribusikan konten platform tanpa izin</li>
                    <li>Menyamar sebagai orang lain atau entitas lain</li>
                    <li>Melakukan money laundering atau financing aktivitas kriminal</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">5. Akurasi Informasi dan Disclaimer</h3>
                  <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 mb-3">
                    <p className="font-semibold text-yellow-300 mb-2">⚠️ DISCLAIMER PENTING:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-yellow-100">
                      <li>Data fee dan estimasi yang ditampilkan adalah <strong>informational purposes only</strong> dan dapat berubah sewaktu-waktu</li>
                      <li>FlowFeeScan TIDAK menjamin akurasi, kelengkapan, atau ketepatan waktu informasi</li>
                      <li>Hasil aktual transaksi dapat berbeda karena fluktuasi pasar, slippage, atau perubahan kondisi blockchain</li>
                      <li>FlowFeeScan TIDAK bertanggung jawab atas kerugian finansial akibat penggunaan informasi ini</li>
                      <li>Selalu verifikasi informasi di platform agregator tujuan sebelum melakukan transaksi</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">6. Hak Kekayaan Intelektual</h3>
                  <p className="mb-3">Semua konten, fitur, dan fungsionalitas FlowFeeScan (termasuk teks, grafis, logo, ikon, kode) adalah dan tetap menjadi properti eksklusif FlowFeeScan dan dilindungi oleh:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Hak cipta internasional</li>
                    <li>Trademark laws</li>
                    <li>Hak kekayaan intelektual lainnya</li>
                  </ul>
                  <p className="mt-3">Anda tidak diizinkan untuk mereproduksi, mendistribusikan, atau membuat karya turunan tanpa izin tertulis.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">7. Pembatasan Tanggung Jawab</h3>
                  <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4 mb-3">
                    <p className="font-semibold text-red-300 mb-2">BATASAN TANGGUNG JAWAB:</p>
                    <p className="text-red-100 mb-2">
                      FlowFeeScan dan afiliasinya TIDAK BERTANGGUNG JAWAB atas:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-red-100">
                      <li>Kerugian finansial langsung atau tidak langsung dari penggunaan layanan</li>
                      <li>Kehilangan dana akibat transaksi di platform agregator pihak ketiga</li>
                      <li>Downtime, error, atau gangguan layanan (force majeure)</li>
                      <li>Keamanan atau ketersediaan platform agregator pihak ketiga</li>
                      <li>Perubahan hukum atau regulasi cryptocurrency di yurisdiksi Anda</li>
                      <li>Kehilangan akses wallet atau private keys (kami tidak menyimpan keduanya)</li>
                    </ul>
                  </div>
                  <p className="mt-3">Layanan disediakan "AS IS" dan "AS AVAILABLE" tanpa jaminan apapun, baik tersurat maupun tersirat.</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">8. Ganti Rugi (Indemnification)</h3>
                  <p>Anda setuju untuk mengganti rugi, membela, dan membebaskan FlowFeeScan dari segala klaim, kerugian, kewajiban, atau biaya (termasuk biaya hukum) yang timbul dari:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Pelanggaran Anda terhadap Syarat & Ketentuan ini</li>
                    <li>Penggunaan layanan yang melanggar hukum atau hak pihak ketiga</li>
                    <li>Transaksi yang Anda lakukan di platform agregator pihak ketiga</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">9. Hak Pengguna</h3>
                  <p className="mb-3">Sebagai pengguna FlowFeeScan, Anda berhak:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Akses Gratis:</strong> Menggunakan semua fitur analisis tanpa biaya</li>
                    <li><strong>Privasi:</strong> Data transaksi Anda tidak terkait dengan identitas pribadi</li>
                    <li><strong>Transparansi:</strong> Melihat breakdown fee secara detail untuk setiap platform</li>
                    <li><strong>Pilihan:</strong> Memilih platform agregator yang sesuai dengan kebutuhan Anda</li>
                    <li><strong>Support:</strong> Melaporkan bug atau memberikan feedback untuk perbaikan layanan</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">10. Modifikasi Layanan</h3>
                  <p>FlowFeeScan berhak untuk:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Mengubah, menangguhkan, atau menghentikan layanan (sebagian atau seluruhnya) kapan saja</li>
                    <li>Memperbarui Syarat & Ketentuan ini dengan pemberitahuan wajar</li>
                    <li>Menambah atau menghapus dukungan untuk blockchain atau platform agregator tertentu</li>
                    <li>Membatasi akses pengguna yang melanggar syarat penggunaan</li>
                  </ul>
                  <p className="mt-3">Perubahan material akan dinotifikasikan melalui website atau email (jika tersedia).</p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">11. Penyelesaian Sengketa</h3>
                  <p className="mb-3">Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku. Untuk sengketa yang timbul:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Upayakan penyelesaian secara damai melalui negosiasi</li>
                    <li>Jika tidak tercapai, sengketa akan diselesaikan melalui arbitrase atau pengadilan yang berwenang</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">12. Kontak</h3>
                  <p className="mb-3">Untuk pertanyaan terkait Syarat & Ketentuan ini, hubungi:</p>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-white">Email: legal@flowfeescan.io</p>
                    <p className="text-white">GitHub: https://github.com/flowfeescan</p>
                  </div>
                </section>

                <section className="mt-8 pt-6 border-t border-slate-700">
                  <p className="text-sm text-slate-400">
                    Dengan menggunakan FlowFeeScan, Anda mengakui bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat dengan Syarat & Ketentuan ini.
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    Terakhir diperbarui: 2 Desember 2025
                  </p>
                </section>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
