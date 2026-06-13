/**
 * The living spectral stage. Layered drifting colour meshes + grid + sweeping
 * beams + grain — the bright, high-frequency content the glass refracts.
 * Rendered fixed behind everything; sections sit on transparent ground above it.
 */
export default function Backdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink" aria-hidden>
      {/* static spectral base — guarantees living colour regardless of the
          animated meshes' current frame */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 18% 12%, rgba(255,93,59,0.55), transparent 60%), radial-gradient(55% 55% at 88% 8%, rgba(255,178,59,0.4), transparent 58%), radial-gradient(65% 65% at 82% 88%, rgba(47,169,255,0.5), transparent 62%), radial-gradient(60% 60% at 12% 86%, rgba(139,92,246,0.5), transparent 60%), radial-gradient(50% 50% at 50% 50%, rgba(255,77,141,0.32), transparent 60%)",
        }}
      />
      <div className="stage-mesh" />
      {/* a second, counter-phase mesh for richer colour movement */}
      <div
        className="stage-mesh"
        style={{ animationDirection: "reverse", animationDuration: "34s", opacity: 0.7 }}
      />
      <div className="stage-grid" />
      <div className="stage-beam" style={{ left: "8%" }} />
      <div className="stage-beam" style={{ left: "62%", animationDelay: "5.5s" }} />
      {/* vignette so content reads against the colour — kept light so the
          spectral pools stay visible behind the content. */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_-5%,transparent_30%,rgba(6,7,10,0.45)_75%,rgba(6,7,10,0.82))]" />
      <div className="stage-grain" />
    </div>
  );
}
