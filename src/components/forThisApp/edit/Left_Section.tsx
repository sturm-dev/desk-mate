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
import { localStorageSections } from "@/utils/forThisApp"

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
  console.log(`dayOfTheYear`, dayOfTheYear)

  const { dimensions: dimensions_fieldToEdit, div_ref: ref_fieldToEdit } =
    useGetDivDimensions()

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    console.log(`useEffect - dayOfTheYear`, dayOfTheYear)

    setCurrentSectionText(
      localStorageSections.getText(dayOfTheYear, sectionSelected)
    )
  }, [sectionSelected, dayOfTheYear])

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

  const getNote = (section: SectionInterface) => {
    switch (section) {
      case SectionsArray[0]:
      case SectionsArray[5]:
        return "(saved only for the date selected)"
      default:
        return "(saved for this section)"
    }
  }

  const getPlaceholder = (section: SectionInterface) => {
    switch (section) {
      case SectionsArray[0]:
      case SectionsArray[1]:
      case SectionsArray[2]:
        return "- [  ] buy some bread\n- [x] make the bed\n---\n- [  ] go to gym"
      case SectionsArray[3]:
        return "$10k / month"
      case SectionsArray[4]:
        return "# big text\n~strikeout~\n**bold**\n_italic_\n`code`\n(all markdown format works here)"
      case SectionsArray[5]:
        return "05:00 = wake up\n13:30 = lunch\n22:00 = sleep"
      default:
        return "Write here the note for this section"
    }
  }

  const saveEdits = () => {
    localStorageSections.setText(
      dayOfTheYear,
      sectionSelected,
      currentSectionText
    )
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
      <Card title={`Field to edit ${getNote(sectionSelected)}`}>
        <div className="flex h-full flex-1" ref={ref_fieldToEdit}>
          <textarea
            value={currentSectionText}
            onChange={(e) => setCurrentSectionText(e.target.value)}
            className="h-full w-full rounded-md bg-white bg-opacity-20 p-4"
            style={{ height: dimensions_fieldToEdit.height }}
            placeholder={getPlaceholder(sectionSelected)}
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
