"use client";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import {
  HeaderSection,
  CalendarDailySection,
  FullLoading,
  MarkdownSection,
  BgAnimatedGradient,
  YoutubeBgPlayer,
  CenterSection,
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
              <div className="flex w-1/4 flex-col" style={{ marginTop: -1 }}>
                {/* ───────────────────────────────────────────────────── */}
                <MarkdownSection
                  title={`📅 Today`}
                  mdText={userData?.daily__md_text}
                />
                <div className="flex flex-col">
                  <MarkdownSection title="🔥 Beast mode" mdText="" />
                  <MarkdownSection
                    title="📌 Do not forget"
                    mdText={userData?.not_forget__md_text}
                  />
                </div>
              </div>
              <CenterSection userData={userData} />
              <div className="w-1/4">
                <CalendarDailySection
                  text={userData?.calendar_text}
                  height={body_height}
                  currentDate={currentDate}
                />
              </div>
            </div>
            {/* youtube video running on background to screen not to sleep */}
            <YoutubeBgPlayer />
          </div>
        </div>
      </BgAnimatedGradient>
    </FullScreen>
  );
}
