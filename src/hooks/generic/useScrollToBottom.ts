import { useEffect, useRef, useState } from "react";

export const useScrollToBottom = ({ readyToRun }: { readyToRun: boolean }) => {
  const [alreadyScrollToBottom, setAlreadyScrollToBottom] = useState(false);

  const bottomDiv_ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!readyToRun || alreadyScrollToBottom) return;

    setTimeout(() => {
      bottomDiv_ref?.current?.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
      setAlreadyScrollToBottom(true);
    }, 2000);
  }, [readyToRun]);

  return { bottomDiv_ref };
};
