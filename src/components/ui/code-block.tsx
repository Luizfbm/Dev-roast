import { codeToHtml } from "shiki";
import { tv } from "tailwind-variants";

const codeBlock = tv({
  slots: {
    base: "relative w-full overflow-hidden border border-border-primary bg-bg-input font-mono text-[13px]",
    header:
      "flex h-10 items-center border-b border-border-primary px-4 bg-bg-input",
    dots: "flex gap-2 items-center",
    dot: "h-[10px] w-[10px] rounded-full",
    filename: "ml-auto text-text-tertiary text-xs",
    body: "flex",
    lineNumbers:
      "w-10 flex-shrink-0 flex flex-col items-end gap-[6px] px-[10px] py-4 border-r border-border-primary bg-secondary/30 text-text-tertiary select-none text-[12px]",
    content: "flex-1 overflow-x-auto p-4 [&>pre]:!bg-transparent [&>pre]:!p-0",
  },
});

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  className?: string;
}

/**
 * Server Component representing a code block with syntax highlighting.
 */
export async function CodeBlock({
  code,
  lang = "typescript",
  filename,
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "vesper",
  });

  const {
    base,
    header,
    dots,
    dot,
    filename: filenameStyle,
    body,
    lineNumbers,
    content,
  } = codeBlock();

  const linesCount = code.trim().split("\n").length;

  return (
    <div className={base({ className })}>
      <div className={header()}>
        <div className={dots()}>
          <div className={dot({ className: "bg-[#EF4444]" })} />
          <div className={dot({ className: "bg-[#F59E0B]" })} />
          <div className={dot({ className: "bg-[#10B981]" })} />
        </div>
        {filename && <span className={filenameStyle()}>{filename}</span>}
      </div>
      <div className={body()}>
        <div className={lineNumbers()}>
          {Array.from({ length: linesCount }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: lines are static
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted code highlighting */}
        <div className={content()} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
