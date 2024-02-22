import { Font_Mulish500 } from "@/fonts"

export const ReactMarkdown_ComponentsConfig = {
  strong: ({ ...props }) => (
    <span style={{ fontFamily: Font_Mulish500.style.fontFamily }} {...props} />
  )
}

// ─── Source ──────────────────────────────────────────────────────────────────

// react markdown components -> https://github.com/remarkjs/react-markdown#appendix-b-components
