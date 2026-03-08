export function PaneBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      <div
        className="absolute -top-[300px] -right-[100px] h-[800px] w-[800px] opacity-0 transition-opacity duration-1000 dark:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute -bottom-[300px] -left-[100px] h-[800px] w-[800px] opacity-0 transition-opacity duration-1000 dark:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  )
}
