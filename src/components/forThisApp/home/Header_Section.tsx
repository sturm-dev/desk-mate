"use client"

import {
  ArrowLeftOnRectangleIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline"
import packageJson from "~/package.json"
import dayjs from "dayjs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MutableRefObject } from "react"
import { FullScreenHandle } from "react-full-screen"

import { Image_EnterFullScreen, Image_ExitFullScreen } from "@/assets"
import { BoldText, OptionsDropdown } from "@/components"

export const Header_Section = ({
  fullScreenHandle,
  ref_div,
  currentDate
}: {
  fullScreenHandle: FullScreenHandle
  ref_div?: MutableRefObject<HTMLDivElement | null>
  currentDate: Date
}) => {
  const router = useRouter()

  const onGoToEdit = () => router.push("/edit")

  const onSwitchFullScreenMode = () => {
    if (fullScreenHandle.active) fullScreenHandle.exit()
    else fullScreenHandle.enter()
  }

  return (
    <div ref={ref_div} className="border-b border-neutral-800">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center pl-2">
          <BoldText className="p-2 text-2xl">
            {dayjs(currentDate).format("HH:mm")}
          </BoldText>
          -
          <span className="p-2 text-sm">
            {dayjs(currentDate).format("dddd D of MMMM")}
          </span>
        </div>
        <div className="flex-1" />
        <div className="pr-2">
          <span className="text-2xl">🐒</span>
        </div>
        <div className="pr-1">
          <span className="text-sm text-neutral-500">
            desk-mate{" - "}
            <BoldText>v{packageJson.version}</BoldText>
          </span>
        </div>
        <button className="p-2 pr-1" onClick={onSwitchFullScreenMode}>
          <Image
            alt={`${fullScreenHandle.active ? "exit" : "enter"} fullScreen`}
            src={
              fullScreenHandle.active
                ? Image_ExitFullScreen
                : Image_EnterFullScreen
            }
            width={20}
            height={20}
          />
        </button>
        <OptionsDropdown
          items={[
            {
              title: "Edit fields",
              onClick: onGoToEdit,
              icon: PencilSquareIcon
            }
          ]}
        />
      </div>
    </div>
  )
}
