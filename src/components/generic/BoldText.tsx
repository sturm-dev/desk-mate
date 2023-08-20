import { HTMLAttributes } from "react";
import { Font_Lato400 } from "@/fonts";

type SpanProps = HTMLAttributes<HTMLSpanElement>;

export const BoldText = ({
  children,
  ...props
}: { children: string | string[] } & SpanProps) => (
  <span {...props} style={{ fontFamily: Font_Lato400.style.fontFamily }}>
    {children}
  </span>
);
