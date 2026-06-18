export const metadata = {
  title: "Privacy Policy — TindaPOS",
  description: "Privacy policy for TindaPOS",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 text-sm leading-relaxed" style={{ color: "#1A1714", fontFamily: "sans-serif" }}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: "#0E8A82" }}>TindaPOS — Privacy Policy</h1>
      <p className="text-xs mb-8" style={{ color: "#6B6460" }}>Effective date: June 18, 2026</p>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">1. Overview</h2>
        <p>
          TindaPOS is an offline-first point-of-sale app for Filipino sari-sari store owners. Your business
          data stays on your device. This policy explains exactly what stays private, and the one place a
          third party is involved: ads on the free (LIBRE) tier.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">2. Your business data stays on your device</h2>
        <p className="mb-2"><strong>We do not collect your business data.</strong></p>
        <p>
          Everything you enter — products, prices, sales, expenses, and utang (credit) records — is stored
          only on your device (in the app&apos;s local database). It is never sent to us. We operate no server
          and no cloud database for your data, so there is nothing on our side to leak or sell. No account or
          login is required.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">3. Advertising on the free (LIBRE) tier</h2>
        <p className="mb-2">
          The free LIBRE tier shows a small banner ad served by <strong>Google AdMob</strong>. To do this,
          the Google Mobile Ads SDK is included in the app and, on the LIBRE tier, receives a{" "}
          <strong>device advertising identifier</strong> (Android Advertising ID / GAID) and standard request
          data (such as IP address) in order to serve and measure ads — the same as most free apps.
        </p>
        <p className="mb-2">
          Google AdMob does <strong>not</strong> receive your business data — your sales, utang, inventory, or
          expenses are never shared with it or anyone else. The ads are generic and are not based on the data
          you record in TindaPOS.
        </p>
        <p className="mb-2">
          On first launch we ask for ad-consent where required (via Google&apos;s consent tools). Google&apos;s
          handling of ad data is governed by its own policy:{" "}
          <a href="https://policies.google.com/technologies/ads" style={{ color: "#0E8A82" }}>
            Google Advertising / AdMob privacy
          </a>. You can reset or limit your advertising ID in your Android settings.
        </p>
        <p>
          The paid <strong>LITE (₱50)</strong> and <strong>PRO (₱199)</strong> tiers show{" "}
          <strong>no ads</strong>, and no advertising identifier is used for ads on those tiers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">4. In-app purchases</h2>
        <p>
          LITE and PRO are one-time purchases processed by <strong>Google Play Billing</strong>. Payments are
          handled entirely by Google — we never see or store your card, GCash, or payment details. Google
          tells us only whether a purchase was completed, so the app can unlock the tier on your device.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">5. No sale of your data</h2>
        <p>
          We do not sell your data, and we have no analytics, tracking, or profiling of your business activity.
          The only third party involved is Google (for LIBRE ads and for in-app purchases), strictly for those
          functions — never for your sales or customer records.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">6. Permissions</h2>
        <p>TindaPOS keeps permissions minimal:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li><strong>Internet</strong> — used only to load ads (LIBRE) and process purchases. The app&apos;s core features work fully offline.</li>
          <li><strong>Advertising ID</strong> — declared for AdMob ads on the LIBRE tier (Android 13+). Not used on LITE/PRO.</li>
        </ul>
        <p className="mt-2">We do not access your camera, microphone, location, contacts, or personal files.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">7. Children&apos;s privacy</h2>
        <p>
          TindaPOS is for adults operating small businesses and is not directed at children under 13. Ad
          content is configured as non–child-directed and general-audience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">8. Deleting your data</h2>
        <p>
          Since your data lives on your device, uninstalling the app removes it. The app does not back your
          data up to any cloud automatically — if you want a copy you can keep (and restore to a new phone),
          use the CSV export/backup in the PRO tier.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">9. Changes to this policy</h2>
        <p>
          If we update this policy, we will update the effective date above. Continued use of the app after
          changes constitutes acceptance of the updated policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">10. Contact</h2>
        <p>
          For questions about this policy, contact us at:{" "}
          <a href="mailto:kristianjvsacdalan@gmail.com" style={{ color: "#0E8A82" }}>
            kristianjvsacdalan@gmail.com
          </a>
        </p>
      </section>

      <p className="text-xs mt-12" style={{ color: "#6B6460" }}>
        TindaPOS is developed by HNScorp · Philippines
      </p>
    </main>
  );
}
