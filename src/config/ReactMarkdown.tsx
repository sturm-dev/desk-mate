import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";

import { Font_Mulish500 } from "@/fonts";

export const ReactMarkdown_ComponentsConfig:
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined = {
  strong: ({ node, ...props }) => (
    <span style={{ fontFamily: Font_Mulish500.style.fontFamily }} {...props} />
  ),
};

// ─── Source ──────────────────────────────────────────────────────────────────

// react markdown components -> https://github.com/remarkjs/react-markdown#appendix-b-components
