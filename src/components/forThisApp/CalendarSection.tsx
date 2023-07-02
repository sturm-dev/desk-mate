const padding = 8;

export const CalendarSection = ({
  text,
  height,
  currentDate,
}: {
  text: string | null | undefined;
  height: number;
  currentDate: Date;
}) => {
  const innerHeight = height - padding * 2;

  return (
    <div
      id="calendar_section_div"
      className="flex flex-1 flex-col relative"
      style={{ padding: `${padding}px` }}
    >
      {hours.map((hour, i) => (
        <div
          className={`${
            !isLastItem(i, hours) ? "border-b border-neutral-700" : ""
          } flex flex-row`}
          key={hour}
          style={{ height: innerHeight / hours.length }}
        >
          <div className="flex items-center justify-center h-full px-2 w-10">
            <p>{hour}</p>
          </div>
          <div className="flex items-center flex-1 border-l border-neutral-700 p-1 pl-2">
            {getTextFromHour({ hour, text: text || "" })}
          </div>
        </div>
      ))}
      <div className="absolute top-0 left-0 w-full h-full py-2">
        <div className="w-full h-full">
          <div
            className="absolute w-full items-center flex flex-row -ml-2"
            style={{ top: getHourLinePosition({ innerHeight, currentDate }) }}
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
  innerHeight,
  currentDate,
}: {
  innerHeight: number;
  currentDate: Date;
}) => {
  const hourBoxSize = innerHeight / hours.length;

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
