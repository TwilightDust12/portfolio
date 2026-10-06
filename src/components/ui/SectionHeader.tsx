interface SectionHeaderProps {
  chapter: string;
  tag: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  chapter,
  tag,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  return (
    <header className={`mb-12 border-b border-hairline pb-6 ${align === "center" ? "text-center mx-auto" : ""}`}>
      <div className="flex items-center gap-3 font-mono text-xs tracking-wider text-zinc-500 uppercase mb-3">
        <span className="text-accent-amber">[{chapter}]</span>
        <span>/</span>
        <span>{tag}</span>
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ivory-100">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-sans text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
}
