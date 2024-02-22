import { C_ReactMarkdown, Card } from "@/components/generic"
import { SectionInterface } from "@/constants"

import { CheckBoxList_Section } from "../home"

export const Right_Section = ({
  currentSectionText,
  sectionSelected
}: {
  currentSectionText: string
  sectionSelected: SectionInterface
}) => {
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
        return <p>{currentSectionText}</p>
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
