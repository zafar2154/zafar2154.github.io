export default function SectionHeading({
  index,
  title,
  align = "left",
}: {
  index: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="trace-label text-xs text-circuit-copper">{index}</p>
      <h2 className="mt-2 font-mono text-2xl font-extrabold tracking-tight text-circuit-text sm:text-3xl">
        {title}
      </h2>
      <div
        className={`mt-4 h-px w-16 bg-circuit-led/70 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
