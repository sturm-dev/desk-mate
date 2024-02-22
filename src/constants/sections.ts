export const SectionsArray = [
  "checkbox-list--today",
  "checkbox-list--do-not-forget",
  "checkbox-list--this-week",
  "goal",
  "billboard",
  "today-hours"
] as const

export const SectionsArrayReadableName = [
  `Checkbox list\n Today`,
  `Checkbox list\n Do not forget`,
  `Checkbox list\n This week`,
  "Goal",
  "Billboard",
  "Today hours"
] as const

export type SectionInterface = (typeof SectionsArray)[number]
