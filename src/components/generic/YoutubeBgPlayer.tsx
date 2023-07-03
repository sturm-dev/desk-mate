import YouTube, { YouTubeProps } from "react-youtube";

export const YoutubeBgPlayer = () => {
  const onPlayerReady: YouTubeProps["onReady"] = async (event) => {
    console.log(`onPlayerReady - event.target`, event.target);

    await sleep(100);
    event.target.playVideo();

    await sleep(100);
    event.target.pauseVideo();

    await sleep(100);
    event.target.playVideo();
  };
  const onVideoEnd: YouTubeProps["onReady"] = async (event) => {
    console.log(`onVideoEnd - event.target`, event.target);

    await sleep(100);
    event.target.playVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "500",
    width: "500",
    playerVars: { autoplay: 1, mute: 1 },
  };

  return (
    <YouTube
      videoId="V1bFr2SWP1I"
      opts={opts}
      onReady={onPlayerReady}
      onEnd={onVideoEnd}
    />
  );
};

/* <iframe
  width="200"
  height="200"
  src="https://www.youtube.com/embed/V1bFr2SWP1I?autoplay=1&mute=1&loop=1"
/> */

// ─────────────────────────────────────────────────────────────────────────────

// sleep function
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
