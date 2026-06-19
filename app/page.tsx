import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "SariAssist — Iyong tindahan. Iyong datos. Iyo lang. | Offline POS para sa sari-sari store",
  description:
    "Offline-first POS para sa sari-sari store: benta, utang, stock, at kita — kahit walang internet. Nasa phone mo lang ang datos, walang server, hindi ibinebenta. Libre habang buhay (may maliit na ad); ₱50 para walang ads; ₱199 PRO na may backup. Isang beses lang, walang subscription.",
};

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.hnscorp.tindapos";

const TEAL = "#0E8A82";
const TEAL_DEEP = "#0B6F68";
const TEAL_TINT = "#D2EFEA";
const INK = "#011627";
const MUTED = "#5C5750";
const BORDER = "#E8E4DC";

export default function LandingPage() {
  return (
    <main className="min-h-screen" style={{ background: "#FAFAF8", color: INK, fontFamily: "var(--font-inter, sans-serif)" }}>

      {/* ── Nav ── */}
      <nav style={{ background: TEAL }} className="px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Image src="/icons/icon-192.png" alt="SariAssist" width={34} height={34} className="rounded-lg" />
          <span className="font-black text-white text-xl tracking-tight">SariAssist</span>
        </div>
        <a href={PLAY_URL} className="text-sm font-bold px-5 py-2 rounded-full" style={{ background: "white", color: TEAL }}>
          ▶ Kunin sa Google Play
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="px-6 pt-14 pb-12 text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-7">
          <div className="rounded-3xl overflow-hidden shadow-xl" style={{ width: 104, height: 104 }}>
            <Image src="/icons/icon-512.png" alt="SariAssist icon" width={104} height={104} />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-5">
          Iyong tindahan.{" "}
          <span style={{ color: TEAL }}>Iyong datos.</span>{" "}
          Iyo lang.
        </h1>
        <p className="text-lg sm:text-xl mb-8 leading-snug" style={{ color: INK }}>
          Subaybayan ang <b>benta, stock, at utang</b> ng tindahan mo — kahit walang internet.
          Nasa phone mo lang ang lahat: walang account, walang server, hindi ibinebenta ang datos mo.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-9">
          <TrustPill icon="🔒" label="100% Offline" sub="Gumagana kahit walang signal" />
          <TrustPill icon="📵" label="Walang account" sub="Buksan, gamitin agad" />
          <TrustPill icon="🔐" label="Datos sa iyo" sub="Walang ibang nakakakita ng benta't utang mo" />
        </div>

        <a
          href={PLAY_URL}
          className="inline-block font-black text-lg px-8 py-4 rounded-full shadow-lg"
          style={{ background: TEAL, color: "white", boxShadow: "0 8px 18px rgba(14,138,130,0.33)" }}
        >
          ▶ I-download sa Google Play
        </a>
        <p className="text-sm mt-4" style={{ color: MUTED }}>
          Libre habang buhay (may maliit na banner ad) · ₱50 para walang ads · ₱199 PRO na may backup · Isang beses lang, walang subscription.
        </p>
      </section>

      {/* ── Problem / empathy ── */}
      <section className="px-6 py-16" style={{ background: "#FFFDF9" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center tracking-tight mb-3">Pamilyar ba ito sa iyo?</h2>
          <p className="text-center text-base mb-10" style={{ color: MUTED }}>
            Bago ka pa malugi, dapat alam mo na kung saan napupunta ang pera mo. Ito ang totoong laban ng bawat tindera:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "“Dumadami ang utang na hindi mo na ma-track — sino ba may utang at magkano na?”",
              "“Mukhang mabenta naman… pero bakit parang walang natitirang pera sa araw-araw?”",
              "“Mahina ang signal dito — hindi pwede ang app na laging kailangan ng internet.”",
              "“Ayoko ng app na nagbebenta ng datos ko o nakikialam sa benta ko.”",
            ].map((q) => (
              <div key={q} className="p-5 rounded-2xl" style={{ background: "white", border: `1px solid ${BORDER}` }}>
                <p className="text-base leading-snug" style={{ color: INK }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features as outcomes ── */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center tracking-tight mb-3">
          Lahat ng kailangan ng tindahan mo — sa isang app
        </h2>
        <p className="text-center text-base mb-12" style={{ color: MUTED }}>
          Walang kulang, walang kumplikado. Kung marunong kang mag-text, kaya mo ito.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            ["📒", "Utang Ledger", "Alamin kung sino may utang at magkano, per suki. May running total ng pera na nasa labas at history ng bayad. Ito ang #1 dahilan ng pagkalugi — kontrolin mo na."],
            ["📊", "Buod ng Kita", "Sa isang screen: magkano benta mo ngayon, magkano net kita matapos ang puhunan, at magkano ang nasa utang. Diretsong sagot, walang hula."],
            ["🛍️", "Mabilis na Benta (POS)", "I-tap ang produkto, auto-compute ang sukli. Tapos ang checkout sa ilang segundo, kahit busy ang tindahan."],
            ["📦", "Inventory Tracking", "Alam mo lagi kung ilan pa ang natitira. May babala kung mababa na ang stock, para hindi ka maubusan ng mabentang produkto."],
            ["💰", "Profit Tracker", "Per-product na puhunan at kita. Makita kung anong produkto talaga ang kumikita, at alin ang sayang sa pwesto."],
            ["💸", "Expense Tracker", "I-record ang kuryente, tubig, at iba pang gastos hiwalay sa benta — para totoo ang net kita mo."],
            ["📱", "GCash + Load", "I-record ang cash-in/cash-out at load sales. May built-in scam check kontra phishing at fake na padala."],
            ["📋", "Kasaysayan ng Benta", "Lahat ng transaksyon naka-save sa phone. I-filter by araw, linggo, o buwan — handa kapag tinanong, “magkano kita natin nung Linggo?”"],
          ].map(([icon, title, desc]) => (
            <div key={title} className="p-6 rounded-2xl" style={{ background: "white", border: `1px solid ${BORDER}` }}>
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-base mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Honest comparison ── */}
      <section className="px-6 py-16" style={{ background: "#FFFDF9" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center leading-tight tracking-tight mb-3">
            Pareho kaming libre at offline.{" "}
            <span style={{ color: TEAL }}>Pero may pagkakaiba.</span>
          </h2>
          <p className="text-center text-base mb-10" style={{ color: MUTED }}>
            Maganda ang ibang libreng POS gaya ng Peddlr — libre rin, offline rin. Wala kaming masamang sinasabi sa kanila.
            Ang tanong: saan napupunta ang datos mo, at sino ang kumikita sa iyo? Ito ang tatlong totoong pinagkaiba:
          </p>

          <div className="rounded-3xl border-2 overflow-hidden" style={{ background: "white", borderColor: BORDER }}>
            <div className="grid grid-cols-2 text-sm sm:text-base">
              <div className="p-4 sm:p-5 font-bold text-center border-r-2 border-b-2" style={{ borderColor: BORDER, background: "#FBE9E2", color: "#7A1F0A" }}>Ibang app</div>
              <div className="p-4 sm:p-5 font-bold text-center border-b-2" style={{ borderColor: BORDER, background: "#E2F4F0", color: TEAL_DEEP }}>SariAssist</div>
              {[
                ["Pumupunta sa kanilang server ang benta mo (kailangan ng account/cloud)", "Nasa cellphone mo lang — walang server, kaya physically hindi makakaalis ang datos mo"],
                ["May FMCG (gaya ng GrowSari/Sari.PH) na minomonitor ang inventory at benta mo para sa supplier", "Walang FMCG, walang supplier middleman na nakatingin sa tindahan mo"],
                ["“Libre” dahil ikaw ang produkto — datos mo ang kinikita", "Libre rin to start, pero hinding-hindi ibinebenta ang datos mo"],
                ["Pwedeng magdagdag ng buwanang bayad o baguhin ang model bukas", "Bayad once (₱50/₱199), sa iyo na — walang subscription"],
                ["Kailangan mag-sign up gamit email/number bago magamit", "Walang account, walang sign-up — buksan at gamitin agad"],
              ].map(([bad, good], i, arr) => (
                <CompareRow key={bad} bad={bad} good={good} last={i === arr.length - 1} />
              ))}
            </div>
          </div>

          <p className="text-center mt-6 text-sm leading-relaxed" style={{ color: MUTED }}>
            Para patas: hindi namin sinasabing bayad o online ang ibang app — marami ring libre at offline.
            Ang pinagkaiba ng SariAssist ay nasa phone mo lang ang datos (walang server para sa benta mo),
            walang FMCG na nakatingin, at isang beses lang ang bayad imbes na ikaw ang maging produkto.
          </p>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="px-6 py-16" style={{ background: "#FAFAF8" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center tracking-tight mb-3">
            Isang beses lang ang bayad. <span style={{ color: TEAL }}>Sa iyo na forever.</span>
          </h2>
          <p className="text-center text-base mb-12 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Lahat ng plano: kumpletong features, offline, walang account. Ang pinagkaiba lang — ads (at backup sa PRO).
            Walang subscription, walang buwanang bayad, walang hidden charge.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
            <PlanCard name="LIBRE" price="₱0" tagline="Libre habang buhay" perks={["Lahat ng features", "Offline · walang account", "May iisang maliit na banner ad"]} />
            <PlanCard name="LITE" price="₱50" tagline="Isang beses lang" badge="⭐ Sulit · pinili ng marami" accent perks={["Walang ads forever", "Lahat ng features", "Offline · walang account"]} />
            <PlanCard name="PRO" price="₱199" tagline="Isang beses lang" featured perks={["Walang ads forever", "Backup at export (CSV) — ligtas kahit mapalitan ang phone", "Una sa premium features"]} />
          </div>

          <div className="mt-8 p-5 rounded-2xl max-w-2xl mx-auto" style={{ background: "white", border: `1px solid ${BORDER}` }}>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              <b style={{ color: INK }}>Tapat tayo sa ads:</b> ang banner sa LIBRE ay generic na ad galing{" "}
              <b>Google AdMob</b>. Nakikita lang nito ang device ad ID ng phone mo (gaya ng halos lahat ng libreng app) —{" "}
              <b style={{ color: INK }}>HINDI</b> ang benta, utang, o inventory mo, at hindi base sa datos mo ang ipinapakita.
              Kailangan ng internet para mag-load ang ad; offline pa rin gumagana ang app. Sa LITE at PRO, tuluyang nawawala
              ang ad at walang ad tracking.
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust band ── */}
      <section className="px-6 py-20" style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DEEP} 100%)` }}>
        <div className="max-w-2xl mx-auto text-center text-white">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight leading-tight">
            Sa iyong cellphone lang.<br />
            <span style={{ color: TEAL_TINT }}>Walang ibang nakakaalam ng benta mo.</span>
          </h2>
          <p className="text-lg opacity-95 leading-snug mb-8">
            Walang account, walang cloud, walang sync para sa datos mo — kaya walang server na pwedeng ma-hack o
            pagbentahan ng benta't utang mo. Hindi ito basta pangako: walang lugar kung saan pupunta ang datos ng
            tindahan mo kundi sa phone mo. At <b>hinding-hindi namin ibinebenta ang datos mo kahit kailan.</b>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            {["🔒 Walang server para sa datos mo", "🙅 Walang FMCG na nakatingin", "🤝 Gawa ng Pilipino, hindi pinopondohan ng FMCG"].map((x) => (
              <span key={x} className="px-4 py-2 rounded-full font-bold" style={{ background: "rgba(255,255,255,0.18)" }}>{x}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Early adopter invite (honest — no fabricated reviews) ── */}
      <section className="px-6 py-16 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-black tracking-tight mb-3">Maging isa sa mga unang tindera</h2>
        <p className="text-base mb-8" style={{ color: MUTED }}>
          Bagong app pa lang ang SariAssist — gawa ng mga Pilipino, para sa mga Pilipino. Walang pekeng review,
          walang bayad na endorser. Subukan mo nang libre, at sabihin sa amin kung ano ang pwede pang gawing mas maganda.
        </p>
        <a href={PLAY_URL} className="inline-block font-bold text-base px-7 py-3 rounded-full" style={{ background: TEAL, color: "white" }}>
          ▶ Subukan nang libre
        </a>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-16" style={{ background: "#FFFDF9" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center tracking-tight mb-3">Mga madalas itanong</h2>
          <p className="text-center text-base mb-10" style={{ color: MUTED }}>Tapatan tayo. Heto ang totoong sagot.</p>
          <div className="flex flex-col gap-3">
            {[
              ["Bakit may bayad kung libre ang iba?", "Libre talaga ang LIBRE habang buhay — kumpleto ang features. Magbabayad ka lang ng ₱50 o ₱199, isang beses lang, para alisin ang ad at makakuha ng backup. Walang subscription. Marami sa “libreng” app ay kumikita sa datos mo o sa supplier deals — sa SariAssist, maliit na one-time bayad imbes na ikaw ang produkto."],
              ["Ligtas ba ang datos ko? Ibebenta niyo ba?", "Walang server at walang account ang SariAssist, kaya physically hindi makakaalis sa phone mo ang datos ng tindahan — walang lugar kung saan ito pupunta o ibebenta. Hinding-hindi namin ibinebenta ang datos mo kahit kailan."],
              ["Kailangan ba ng internet?", "Hindi. Offline-first ang SariAssist — kaya mong mag-record ng benta, utang, at inventory nang walang data o load. Optional lang ang internet (ginagamit lang ito kung may ad sa LIBRE o kapag nag-back up sa PRO)."],
              ["May ads ba?", "Tapat kami: sa LIBRE may iisang maliit na banner galing Google AdMob — generic lang, hindi base sa benta o gawi mo. Sa LITE at PRO, walang ads at walang ad tracking. Hindi namin sinasabing “walang ads” ang buong app — may ad ang LIBRE, at tapat kami diyan."],
              ["Pwede ba alisin ang ads?", "Oo. ₱50 (LITE) o ₱199 (PRO), isang beses lang, at mawawala ang ad habang buhay — walang buwanang bayad para panatilihing wala. Sa PRO, may backup/export pa para ligtas ang datos mo."],
              ["Paano kung mawala o mapalitan ang phone — mawawala ba lahat?", "Tapat tayo: dahil nasa device lang ang datos, mawawala ito kapag nawala ang phone — maliban kung naka-backup. Kaya may CSV export/backup ang PRO (₱199): pwede mong i-save at ilipat ang datos sa bagong phone. Ito ang pinakamatibay na dahilan para mag-PRO."],
              ["Mahirap ba gamitin? Hindi ako marunong sa tech.", "Hindi. Taglish, tap-to-sell, auto-sukli, at walang sign-up. Kung marunong kang mag-text, kaya mo ito."],
              ["Totoo bang walang hidden charges o buwanang bayad?", "Oo. Walang subscription, walang buwanang bayad, walang nakatagong singil. Bayad once, sa iyo na forever."],
            ].map(([q, a]) => (
              <details key={q} className="rounded-2xl p-5" style={{ background: "white", border: `1px solid ${BORDER}` }}>
                <summary className="font-bold text-base cursor-pointer" style={{ color: INK }}>{q}</summary>
                <p className="text-sm leading-relaxed mt-3" style={{ color: MUTED }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-6 py-20 text-center" style={{ background: "#FAFAF8" }}>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
          Handa ka na bang <span style={{ color: TEAL }}>maging may-ari ng datos mo?</span>
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: MUTED }}>
          Libre to start (may maliit na ad), alisin ang ad sa ₱50, o kumuha ng backup sa PRO.
          Walang subscription, walang nag-aabang sa benta mo.
        </p>
        <a
          href={PLAY_URL}
          className="inline-block font-black text-xl px-10 py-5 rounded-full"
          style={{ background: TEAL, color: "white", boxShadow: "0 8px 24px rgba(14,138,130,0.40)" }}
        >
          ▶ I-download sa Google Play · Libre
        </a>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-10 text-center border-t" style={{ borderColor: BORDER }}>
        <p className="text-xs mb-4 italic max-w-xl mx-auto" style={{ color: MUTED }}>
          Gawa ng mga Pilipino, para sa mga Pilipino. Hindi pinopondohan ng FMCG. Walang tinatagong data deal,
          walang nakatagong agenda. May tanong o problema? Mag-email lang — sasagutin ka ng tao.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-3">
          <Link href="/privacy" style={{ color: TEAL, fontWeight: 700 }}>Privacy Policy</Link>
          <a href="mailto:kristianjvsacdalan@gmail.com" style={{ color: MUTED }}>Tulong / Contact</a>
        </div>
        <p className="text-xs" style={{ color: MUTED }}>© 2026 HNScorp · Philippines</p>
      </footer>
    </main>
  );
}

// ─────────── Components ───────────

function TrustPill({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 max-w-[230px]" style={{ background: "white", borderColor: BORDER }}>
      <span className="text-lg">{icon}</span>
      <div className="text-left">
        <div className="font-bold text-sm leading-none">{label}</div>
        <div className="text-[10px] mt-0.5 leading-tight" style={{ color: MUTED }}>{sub}</div>
      </div>
    </div>
  );
}

function CompareRow({ bad, good, last }: { bad: string; good: string; last: boolean }) {
  const border = last ? {} : { borderBottom: `1px solid ${BORDER}` };
  return (
    <>
      <div className="p-4 sm:p-5 flex items-start gap-2 border-r-2" style={{ borderColor: BORDER, ...border, color: "#5C2A1F" }}>
        <span className="text-base shrink-0">✕</span>
        <span className="text-sm">{bad}</span>
      </div>
      <div className="p-4 sm:p-5 flex items-start gap-2" style={{ ...border, color: TEAL_DEEP }}>
        <span className="text-base shrink-0">✓</span>
        <span className="text-sm font-medium">{good}</span>
      </div>
    </>
  );
}

function PlanCard({
  name, price, tagline, perks, badge, accent, featured,
}: {
  name: string; price: string; tagline: string; perks: string[]; badge?: string; accent?: boolean; featured?: boolean;
}) {
  const borderColor = featured ? TEAL : accent ? "#2EC4B6" : BORDER;
  const nameColor = featured ? TEAL : accent ? "#0F6E60" : INK;
  return (
    <div className="p-6 rounded-2xl flex flex-col relative" style={{ background: "white", border: `2px solid ${borderColor}` }}>
      {badge ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
          style={{ background: "#2EC4B6", color: "white" }}>
          {badge}
        </div>
      ) : null}
      <div className="font-black text-lg tracking-wide" style={{ color: nameColor }}>{name}</div>
      <div className="text-3xl font-black mt-1" style={{ color: "#E0A23C" }}>{price}</div>
      <div className="text-xs mb-4" style={{ color: MUTED }}>{tagline}</div>
      <ul className="space-y-2 flex-1">
        {perks.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm" style={{ color: INK }}>
            <span className="shrink-0" style={{ color: "#0F6E60" }}>✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
