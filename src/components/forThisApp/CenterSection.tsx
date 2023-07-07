import { UserDataInterface } from "@/hooks";
import { Font_Mulish200 } from "@/fonts";

import { CalendarMonthPreview } from "../generic";
import { MarkdownSection } from "./MarkdownSection";

export const CenterSection = ({
  userData,
}: {
  userData?: UserDataInterface;
}) => {
  return (
    <div className="flex flex-1 border-r border-l border-neutral-800 flex-col">
      <div className="p-2 text-sm">🎯 Goal: $10k usd / month</div>
      <Line />
      <div className="flex flex-1 p-8 pt-2 pb-6 items-center justify-center">
        <p
          className="text-3xl text-center leading-10"
          style={{ fontFamily: Font_Mulish200.style.fontFamily }}
        >
          <span className="text-7xl">R</span>
          emember what are you doing, where you are now and how close you are to
          achieve your goal - keep going
        </p>
      </div>
      <div className="flex flex-row">
        <MarkdownSection
          title="🗓️ This week"
          mdText={userData?.week__md_text}
        />
        <CalendarMonthPreview />
      </div>
    </div>
  );
};

const Line = () => <div className="border-b border-neutral-800" />;
