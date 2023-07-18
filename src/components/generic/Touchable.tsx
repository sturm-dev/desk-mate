import { useState } from "react";

export const Touchable = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const [fade, setFade] = useState(false);

  return (
    <div
      className={`cursor-pointer select-none transition-all duration-100 ${
        !fade ? "opacity-100" : "opacity-20"
      }`}
      onClick={onClick}
      onMouseDown={() => setFade(true)}
      onMouseUp={() => setTimeout(() => setFade(false), 100)}
    >
      {children}
    </div>
  );
};
