import { Touchable } from "../generic";

const width = 1024 * 0.2;
const height = 600 * 0.2;

export const SectionsArray = [
  "checkbox-list--today",
  "checkbox-list--do-not-forget",
  "checkbox-list--week",
  "goal",
  "billboard",
  "today-hours",
] as const;

export const SectionsArrayReadableName = [
  `Checkbox list\n Today`,
  `Checkbox list\n Do not forget`,
  `Checkbox list\n Week`,
  "Goal",
  "Billboard",
  "Today hours",
] as const;

export type SectionInterface = (typeof SectionsArray)[number];

export const HomeMiniLayout = ({
  sectionSelected,
  setSectionSelected,
}: {
  sectionSelected: SectionInterface;
  setSectionSelected: (section: SectionInterface) => void;
}) => {
  return (
    <div
      className="flex flex-col border border-neutral-500"
      style={{ width, height }}
    >
      <div
        className="border-b border-neutral-500"
        style={{ height: height * 0.1 }}
      />
      <div className="flex flex-1 w-full">
        <div
          className="flex flex-col border-r border-neutral-500"
          style={{ width: width * 0.25 }}
        >
          <Touchable
            onClick={() => setSectionSelected("checkbox-list--today")}
            className={`border-b border-neutral-500 ${
              sectionSelected === "checkbox-list--today" ? "bg-cyan-600" : ""
            }`}
            style={{ height: "60%" }}
          />
          <Touchable
            onClick={() => setSectionSelected("checkbox-list--do-not-forget")}
            className={`flex-1 ${
              sectionSelected === "checkbox-list--do-not-forget"
                ? "bg-cyan-600"
                : ""
            }`}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <Touchable
            onClick={() => setSectionSelected("goal")}
            className={`border-b border-neutral-500 ${
              sectionSelected === "goal" ? "bg-cyan-600" : ""
            }`}
            style={{ height: "10%" }}
          />
          <Touchable
            onClick={() => setSectionSelected("billboard")}
            className={`flex flex-1 border-b border-neutral-500 ${
              sectionSelected === "billboard" ? "bg-cyan-600" : ""
            }`}
          />
          <div className="flex" style={{ height: "30%" }}>
            <Touchable
              onClick={() => setSectionSelected("checkbox-list--week")}
              className={`border-r border-neutral-500 ${
                sectionSelected === "checkbox-list--week" ? "bg-cyan-600" : ""
              }`}
              style={{ width: "50%" }}
            />
          </div>
        </div>
        <Touchable
          onClick={() => setSectionSelected("today-hours")}
          className={`border-l border-neutral-500 ${
            sectionSelected === "today-hours" ? "bg-cyan-600" : ""
          }`}
          style={{ width: width * 0.25 }}
        />
      </div>
    </div>
  );
};
