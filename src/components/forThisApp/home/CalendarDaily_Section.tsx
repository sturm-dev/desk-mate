import { Font_Lato400 } from "@/fonts";
import { useGetDivDimensions } from "@/hooks";

const padding = 8;
const hourWidth = 40;

export const CalendarDaily_Section = ({
  text,
  height,
  currentDate,
}: {
  text: string | null | undefined;
  height: number;
  currentDate: Date;
}) => {
  const { dimensions, div_ref } = useGetDivDimensions();

  const innerHeight = height - padding * 2;

  return (
    <div
      id="calendar_section_div"
      className="flex flex-1 flex-col relative"
      style={{ padding: `${padding}px` }}
    >
      {hours.map((hour, i) => {
        const hourText = getTextFromHour({
          hour: hour + ":00",
          text: text || "",
        });
        const text30min = getTextFromHour({
          hour: hour + ":30",
          text: text || "",
        });

        let sectionWidth = dimensions?.width - hourWidth;
        if (text30min) sectionWidth = sectionWidth / 2;

        return (
          <div
            ref={div_ref}
            className={`${
              !isLastItem(i, hours) ? "border-b border-neutral-700" : ""
            } flex flex-row`}
            key={hour}
            style={{
              height: innerHeight / hours.length,
              fontFamily: Font_Lato400.style.fontFamily,
            }}
          >
            <div
              className="flex items-center justify-center h-full px-2 text-sm"
              style={{ width: hourWidth }}
            >
              {hour}
            </div>
            <TextComponent text={hourText || ""} width={sectionWidth} />
            {text30min ? (
              <TextComponent text={text30min} is30min width={sectionWidth} />
            ) : null}
          </div>
        );
      })}
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

const TextComponent = ({
  text,
  width,
  is30min,
}: {
  text: string;
  width: number;
  is30min?: boolean;
}) => (
  <div
    className={`border-l flex items-center border-neutral-700 p-1 ${
      is30min ? "" : "pl-2"
    }`}
    style={{ width }}
  >
    <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
      {text}
    </p>
  </div>
);

const isLastItem = (index: number, array: any[]) => index === array.length - 1;

const getTextFromHour = ({ text, hour }: { text: string; hour: string }) => {
  const lines = text.split("\n");
  const line = lines.find((line) => line.startsWith(`${hour} =`));
  if (!line) return null;
  return line.split("=")[1].trim();
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
