import { C_ReactMarkdown, CalendarMonthPreview } from "../generic";
import { CheckBoxList_Section } from "./CheckBoxList_Section";

export const CenterSection = ({
  goal,
  customQuote,
  dailyQuote,
  week__md_text,
}: {
  goal?: string | null | undefined;
  customQuote?: string | null | undefined;
  dailyQuote?: string | null | undefined;
  week__md_text?: string | null | undefined;
}) => {
  return (
    <div className="flex flex-1 border-r border-l border-neutral-800 flex-col">
      <div className="p-2 text-sm">🎯 Goal: {goal}</div>
      <Line />
      <div className="flex flex-1 flex-col p-8 pt-2 pb-6 items-center justify-center">
        <C_ReactMarkdown text={customQuote || dailyQuote || ""} />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-1">
          <CheckBoxList_Section title="🗓️ This week" mdText={week__md_text} />
        </div>
        <div className="flex flex-1">
          <CalendarMonthPreview />
        </div>
      </div>
    </div>
  );
};

const Line = () => <div className="border-b border-neutral-800" />;
