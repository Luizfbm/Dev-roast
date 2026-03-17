import { tv } from "tailwind-variants";

const scoreRing = tv({
  slots: {
    container: "relative w-[180px] h-[180px] flex items-center justify-center",
    outer: "absolute inset-0 rounded-full border-4 border-border-primary",
    inner: "flex flex-col items-center justify-center gap-0.5 font-mono",
    score: "text-[48px] font-bold leading-none text-text-primary",
    max: "text-[16px] text-text-tertiary leading-none",
  },
});

export interface ScoreRingProps {
  score: number;
  max?: number;
  className?: string;
}

export const ScoreRing = ({ score, max = 10, className }: ScoreRingProps) => {
  const { container, outer, inner, score: scoreStyle, max: maxStyle } = scoreRing();

  // Angular gradient logic (approximate for the arc)
  const percentage = (score / max) * 100;

  return (
    <div className={container({ className })}>
      <div className={outer()} />
      {/* Percentage Arc */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 180deg, var(--accent-green) 0%, var(--accent-amber) ${percentage}%, transparent ${percentage + 1}%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          padding: "4px",
        }}
      />
      <div className={inner()}>
        <span className={scoreStyle()}>{score}</span>
        <span className={maxStyle()}>/{max}</span>
      </div>
    </div>
  );
};
