import { useCallback, useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/db";

export const CalendarSection = ({ user }: { user: User }) => {
  const [calendarText, setCalendarText] = useState("");

  const supabase = createClientComponentClient<Database>();

  const getCalendarText = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("all_data")
      .select("*")
      .eq("email", user?.email)
      .single();

    if (data) setCalendarText(data.calendar_text);
  }, [user]);

  useEffect(() => {
    getCalendarText();
  }, [user]);

  return (
    <div id="calendar_section_div" className="flex flex-1 p-2 flex-col">
      {hours.map((hour, i) => (
        <div
          className={`${!isLastItem(i, hours) ? "border-b" : ""} flex flex-row`}
          key={hour}
          style={{ height: 1024 / hours.length }}
        >
          <div className="flex items-center justify-center h-full px-2 w-10">
            <p>{hour}</p>
          </div>
          <div className="flex items-center flex-1 border-l p-1 pl-2">
            {getTextFromHour({ hour, text: calendarText })}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const isLastItem = (index: number, array: any[]) => index === array.length - 1;

const getTextFromHour = ({ text, hour }: { text: string; hour: string }) => {
  const lines = text.split("\n");
  const line = lines.find((line) => line.startsWith(`${hour}:`));
  if (!line) return null;
  return line.split(":")[1].trim();
};

const hours = [
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];
