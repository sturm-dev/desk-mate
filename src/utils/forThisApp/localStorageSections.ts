import { SectionInterface, SectionsArray } from "@/constants"

import { customLocalStorage } from "../generic"

const makeKey = (sectionNumber: number, dayOfTheYear?: string) => {
  if (dayOfTheYear) {
    return `${dayOfTheYear}-${SectionsArray[sectionNumber]}`
  } else {
    return `${SectionsArray[sectionNumber]}`
  }
}

export const localStorageSections = {
  setText: (dayOfTheYear: string, section: SectionInterface, value: string) => {
    switch (section) {
      case SectionsArray[0]:
        customLocalStorage().setItem(makeKey(0, dayOfTheYear), value)
        break
      case SectionsArray[1]:
        customLocalStorage().setItem(makeKey(1), value)
        break
      case SectionsArray[2]:
        customLocalStorage().setItem(makeKey(2), value)
        break
      case SectionsArray[3]:
        customLocalStorage().setItem(makeKey(3), value)
        break
      case SectionsArray[4]:
        customLocalStorage().setItem(makeKey(4), value)
        break
      case SectionsArray[5]:
        customLocalStorage().setItem(makeKey(5, dayOfTheYear), value)
        break
    }
  },
  getText: (dayOfTheYear: string, section: SectionInterface) => {
    switch (section) {
      case SectionsArray[0]:
        return customLocalStorage().getItem(makeKey(0, dayOfTheYear)) || ""
      case SectionsArray[1]:
        return customLocalStorage().getItem(makeKey(1)) || ""
      case SectionsArray[2]:
        return customLocalStorage().getItem(makeKey(2)) || ""
      case SectionsArray[3]:
        return customLocalStorage().getItem(makeKey(3)) || ""
      case SectionsArray[4]:
        return customLocalStorage().getItem(makeKey(4)) || ""
      case SectionsArray[5]:
        return customLocalStorage().getItem(makeKey(5, dayOfTheYear)) || ""
    }
  }
}
