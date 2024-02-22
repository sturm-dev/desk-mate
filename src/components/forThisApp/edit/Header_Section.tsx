"use client"

import {
  ArrowLeftIcon
  // ChevronDoubleLeftIcon,
  // ChevronDoubleRightIcon,
  // ChevronLeftIcon,
  // ChevronRightIcon
} from "@heroicons/react/24/outline"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { MutableRefObject, useState } from "react"

import { Touchable } from "@/components/generic"

export const Header_Section = ({
  ref_div,
  currentDate
}: {
  ref_div?: MutableRefObject<HTMLDivElement | null>
  currentDate: Date
}) => {
  const router = useRouter()

  const [selectedDate, setSelectedDate] = useState(currentDate)

  const dateEdit = (editType: "plus" | "minus", dateType: "day" | "week") => {
    let newDate = dayjs(selectedDate)
    if (editType === "plus") newDate = newDate.add(1, dateType)
    else newDate = newDate.subtract(1, dateType)

    setSelectedDate(newDate.toDate())

    // TODO: after 3 seconds of no change date -> ask to db to data about that day
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
          {/* <Touchable onClick={() => dateEdit("minus", "week")}>
            <ChevronDoubleLeftIcon
              color="gray"
              className={IconStyleClassNames}
            />
          </Touchable>
          <Touchable onClick={() => dateEdit("minus", "day")}>
            <ChevronLeftIcon color="gray" className={IconStyleClassNames} />
          </Touchable> */}
          {/* <Touchable> */}
          <p className="m-3 w-60 rounded-sm bg-cyan-600 p-1 px-3 text-center text-sm">
            {dayjs(selectedDate).format("dddd D of MMMM")}
          </p>
          {/* </Touchable> */}
          {/* <Touchable onClick={() => dateEdit("plus", "day")}>
            <ChevronRightIcon color="gray" className={IconStyleClassNames} />
          </Touchable>
          <Touchable onClick={() => dateEdit("plus", "week")}>
            <ChevronDoubleRightIcon
              color="gray"
              className={IconStyleClassNames}
            />
          </Touchable> */}
        </div>
      </div>
      {goBackComponent({ hide: true })}
    </div>
  )
}

const IconStyleClassNames = "ml-2 h-6 w-6 mr-2"
