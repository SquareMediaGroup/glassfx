/**
 * Minimal backdrop. Clean black with a subtle dot grid and grain texture.
 * No color gradients — the glass surfaces are the visual focus.
 */
export default function Backdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black" aria-hidden>
      <div className="stage-grid" />
      <div className="stage-grain" />
    </div>
  );
}
