import YouTube, { YouTubeProps } from "react-youtube";

export const YoutubeBgPlayer = () => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setTimeout(() => {
      event.target.setVolume(0);
      event.target.playVideo();
    }, 100);
    setTimeout(() => {
      event.target.pauseVideo();
    }, 200);
    setTimeout(() => {
      event.target.playVideo();
    }, 300);
  };

  const opts: YouTubeProps["opts"] = {
    height: "500",
    width: "500",
    playerVars: { loop: 1 },
  };

  return <YouTube videoId="V1bFr2SWP1I" opts={opts} onReady={onPlayerReady} />;
};

/* <iframe
  width="200"
  height="200"
  src="https://www.youtube.com/embed/V1bFr2SWP1I?autoplay=1&mute=1&loop=1"
/> */
