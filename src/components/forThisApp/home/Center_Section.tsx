import { C_ReactMarkdown, CalendarMonthPreview } from "../../generic"

import { CheckBoxList_Section } from "./CheckBoxList_Section"

export const Center_Section = ({
  getGoalText,
  getBillboardText,
  getWeekText,
  updateCheckboxStateForThisWeek
}: {
  getGoalText: () => string
  getBillboardText: () => string
  getWeekText: () => string
  updateCheckboxStateForThisWeek: (newMdText: string) => void
}) => {
  return (
    <div className="flex flex-1 flex-col border-l border-r border-neutral-800">
      <div className="p-2 text-sm">🎯 Goal: {getGoalText()}</div>
      <Line />
      <div className="flex flex-1 flex-col items-center justify-center p-8 pb-6 pt-2">
        <C_ReactMarkdown text={getBillboardText()} />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-1">
          <CheckBoxList_Section
            updateCheckboxState={updateCheckboxStateForThisWeek}
            title="🗓️ This week"
            getText={() => getWeekText()}
          />
        </div>
        <div className="flex flex-1">
          <CalendarMonthPreview />
        </div>
      </div>
    </div>
  )
}

const Line = () => <div className="border-b border-neutral-800" />
