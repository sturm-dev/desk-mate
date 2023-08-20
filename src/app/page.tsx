"use client";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { FullLoading, BgAnimatedGradient, YoutubeBgPlayer } from "@/components";
import {
  useAuthRedirect,
  useGetDateEveryMinute,
  useGetDivDimensions,
} from "@/hooks";
import { useAllDataBy, useAppData, useUser } from "@/db";

import {
  CalendarDaily_Section,
  Center_Section,
  CheckBoxList_Section,
  Header_Section,
} from "@/components/forThisApp/home";

export default function Index() {
  const fullScreenHandle = useFullScreenHandle();
  const { authLoading } = useAuthRedirect();
  const { user } = useUser({ authLoading });
  const { dataByDay, dataByUser, dataByWeek } = useAllDataBy({ user });
  const { appData } = useAppData({ user });
  // ─────────────────────────────────────────────────────────────────────

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
            <Header_Section
              ref_div={ref_divHeader}
              fullScreenHandle={fullScreenHandle}
              currentDate={currentDate}
              user={user}
            />
            <div className="flex flex-1 flex-row">
              <div className="flex w-1/4 flex-col" style={{ marginTop: -1 }}>
                {/* ───────────────────────────────────────────────────── */}
                <CheckBoxList_Section
                  title={`📅 Today`}
                  mdText={dataByDay?.md_text}
                />
                <div className="flex flex-col">
                  <CheckBoxList_Section
                    title="📌 Do not forget"
                    mdText={dataByUser?.do_not_forget__md_text}
                  />
                </div>
              </div>
              <Center_Section
                customQuote={dataByUser?.custom_quote__md_text}
                dailyQuote={appData?.daily_quote__md_text}
                goal={dataByUser?.goal}
                week__md_text={dataByWeek?.md_text}
              />
              <div className="w-1/4">
                <CalendarDaily_Section
                  text={dataByDay?.calendar_text}
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
