import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Font_Mulish200 } from "@/fonts";
import { ReactMarkdown_ComponentsConfig } from "@/config";

export const C_ReactMarkdown = ({ text }: { text: string }) => {
  return (
    <div style={{ fontFamily: Font_Mulish200.style.fontFamily }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="prose lg:prose-xl dark:prose-invert"
        components={ReactMarkdown_ComponentsConfig}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

// ─── Sources ──────────────────────────────────────────────────────────────────

// react-markdown with tailwind -> https://github.com/remarkjs/react-markdown/issues/505#issuecomment-724911501
// tailwind plugin for markdown -> https://tailwindcss.com/docs/typography-plugin
// more custom styling -> https://tailwindcss.com/docs/typography-plugin#element-modifiers
