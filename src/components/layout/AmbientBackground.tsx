export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-studio-950">
      {/* Subtle top studio lighting glow */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[120px] opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(226, 184, 118, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 80%)"
        }}
      />
    </div>
  );
}
