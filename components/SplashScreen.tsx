import Image from "next/image";

// Visibility is controlled entirely by CSS — the inline script in <head> adds
// the `splash-active` class to <html> only on cold launch (once per tab session),
// then `splash-fading`, then removes both. See app/layout.tsx and globals.css.
export function SplashScreen() {
  return (
    <div className="splash-screen fixed inset-0 z-[200] items-center justify-center bg-[#0E8A82]">
      <div className="relative w-full max-w-[640px] aspect-[1024/500] px-4">
        <Image
          src="/feature-graphic.png"
          alt="SariAssist — Ang POS ng bawat tindahan"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 640px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
