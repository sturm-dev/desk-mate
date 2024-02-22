import { useLocalStorage } from "usehooks-ts"

import { SectionInterface, SectionsArray } from "@/constants"

export const useLocalStorageSections = ({
  dayOfTheYear
}: {
  dayOfTheYear: string
}) => {
  const [checkBoxListTodayText, setCheckBoxListTodayText] = useLocalStorage(
    `${dayOfTheYear}-${SectionsArray[0]}`,
    ""
  )
  const [checkBoxListDoNotForgetText, setCheckBoxListDoNotForgetText] =
    useLocalStorage(SectionsArray[1], "")
  const [checkBoxListThisWeekText, setCheckBoxListThisWeekText] =
    useLocalStorage(SectionsArray[2], "")
  const [goalText, setGoalText] = useLocalStorage(SectionsArray[3], "")
  const [billboardText, setBillboardText] = useLocalStorage(
    SectionsArray[4],
    ""
  )
  const [todayHoursText, setTodayHoursText] = useLocalStorage(
    `${dayOfTheYear}-${SectionsArray[5]}`,
    ""
  )

  return {
    setCurrentSectionTextToLocalStorage: (
      section: SectionInterface,
      value: string
    ) => {
      switch (section) {
        case SectionsArray[0]:
          setCheckBoxListTodayText(value)
          break
        case SectionsArray[1]:
          setCheckBoxListDoNotForgetText(value)
          break
        case SectionsArray[2]:
          setCheckBoxListThisWeekText(value)
          break
        case SectionsArray[3]:
          setGoalText(value)
          break
        case SectionsArray[4]:
          setBillboardText(value)
          break
        case SectionsArray[5]:
          setTodayHoursText(value)
          break
      }
    },
    getCurrentSectionTextFromLocalStorage: (section: SectionInterface) => {
      switch (section) {
        case SectionsArray[0]:
          return checkBoxListTodayText
        case SectionsArray[1]:
          return checkBoxListDoNotForgetText
        case SectionsArray[2]:
          return checkBoxListThisWeekText
        case SectionsArray[3]:
          return goalText
        case SectionsArray[4]:
          return billboardText
        case SectionsArray[5]:
          return todayHoursText
      }
    }
  }
}
