import { Font_Lato400 } from "@/fonts"
import { useGetDivDimensions } from "@/hooks"

const padding = 8
const hourWidth = 40

export const CalendarDaily_Section = ({
  text,
  height,
  currentDate
}: {
  text: string | null | undefined
  height: number
  currentDate: Date
}) => {
  return (
    <DailyHours text={text || ""} height={height}>
      <AbsoluteRedLine currentDate={currentDate} height={height} />
    </DailyHours>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

// used also in edit-preview
export const DailyHours = ({
  text,
  children,
  height
}: {
  text: string
  children?: React.ReactNode
  height: number
}) => {
  const { dimensions, div_ref } = useGetDivDimensions()

  const innerHeight = height - padding * 2

  return (
    <div
      id="calendar_section_div"
      className="relative flex flex-1 flex-col"
      style={{ padding: `${padding}px` }}>
      {hours.map((hour, i) => {
        const hourText = getTextFromHour({
          hour: hour + ":00",
          text: text || ""
        })
        const text30min = getTextFromHour({
          hour: hour + ":30",
          text: text || ""
        })

        let sectionWidth = dimensions?.width - hourWidth
        if (text30min) sectionWidth = sectionWidth / 2

        return (
          <div
            ref={div_ref}
            className={`${
              !isLastItem(i, hours) ? "border-b border-neutral-700" : ""
            } flex flex-row`}
            key={hour}
            style={{
              height: innerHeight / hours.length,
              fontFamily: Font_Lato400.style.fontFamily
            }}>
            <div
              className="flex h-full items-center justify-center px-2 text-sm"
              style={{ width: hourWidth }}>
              {hour}
            </div>
            <TextComponent text={hourText || ""} width={sectionWidth} />
            {text30min ? (
              <TextComponent text={text30min} is30min width={sectionWidth} />
            ) : null}
          </div>
        )
      })}
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const AbsoluteRedLine = ({
  currentDate,
  height
}: {
  currentDate: Date
  height: number
}) => {
  const innerHeight = height - padding * 2

  return (
    <div className="absolute left-0 top-0 h-full w-full py-2">
      <div className="h-full w-full">
        <div
          className="absolute -ml-2 flex w-full flex-row items-center"
          style={{ top: getHourLinePosition({ innerHeight, currentDate }) }}>
          <div className="h-4 w-4 rounded-lg bg-red-500" />
          <div className="w-full border-b border-red-500" />
        </div>
      </div>
    </div>
  )
}

const TextComponent = ({
  text,
  width,
  is30min
}: {
  text: string
  width: number
  is30min?: boolean
}) => (
  <div
    className={`flex items-center border-l border-neutral-700 p-1 ${
      is30min ? "" : "pl-2"
    }`}
    style={{ width }}>
    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
      {text}
    </p>
  </div>
)

const isLastItem = (index: number, array: any[]) => index === array.length - 1

const getTextFromHour = ({ text, hour }: { text: string; hour: string }) => {
  const lines = text.split("\n")
  const line = lines.find((line) => line.startsWith(`${hour} =`))
  if (!line) return null
  return line.split("=")[1].trim()
}

const getHourLinePosition = ({
  innerHeight,
  currentDate
}: {
  innerHeight: number
  currentDate: Date
}) => {
  const hourBoxSize = innerHeight / hours.length

  const date_hour = currentDate.getHours()
  const date_minutes = currentDate.getMinutes()

  let position = date_hour - 5
  position = position * hourBoxSize
  position = position + date_minutes * (hourBoxSize / 60)

  return position
}

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
  "23"
]
