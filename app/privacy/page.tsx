export const metadata = {
  title: "Privacy Policy — TindaPOS",
  description: "Privacy policy for TindaPOS",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 text-sm leading-relaxed" style={{ color: "#1A1714", fontFamily: "sans-serif" }}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: "#F59E0B" }}>TindaPOS — Privacy Policy</h1>
      <p className="text-xs mb-8" style={{ color: "#6B6460" }}>Effective date: May 12, 2026</p>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">1. Overview</h2>
        <p>
          TindaPOS is an offline-first point-of-sale application designed for Filipino sari-sari store owners.
          We take your privacy seriously. This policy explains how we handle your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">2. Data We Collect</h2>
        <p className="mb-2"><strong>We collect no personal data.</strong></p>
        <p>
          All data you enter into TindaPOS — including product names, prices, sales transactions,
          and expenses — is stored exclusively on your device using your browser&apos;s local storage
          (IndexedDB). This data never leaves your device.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">3. No Servers, No Cloud</h2>
        <p>
          TindaPOS has no backend server, no database, and no cloud storage. We do not transmit,
          collect, store, or process any of your business or personal data on any server.
          There is no account registration or login required.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">4. No Ads</h2>
        <p>
          TindaPOS contains no advertisements and no third-party advertising SDKs.
          We do not use advertising identifiers (IDFA, GAID) or any ad networks.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">5. No Third-Party Sharing</h2>
        <p>
          We do not share any data with third parties because we do not collect any data.
          No analytics, no crash reporting, no tracking SDKs are included in the app.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">6. Permissions</h2>
        <p>TindaPOS does not request any device permissions. It does not access your:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Camera or microphone</li>
          <li>Location</li>
          <li>Contacts</li>
          <li>Files or storage</li>
          <li>Device identifiers</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">7. Children&apos;s Privacy</h2>
        <p>
          TindaPOS is intended for use by adults operating small businesses. It is not directed
          at children under 13. We do not knowingly collect data from children.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">8. Data Deletion</h2>
        <p>
          Since all data is stored on your device, you can delete it at any time by clearing
          your browser&apos;s site data or uninstalling the app. No request to us is needed.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">9. Changes to This Policy</h2>
        <p>
          If we update this policy, we will update the effective date above. Continued use of
          the app after changes constitutes acceptance of the updated policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">10. Contact</h2>
        <p>
          For questions about this privacy policy, contact us at:{" "}
          <a href="mailto:kristianjvsacdalan@gmail.com" style={{ color: "#F59E0B" }}>
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
