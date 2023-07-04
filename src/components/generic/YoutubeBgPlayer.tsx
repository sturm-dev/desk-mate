import YouTube, { YouTubeProps } from "react-youtube";

const videoId = "V1bFr2SWP1I";

export const YoutubeBgPlayer = () => {
  const opts: YouTubeProps["opts"] = {
    height: "200",
    width: "200",
    playerVars: { autoplay: 1, mute: 1, playlist: videoId, loop: 1 },
  };

  const onPause: YouTubeProps["onPause"] = (event) => {
    // access to player in all event handlers via event.target
    setTimeout(() => {
      event.target.playVideo();
    }, 100);
  };

  return (
    <div className="absolute z-10">
      <YouTube videoId={videoId} opts={opts} onPause={onPause} />
    </div>
  );
};
