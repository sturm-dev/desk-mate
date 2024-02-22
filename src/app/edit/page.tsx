"use client"

import dayjs from "dayjs"
import { useState } from "react"

import { BgAnimatedGradient } from "@/components"
import {
  Header_Section,
  Left_Section,
  Right_Section
} from "@/components/forThisApp/edit"
import { SectionInterface, SectionsArray } from "@/constants"

export default function Edit() {
  const [selectedDayOfTheYear, setSelectedDayOfTheYear] = useState<string>(
    dayjs().format("DD/MM/YYYY")
  )
  const [sectionSelected, setSectionSelected] = useState<SectionInterface>(
    SectionsArray[0]
  )
  const [currentSectionText, setCurrentSectionText] = useState("")

  return (
    <BgAnimatedGradient>
      <div className="flex w-full flex-1 flex-col">
        <Header_Section
          selectedDayOfTheYear={selectedDayOfTheYear}
          setSelectedDayOfTheYear={setSelectedDayOfTheYear}
        />
        <div className="flex flex-1">
          <Left_Section
            dayOfTheYear={selectedDayOfTheYear}
            sectionSelected={sectionSelected}
            setSectionSelected={setSectionSelected}
            currentSectionText={currentSectionText}
            setCurrentSectionText={setCurrentSectionText}
          />
          <Right_Section
            currentSectionText={currentSectionText}
            sectionSelected={sectionSelected}
          />
        </div>
      </div>
    </BgAnimatedGradient>
  )
}
