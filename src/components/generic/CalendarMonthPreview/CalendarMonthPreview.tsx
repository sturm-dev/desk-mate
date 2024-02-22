import dayjs from "dayjs"
import { useState } from "react"
import Calendar from "react-calendar"

import "./CalendarMonthPreview.css"

export const CalendarMonthPreview = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <div className="flex flex-1 border-l border-t border-neutral-800">
      <Calendar
        onChange={(date) => setCurrentDate(date as Date)}
        value={currentDate}
        showNavigation={false}
        showNeighboringMonth={false}
        tileDisabled={() => true}
        formatShortWeekday={(_, date) =>
          dayjs(date).format("dd").substring(0, 1)
        }
      />
    </div>
  )
}
