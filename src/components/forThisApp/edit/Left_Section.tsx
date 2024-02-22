import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import { toast } from "sonner"

import { Card, Touchable } from "@/components/generic"
import {
  SectionInterface,
  SectionsArray,
  SectionsArrayReadableName
} from "@/constants"
import { useGetDivDimensions } from "@/hooks"
import { useLocalStorageSections } from "@/hooks/forThisApp"

import { HomeMiniLayout } from "../HomeMiniLayout"

export const Left_Section = ({
  dayOfTheYear,
  sectionSelected,
  setSectionSelected,
  currentSectionText,
  setCurrentSectionText
}: {
  dayOfTheYear: string
  sectionSelected: SectionInterface
  setSectionSelected: (section: SectionInterface) => void
  currentSectionText: string
  setCurrentSectionText: (value: string) => void
}) => {
  const {
    getCurrentSectionTextFromLocalStorage,
    setCurrentSectionTextToLocalStorage
  } = useLocalStorageSections({ dayOfTheYear })

  const { dimensions: dimensions_fieldToEdit, div_ref: ref_fieldToEdit } =
    useGetDivDimensions()

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    setCurrentSectionText(
      getCurrentSectionTextFromLocalStorage(sectionSelected)
    )
  }, [sectionSelected])

  // ─────────────────────────────────────────────────────────────────────

  const changeSectionSelected = (chevronPressed: "left" | "right") => {
    const sectionSelectedIndex = SectionsArray.findIndex(
      (section) => section === sectionSelected
    )

    if (chevronPressed === "left") {
      if (sectionSelectedIndex === 0) {
        setSectionSelected(SectionsArray[SectionsArray.length - 1])
      } else {
        setSectionSelected(SectionsArray[sectionSelectedIndex - 1])
      }
    } else {
      if (sectionSelectedIndex === SectionsArray.length - 1) {
        setSectionSelected(SectionsArray[0])
      } else {
        setSectionSelected(SectionsArray[sectionSelectedIndex + 1])
      }
    }
  }

  const getReadableName = (section: SectionInterface) => {
    const sectionIndex = SectionsArray.findIndex(
      (sectionFromArray) => sectionFromArray === section
    )

    return SectionsArrayReadableName[sectionIndex]
  }

  const saveEdits = () => {
    setCurrentSectionTextToLocalStorage(sectionSelected, currentSectionText)
    toast.success("Saved!")
  }

  return (
    <div className="flex flex-1 flex-col border-r border-neutral-800 p-4">
      <div className="mb-4 w-full">
        <Card title="Section selected">
          <div className="flex flex-1">
            <HomeMiniLayout
              sectionSelected={sectionSelected}
              setSectionSelected={setSectionSelected}
            />
            <div className="flex flex-1 items-center justify-center p-2">
              <Touchable onClick={() => changeSectionSelected("left")}>
                <ChevronLeftIcon color="gray" className={IconStyleClassNames} />
              </Touchable>
              <div className="flex w-40 justify-center">
                <span
                  className="text-center"
                  style={{ whiteSpace: "pre-line" }}>
                  {getReadableName(sectionSelected)}
                </span>
              </div>
              <Touchable onClick={() => changeSectionSelected("right")}>
                <ChevronRightIcon
                  color="gray"
                  className={IconStyleClassNames}
                />
              </Touchable>
            </div>
          </div>
        </Card>
      </div>
      <Card title="Field to edit">
        <div className="flex h-full flex-1" ref={ref_fieldToEdit}>
          <textarea
            value={currentSectionText}
            onChange={(e) => setCurrentSectionText(e.target.value)}
            className="h-full w-full rounded-md bg-white bg-opacity-20 p-4"
            style={{ height: dimensions_fieldToEdit.height }}
          />
        </div>
      </Card>
      <Touchable
        className="mt-4 flex w-full items-center justify-center rounded-md bg-green-800 p-2"
        onClick={saveEdits}>
        <p>Save</p>
      </Touchable>
    </div>
  )
}

const IconStyleClassNames = "mx-1 h-6 w-6"
