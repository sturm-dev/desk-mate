"use client";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

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
          </div>
        </div>
      </BgAnimatedGradient>
    </FullScreen>
  );
}
