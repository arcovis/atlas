export default function BackgroundPage() {
  return (
    <main
      aria-hidden="true"
      className="relative min-h-dvh w-full overflow-hidden bg-[#050706]"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundRepeat: "repeat",
        backgroundPosition: "center center",
        backgroundSize: "640px 640px",
        backgroundAttachment: "fixed",
        filter: "brightness(1.08) contrast(1.04) saturate(1.03)",
      }}
    >
    </main>
  );
}
