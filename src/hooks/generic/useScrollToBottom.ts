import { useEffect, useRef, useState } from "react";

export const useScrollToBottom = ({ readyToRun }: { readyToRun: boolean }) => {
  const [alreadyScrollToBottom, setAlreadyScrollToBottom] = useState(false);

  const bottomDiv_ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!readyToRun || alreadyScrollToBottom) return;

    setTimeout(() => {
      let elem = document.documentElement;

      elem
        .requestFullscreen({ navigationUI: "show" })
        .then(() => {})
        .catch((err) => {
          alert(
            `An error occurred while trying to switch into fullscreen mode: ${err.message} (${err.name})`
          );
        });
    }, 2000);

    setTimeout(() => {
      bottomDiv_ref?.current?.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
      setAlreadyScrollToBottom(true);
    }, 4000);
  }, [readyToRun]);

  return { bottomDiv_ref };
};
