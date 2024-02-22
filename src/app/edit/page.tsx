"use client"

import { BgAnimatedGradient, FullLoading } from "@/components"
import {
  Header_Section,
  Left_Section,
  Right_Section
} from "@/components/forThisApp/edit"
import { useGetDateEveryMinute } from "@/hooks"

export default function Edit() {
  const { currentDate } = useGetDateEveryMinute()

  return (
    <BgAnimatedGradient>
      <div className="flex w-full flex-1 flex-col">
        <Header_Section currentDate={currentDate} />
        <div className="flex flex-1">
          <Left_Section />
          <Right_Section />
        </div>
      </div>
    </BgAnimatedGradient>
  )
}
