import { C_ReactMarkdown, CalendarMonthPreview } from "../../generic"

import { CheckBoxList_Section } from "./CheckBoxList_Section"

export const Center_Section = ({
  goal,
  customQuote,
  week__md_text
}: {
  goal: string
  customQuote: string
  week__md_text: string
}) => {
  return (
    <div className="flex flex-1 flex-col border-l border-r border-neutral-800">
      <div className="p-2 text-sm">🎯 Goal: {goal}</div>
      <Line />
      <div className="flex flex-1 flex-col items-center justify-center p-8 pb-6 pt-2">
        <C_ReactMarkdown text={customQuote} />
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
  )
}

const Line = () => <div className="border-b border-neutral-800" />
