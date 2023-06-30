import { useEffect, useRef, useState } from "react";

export const useScrollToBottom = ({
  readyToRun,
  openFullScreen = () => {},
}: {
  readyToRun: boolean;
  openFullScreen: () => void;
}) => {
  const [alreadyScrollToBottom, setAlreadyScrollToBottom] = useState(false);

  const bottomDiv_ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!readyToRun || alreadyScrollToBottom) return;

    setTimeout(() => {
      openFullScreen();
    }, 1500);

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
