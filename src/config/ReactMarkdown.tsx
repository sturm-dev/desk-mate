import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";

import { Font_Mulish500 } from "@/fonts";

export const ReactMarkdown_ComponentsConfig:
  | Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>
  | undefined = {
  h1: ({ node, ...props }) => <p className="text-2xl" {...props} />,
  h2: ({ node, ...props }) => <p className="text-xl" {...props} />,
  h3: ({ node, ...props }) => <p className="text-lg" {...props} />,
  h4: ({ node, ...props }) => <p className="text-md" {...props} />,
  h5: ({ node, ...props }) => <p className="text-sm" {...props} />,
  h6: ({ node, ...props }) => <p className="text-xs" {...props} />,
  p: ({ node, ...props }) => <p {...props} />,
  strong: ({ node, ...props }) => (
    <span style={{ fontFamily: Font_Mulish500.style.fontFamily }} {...props} />
  ),
};
