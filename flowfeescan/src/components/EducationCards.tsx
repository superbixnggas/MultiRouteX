import { ArrowRightLeft, Link2, BarChart3, HelpCircle } from 'lucide-react';

interface EducationCard {
  icon: React.ReactNode;
  title: string;
  content: string;
  gradient: string;
}

const educationContent: EducationCard[] = [
  {
    icon: <ArrowRightLeft className="w-6 h-6" />,
    title: 'Apa itu Swap?',
    content: 'Swap adalah proses menukar satu aset crypto ke aset lain dalam blockchain yang sama. Contoh: SOL ke USDC di Solana. Swap memilih rute termurah berdasarkan likuiditas, harga pasar, dan biaya transaksi.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: <Link2 className="w-6 h-6" />,
    title: 'Apa itu Bridge?',
    content: 'Bridge adalah proses memindahkan aset crypto antar blockchain berbeda. Contoh: USDC dari Solana ke Arbitrum. Bridge memerlukan liquidity provider lintas chain dan gas fee di dua chain.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Bagaimana FlowFeeScan Membaca Fee?',
    content: 'FlowFeeScan mengambil data dari beberapa aggregator (Jupiter, 1inch, LI.FI, Rango, Socket), membandingkannya secara real-time, dan menampilkan opsi paling murah dalam 1 klik.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: <HelpCircle className="w-6 h-6" />,
    title: 'Kapan Harus Swap dan Kapan Harus Bridge?',
    content: 'Gunakan Swap jika hanya ingin menukar token dalam chain yang sama. Gunakan Bridge jika ingin pindah chain atau ekosistem. Bridge biasanya lebih mahal karena melibatkan dua jaringan.',
    gradient: 'from-orange-500 to-yellow-500',
  },
];

export default function EducationCards() {
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Pelajari Tentang Swap & Bridge
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Pahami dasar-dasar swap dan bridge untuk membuat keputusan trading yang lebih baik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationContent.map((card, index) => (
            <div
              key={index}
              className="card-glass p-6 md:p-8 hover:border-secondary-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white flex-shrink-0 group-hover:shadow-glow transition-shadow duration-300`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-dark-300 leading-relaxed">
                    {card.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tips */}
        <div className="mt-12 card-glass p-6 md:p-8">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">
            Tips Menghemat Fee
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary-500/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary-400">1</span>
              </div>
              <p className="text-dark-300">
                Bandingkan fee dari beberapa platform sebelum melakukan swap
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary-500/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary-400">2</span>
              </div>
              <p className="text-dark-300">
                Lakukan transaksi saat gas fee rendah (biasanya di luar jam sibuk)
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary-500/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary-400">3</span>
              </div>
              <p className="text-dark-300">
                Pilih chain dengan fee lebih rendah seperti Solana atau Arbitrum
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
