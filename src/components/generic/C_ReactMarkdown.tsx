import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Font_Mulish200 } from "@/fonts";
import { ReactMarkdown_ComponentsConfig } from "@/config";

export const C_ReactMarkdown = ({ text }: { text: string }) => {
  return (
    <div
      className="leading-7 tracking-wide"
      style={{ fontFamily: Font_Mulish200.style.fontFamily }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={ReactMarkdown_ComponentsConfig}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
