import dayjs from "dayjs";
import { useState } from "react";
import Calendar from "react-calendar";

import "./CalendarPreview.css";

export const CalendarPreview = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="border-l border-neutral-800 pb-2">
      <Calendar
        onChange={(date) => setCurrentDate(date as Date)}
        value={currentDate}
        showNavigation={false}
        showNeighboringMonth={false}
        tileDisabled={() => true}
        formatShortWeekday={(_, date) =>
          dayjs(date).format("dd").substring(0, 1)
        }
        calendarType="Hebrew"
      />
    </div>
  );
};
