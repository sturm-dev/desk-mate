import YouTube, { YouTubeProps } from "react-youtube";

const videoId = "V1bFr2SWP1I";

export const YoutubeBgPlayer = () => {
  const opts: YouTubeProps["opts"] = {
    height: "10",
    width: "10",
    playerVars: { autoplay: 1, mute: 1, playlist: videoId, loop: 1 },
  };

  return (
    <div className="absolute -z-10">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};
