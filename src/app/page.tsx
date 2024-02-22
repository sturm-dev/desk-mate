"use client";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { FullLoading, BgAnimatedGradient, YoutubeBgPlayer } from "@/components";
import { useGetDateEveryMinute, useGetDivDimensions } from "@/hooks";

import {
  CalendarDaily_Section,
  Center_Section,
  CheckBoxList_Section,
  Header_Section,
} from "@/components/forThisApp/home";

export default function Index() {
  const fullScreenHandle = useFullScreenHandle();
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
            />
            <div className="flex flex-1 flex-row">
              <div className="flex w-1/4 flex-col" style={{ marginTop: -1 }}>
                {/* ───────────────────────────────────────────────────── */}
                <CheckBoxList_Section title={`📅 Today`} mdText={``} />
                <div className="flex flex-col">
                  <CheckBoxList_Section title="📌 Do not forget" mdText={``} />
                </div>
              </div>
              <Center_Section
                customQuote={""}
                dailyQuote={""}
                goal={""}
                week__md_text={""}
              />
              <div className="w-1/4">
                <CalendarDaily_Section
                  text={""}
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
