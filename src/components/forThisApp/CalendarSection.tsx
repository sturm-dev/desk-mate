export const CalendarSection = () => {
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
          <div className="flex items-center flex-1 border-l p-1 pl-2">a</div>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const isLastItem = (index: number, array: any[]) => index === array.length - 1;

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
