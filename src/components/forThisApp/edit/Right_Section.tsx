import { C_ReactMarkdown, Card } from "@/components/generic"
import { SectionInterface } from "@/constants"
import { useGetDivDimensions } from "@/hooks"

import { CheckBoxList_Section, DailyHours } from "../home"

export const Right_Section = ({
  currentSectionText,
  sectionSelected
}: {
  currentSectionText: string
  sectionSelected: SectionInterface
}) => {
  const { dimensions, div_ref } = useGetDivDimensions()

  const parseTextDependsOnSection = () => {
    switch (sectionSelected) {
      case "checkbox-list--today":
      case "checkbox-list--do-not-forget":
      case "checkbox-list--this-week":
        return <CheckBoxList_Section mdText={currentSectionText} />
      case "goal":
        return <p>{currentSectionText}</p>
      case "billboard":
        return <C_ReactMarkdown text={currentSectionText} />
      case "today-hours":
        return (
          <div ref={div_ref} className="flex h-full flex-1">
            <div className="flex flex-1" style={{ height: dimensions.height }}>
              <DailyHours
                text={currentSectionText}
                height={dimensions.height}
              />
            </div>
          </div>
        )
    }
  }

  const changePreviewsText = () => {
    switch (sectionSelected) {
      case "checkbox-list--today":
      case "checkbox-list--do-not-forget":
      case "checkbox-list--this-week":
        return "checkbox format"
      case "goal":
        return "just text"
      case "billboard":
        return "markdown format"
      case "today-hours":
        return "hours format"
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full flex-1 p-4">
        <Card title={`Changes preview (${changePreviewsText()})`}>
          {parseTextDependsOnSection()}
        </Card>
      </div>
    </div>
  )
}
