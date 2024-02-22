"use client"

import { useState } from "react"

import { BgAnimatedGradient } from "@/components"
import {
  Header_Section,
  Left_Section,
  Right_Section
} from "@/components/forThisApp/edit"
import { SectionInterface, SectionsArray } from "@/constants"
import { useGetDateEveryMinute } from "@/hooks"

export default function Edit() {
  const { currentDate, dayOfTheYear } = useGetDateEveryMinute()

  const [sectionSelected, setSectionSelected] = useState<SectionInterface>(
    SectionsArray[0]
  )
  const [currentSectionText, setCurrentSectionText] = useState("")

  return (
    <BgAnimatedGradient>
      <div className="flex w-full flex-1 flex-col">
        <Header_Section currentDate={currentDate} />
        <div className="flex flex-1">
          <Left_Section
            dayOfTheYear={dayOfTheYear}
            sectionSelected={sectionSelected}
            setSectionSelected={setSectionSelected}
            currentSectionText={currentSectionText}
            setCurrentSectionText={setCurrentSectionText}
          />
          <Right_Section currentSectionText={currentSectionText} />
        </div>
      </div>
    </BgAnimatedGradient>
  )
}
