"use client"

import {
  ArrowLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { useRouter } from "next/navigation"
import { MutableRefObject } from "react"

import { Touchable } from "@/components/generic"

dayjs.extend(customParseFormat)

export const Header_Section = ({
  ref_div,
  selectedDayOfTheYear,
  setSelectedDayOfTheYear
}: {
  ref_div?: MutableRefObject<HTMLDivElement | null>
  selectedDayOfTheYear: string
  setSelectedDayOfTheYear: (dayOfTheYear: string) => void
}) => {
  const router = useRouter()

  const dateEdit = (editType: "plus" | "minus", dateType: "day" | "week") => {
    let newDate = dayjs(selectedDayOfTheYear, "DD/MM/YYYY")
    if (editType === "plus") newDate = newDate.add(1, dateType)
    else newDate = newDate.subtract(1, dateType)

    setSelectedDayOfTheYear(newDate.format("DD/MM/YYYY"))
  }

  const onGoToHome = () => router.replace("/")

  const goBackComponent = ({ hide }: { hide?: boolean }) => (
    <div className={`${hide ? "opacity-0" : ""}`}>
      <Touchable className="p-2" onClick={onGoToHome}>
        <ArrowLeftIcon color="gray" className={IconStyleClassNames} />
      </Touchable>
    </div>
  )

  return (
    <div
      ref={ref_div}
      className="flex items-center justify-center border-b border-neutral-800">
      {goBackComponent({ hide: false })}
      <div className="flex flex-1 items-center justify-center px-1">
        <div className="flex flex-1 flex-row items-center justify-center">
          <Touchable onClick={() => dateEdit("minus", "week")}>
            <ChevronDoubleLeftIcon
              color="gray"
              className={IconStyleClassNames}
            />
          </Touchable>
          <Touchable onClick={() => dateEdit("minus", "day")}>
            <ChevronLeftIcon color="gray" className={IconStyleClassNames} />
          </Touchable>
          <p className="m-3 w-60 rounded-sm bg-cyan-600 p-1 px-3 text-center text-sm">
            {dayjs(selectedDayOfTheYear, "DD/MM/YYYY").format("dddd D of MMMM")}
          </p>
          <Touchable onClick={() => dateEdit("plus", "day")}>
            <ChevronRightIcon color="gray" className={IconStyleClassNames} />
          </Touchable>
          <Touchable onClick={() => dateEdit("plus", "week")}>
            <ChevronDoubleRightIcon
              color="gray"
              className={IconStyleClassNames}
            />
          </Touchable>
        </div>
      </div>
      {goBackComponent({ hide: true })}
    </div>
  )
}

const IconStyleClassNames = "ml-2 h-6 w-6 mr-2"
