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
  useDataBy,
  useUser,
} from "@/hooks";
import {
  DataByDay_Interface,
  DataByUser_Interface,
  DataByWeek_Interface,
} from "@/db";

export default function Index() {
  const fullScreenHandle = useFullScreenHandle();
  const { authLoading } = useAuthRedirect();
  const { user } = useUser({ authLoading });
  // ─────────────────────────────────────────────────────────────────────
  const { data: dataByDay } = useDataBy<DataByDay_Interface>({
    user,
    dataBy: "data_by_day",
  });
  const { data: dataByUser } = useDataBy<DataByUser_Interface>({
    user,
    dataBy: "data_by_user",
  });
  const { data: dataByWeek } = useDataBy<DataByWeek_Interface>({
    user,
    dataBy: "data_by_week",
  });
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
                  mdText={dataByDay?.md_text}
                />
                <div className="flex flex-col">
                  <MarkdownSection
                    title="📌 Do not forget"
                    mdText={dataByUser?.do_not_forget__md_text}
                  />
                </div>
              </div>
              <CenterSection
                customQuote={dataByUser?.custom_quote__md_text}
                dailyQuote="" // TODO: get from app_data.daily_quote__md_text
                goal={dataByUser?.goal}
                week__md_text={dataByWeek?.md_text}
              />
              <div className="w-1/4">
                <CalendarDailySection
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
