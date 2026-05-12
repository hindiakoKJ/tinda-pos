import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "TindaPOS — Ang POS ng bawat tindahan",
  description:
    "Offline-first point-of-sale app para sa sari-sari store. Walang internet, walang login, walang subscription.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen" style={{ background: "#FAFAF8", color: "#1A1714", fontFamily: "var(--font-inter, sans-serif)" }}>
      {/* Nav */}
      <nav style={{ background: "#F59E0B" }} className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/icons/icon-192.png" alt="TindaPOS" width={36} height={36} className="rounded-lg" />
          <span className="font-black text-white text-xl tracking-tight">TindaPOS</span>
        </div>
        <Link
          href="/buod"
          className="text-sm font-bold px-5 py-2 rounded-full"
          style={{ background: "white", color: "#F59E0B" }}
        >
          Buksan ang App →
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ width: 120, height: 120 }}>
            <Image src="/icons/icon-512.png" alt="TindaPOS icon" width={120} height={120} />
          </div>
        </div>
        <h1 className="text-4xl font-black mb-4 leading-tight">
          Ang POS ng bawat{" "}
          <span style={{ color: "#F59E0B" }}>tindahan</span>
        </h1>
        <p className="text-lg mb-8" style={{ color: "#6B6460" }}>
          Simple, mabilis, at gumagana kahit walang internet. Para sa sari-sari store, carinderia, at lahat ng maliit na negosyo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/buod"
            className="font-black text-lg px-8 py-4 rounded-full shadow-lg"
            style={{ background: "#F59E0B", color: "white" }}
          >
            🛍️ Gamitin ang App
          </Link>
          <a
            href="https://play.google.com/store/apps/details?id=com.hnscorp.tindapos"
            className="font-bold text-lg px-8 py-4 rounded-full border-2"
            style={{ borderColor: "#F59E0B", color: "#F59E0B" }}
          >
            ▶ Google Play
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-black text-center mb-12">Lahat ng kailangan ng iyong tindahan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: "🛍️", title: "Mabilis na Benta (POS)", desc: "I-tap ang produkto, auto-compute ang sukli. Checkout sa ilang segundo." },
            { icon: "📦", title: "Inventory Tracking", desc: "Alam mo lagi kung ilan pa ang natitira. Babala kung mababa na ang stock." },
            { icon: "📊", title: "Buod ng Kita", desc: "Makita ang benta, gross kita, gastos, at net kita ngayon sa isang screen." },
            { icon: "📋", title: "Kasaysayan ng Benta", desc: "Lahat ng transaksyon naka-save. Pwedeng i-filter by araw, linggo, o buwan." },
            { icon: "💰", title: "Profit Tracker", desc: "Per-product COGS at profit — alam mo kung anong produkto ang kumikita." },
            { icon: "💸", title: "Expense Tracker", desc: "I-track ang kuryente, tubig, at iba pang gastos para makita ang tunay na kita." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border-2" style={{ background: "white", borderColor: "#E8E4DC" }}>
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-base mb-2">{title}</h3>
              <p className="text-sm" style={{ color: "#6B6460" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offline badge */}
      <section className="px-6 py-16" style={{ background: "#F59E0B" }}>
        <div className="max-w-2xl mx-auto text-center text-white">
          <div className="text-5xl mb-4">📴</div>
          <h2 className="text-3xl font-black mb-4">100% Offline</h2>
          <p className="text-lg opacity-90">
            Walang internet na kailangan. Lahat ng data ay naka-save sa iyong telepono — hindi sa cloud, hindi sa server. Ikaw lang ang may access sa iyong negosyo.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-black mb-4">Handa ka na ba?</h2>
        <p className="mb-8" style={{ color: "#6B6460" }}>Isang beses bayad. Walang subscription. Walang nakatagong bayad.</p>
        <Link
          href="/buod"
          className="inline-block font-black text-xl px-10 py-5 rounded-full shadow-xl"
          style={{ background: "#F59E0B", color: "white" }}
        >
          🛍️ Simulan na — libre i-try
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center border-t" style={{ borderColor: "#E8E4DC" }}>
        <p className="text-sm mb-2" style={{ color: "#6B6460" }}>
          © 2026 HNScorp · Philippines
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <Link href="/privacy" style={{ color: "#F59E0B" }}>Privacy Policy</Link>
          <a href="mailto:kristianjvsacdalan@gmail.com" style={{ color: "#6B6460" }}>Contact</a>
        </div>
      </footer>
    </main>
  );
}
