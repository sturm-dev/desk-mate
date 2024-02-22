import { C_ReactMarkdown, Card } from "@/components/generic"

export const Right_Section = ({
  currentSectionText
}: {
  currentSectionText: string
}) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex w-full flex-1 p-4">
        <Card title="Changes preview (markdown)">
          <C_ReactMarkdown text={currentSectionText} />
        </Card>
      </div>
    </div>
  )
}
