"use client";

import { FullScreen, useFullScreenHandle } from "react-full-screen";

import {
  AboutSection,
  CalendarSection,
  FullLoading,
  MarkdownSection,
} from "@/components";
import { useAuthRedirect, useUserData } from "@/hooks";

export default function Index() {
  const fullScreenHandle = useFullScreenHandle();
  const { authLoading } = useAuthRedirect();
  const { user, userData } = useUserData({ authLoading });

  if (authLoading || !user) return <FullLoading />;

  return (
    <FullScreen handle={fullScreenHandle}>
      <div className="flex-1">
        {/* ───────────────────────────────────────────────────── */}
        <div className="flex h-screen w-screen bg-neutral-900">
          <div className="flex flex-1 flex-col">
            <AboutSection fullScreenHandle={fullScreenHandle} />
            {/* ───────────────────────────────────────────────────── */}
            <MarkdownSection title="Daily:" mdText={userData?.daily__md_text} />
            <div className="flex flex-1 flex-col">
              <MarkdownSection
                title="Weekly:"
                mdText={userData?.week__md_text}
              />
              <MarkdownSection
                title="Not forget:"
                mdText={userData?.not_forget__md_text}
              />
            </div>
          </div>
          <CalendarSection text={userData?.calendar_text} />
        </div>
      </div>
    </FullScreen>
  );
}
