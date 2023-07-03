"use client";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import YouTube, { YouTubeProps } from "react-youtube";

import {
  HeaderSection,
  CalendarSection,
  FullLoading,
  MarkdownSection,
  BgAnimatedGradient,
} from "@/components";
import {
  useAuthRedirect,
  useGetDateEveryMinute,
  useGetDivDimensions,
  useUserData,
} from "@/hooks";

export default function Index() {
  const fullScreenHandle = useFullScreenHandle();
  const { authLoading } = useAuthRedirect();
  const { user, userData } = useUserData({ authLoading });

  const { currentDate } = useGetDateEveryMinute();

  // ─────────────────────────────────────────────────────────────────────
  const { dimensions: dimensions_divFather, div_ref: ref_divFather } =
    useGetDivDimensions();
  const { dimensions: dimensions_divHeader, div_ref: ref_divHeader } =
    useGetDivDimensions();

  const body_height =
    dimensions_divFather?.height - dimensions_divHeader?.height;
  // ─────────────────────────────────────────────────────────────────────
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    console.log(`onPlayerReady - event.target`, event.target);
    setTimeout(() => {
      event.target.setVolume(0);
      event.target.playVideo();
    }, 500);
    setTimeout(() => {
      event.target.pauseVideo();
    }, 1000);
    setTimeout(() => {
      event.target.playVideo();
    }, 1500);
  };

  const opts: YouTubeProps["opts"] = {
    height: "500",
    width: "500",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // mute: 1,
      // autoplay: 1,
      // loop: 1,
    },
  };
  // ─────────────────────────────────────────────────────────────────────

  if (authLoading || !user) return <FullLoading />;

  return (
    <FullScreen handle={fullScreenHandle}>
      <BgAnimatedGradient>
        <div className="flex-1">
          {/* ───────────────────────────────────────────────────── */}
          <div ref={ref_divFather} className="flex flex-col h-screen w-screen">
            <HeaderSection
              ref_div={ref_divHeader}
              fullScreenHandle={fullScreenHandle}
              currentDate={currentDate}
            />
            <div className="flex flex-1 flex-row">
              <div className="flex flex-1 flex-col">
                {/* ───────────────────────────────────────────────────── */}
                <MarkdownSection
                  title={`📅 Today`}
                  mdText={userData?.daily__md_text}
                />
                <div className="flex flex-1 flex-col">
                  <MarkdownSection
                    title="🗓️ This week"
                    mdText={userData?.week__md_text}
                  />
                  <MarkdownSection
                    title="📌 Do not forget"
                    mdText={userData?.not_forget__md_text}
                  />
                </div>
              </div>
              <CalendarSection
                text={userData?.calendar_text}
                height={body_height}
                currentDate={currentDate}
              />
            </div>
            {/* youtube video running on background to screen not to sleep */}
            <YouTube
              videoId="V1bFr2SWP1I"
              opts={opts}
              onReady={onPlayerReady}
            />
            {/* <iframe
              width="200"
              height="200"
              src="https://www.youtube.com/embed/V1bFr2SWP1I?autoplay=1&mute=1&loop=1"
            /> */}
          </div>
        </div>
      </BgAnimatedGradient>
    </FullScreen>
  );
}
