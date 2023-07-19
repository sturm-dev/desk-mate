import { HTMLAttributes, useState } from "react";

type DivProps = HTMLAttributes<HTMLDivElement>;

export const Touchable = ({
  children,
  onClick,
  className,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: DivProps["className"];
} & DivProps) => {
  const [fade, setFade] = useState(false);

  return (
    <div
      className={`cursor-pointer select-none transition-all duration-100 ${
        !fade ? "opacity-100" : "opacity-20"
      } ${className}`}
      onClick={onClick}
      onMouseDown={() => setFade(true)}
      onMouseUp={() => setTimeout(() => setFade(false), 100)}
      {...props}
    >
      {children}
    </div>
  );
};
