import YouTube, { YouTubeProps } from "react-youtube";

const videoId = "V1bFr2SWP1I";

export const YoutubeBgPlayer = () => {
  const opts: YouTubeProps["opts"] = {
    height: "10",
    width: "10",
    playerVars: { autoplay: 1, mute: 1, playlist: videoId, loop: 1 },
  };

  const onPause: YouTubeProps["onPause"] = (event) => {
    // access to player in all event handlers via event.target
    setTimeout(() => {
      event.target.playVideo();
    }, 100);
  };

  return (
    <div className="absolute -z-10">
      <YouTube videoId={videoId} opts={opts} onPause={onPause} />
    </div>
  );
};

// NOTE: try 1:30hs to fix this error without success
// Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('https://www.youtube.com') does not match the recipient window's origin
