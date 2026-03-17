import { codeToHtml } from "shiki";
import { tv } from "tailwind-variants";

const codeBlock = tv({
  base: "relative w-full overflow-hidden border border-border-primary bg-bg-input font-mono text-[13px]",
  slots: {
    header:
      "flex h-10 items-center border-b border-border-primary px-4 bg-bg-input",
    content: "overflow-x-auto p-4 [&>pre]:!bg-transparent [&>pre]:!p-0",
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

  const { base, header, content } = codeBlock();

  return (
    <div className={base({ className })}>
      {filename && (
        <div className={header()}>
          <span className="text-text-tertiary text-xs">{filename}</span>
        </div>
      )}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output is trusted code highlighting */}
      <div className={content()} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
