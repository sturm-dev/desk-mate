import { useCallback, useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/db";

export const CalendarSection = ({ user }: { user: User }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarText, setCalendarText] = useState("");
  const [windowHeight, setWindowHeight] = useState(0);

  const supabase = createClientComponentClient<Database>();

  // ─────────────────────────────────────────────────────────────────────

  const getCalendarText = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("all_data")
      .select("*")
      .eq("email", user?.email)
      .single();

    if (data) setCalendarText(data.calendar_text || "");
  }, [user]);

  const subscribeToChanges = () =>
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "all_data" },
        getCalendarText
      )
      .subscribe();

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    subscribeToChanges();
    getCalendarText();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────
  const reportWindowSize = () => setWindowHeight(window.innerHeight);
  useEffect(() => {
    setWindowHeight(window.innerHeight); // first time

    window.addEventListener("resize", reportWindowSize);

    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, []);
  // ─────────────────────────────────────────────────────────────────────

  return (
    <div
      id="calendar_section_div"
      className="flex flex-1 p-2 flex-col relative"
    >
      {hours.map((hour, i) => (
        <div
          className={`${
            !isLastItem(i, hours) ? "border-b border-neutral-700" : ""
          } flex flex-row`}
          key={hour}
          style={{ height: windowHeight / hours.length }}
        >
          <div className="flex items-center justify-center h-full px-2 w-10">
            <p>{hour}</p>
          </div>
          <div className="flex items-center flex-1 border-l border-neutral-700 p-1 pl-2">
            {getTextFromHour({ hour, text: calendarText })}
          </div>
        </div>
      ))}
      <div className="absolute top-0 left-0 w-full h-full py-2">
        <div className="w-full h-full">
          <div
            className="absolute w-full items-center flex flex-row -ml-2"
            style={{ top: getHourLinePosition({ windowHeight, currentDate }) }}
          >
            <div className="bg-red-500 h-4 w-4 rounded-lg" />
            <div className="border-b border-red-500 w-full" />
          </div>
        </div>
      </div>
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

const getHourLinePosition = ({
  windowHeight,
  currentDate,
}: {
  windowHeight: number;
  currentDate: Date;
}) => {
  const divHeight = windowHeight - 16; // tailwind_p2 = 8px
  const hourBoxSize = divHeight / hours.length;

  const date_hour = currentDate.getHours();
  const date_minutes = currentDate.getMinutes();

  let position = date_hour - 5;
  position = position * hourBoxSize;
  position = position + date_minutes * (hourBoxSize / 60);

  return position;
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
