"use client"

import { FullScreen, useFullScreenHandle } from "react-full-screen"

import {
  BgAnimatedGradient
  // , YoutubeBgPlayer
} from "@/components"
import {
  CalendarDaily_Section,
  Center_Section,
  CheckBoxList_Section,
  Header_Section
} from "@/components/forThisApp/home"
import { useGetDateEveryMinute, useGetDivDimensions } from "@/hooks"
import { useLocalStorageSections } from "@/hooks/forThisApp"

export default function Index() {
  const fullScreenHandle = useFullScreenHandle()
  // ─────────────────────────────────────────────────────────────────────

  const { currentDate, dayOfTheYear } = useGetDateEveryMinute()
  const {
    getCurrentSectionTextFromLocalStorage,
    setCurrentSectionTextToLocalStorage
  } = useLocalStorageSections({
    dayOfTheYear
  })

  // ─────────────────────────────────────────────────────────────────────
  const { dimensions: dimensions_divFather, div_ref: ref_divFather } =
    useGetDivDimensions()
  const { dimensions: dimensions_divHeader, div_ref: ref_divHeader } =
    useGetDivDimensions()

  const body_height =
    dimensions_divFather?.height - dimensions_divHeader?.height
  // ─────────────────────────────────────────────────────────────────────

  return (
    <FullScreen handle={fullScreenHandle}>
      <BgAnimatedGradient>
        <div className="flex-1">
          {/* ───────────────────────────────────────────────────── */}
          <div ref={ref_divFather} className="flex h-screen w-screen flex-col">
            <Header_Section
              ref_div={ref_divHeader}
              fullScreenHandle={fullScreenHandle}
              currentDate={currentDate}
            />
            <div className="flex flex-1 flex-row">
              <div className="flex w-1/4 flex-col" style={{ marginTop: -1 }}>
                {/* ───────────────────────────────────────────────────── */}
                <CheckBoxList_Section
                  title={`📅 Today`}
                  mdText={getCurrentSectionTextFromLocalStorage(
                    "checkbox-list--today"
                  )}
                  updateCheckboxState={(newMdText: string) =>
                    setCurrentSectionTextToLocalStorage(
                      "checkbox-list--today",
                      newMdText
                    )
                  }
                />
                <div className="flex flex-col">
                  <CheckBoxList_Section
                    title="📌 Do not forget"
                    mdText={getCurrentSectionTextFromLocalStorage(
                      "checkbox-list--do-not-forget"
                    )}
                    updateCheckboxState={(newMdText: string) =>
                      setCurrentSectionTextToLocalStorage(
                        "checkbox-list--do-not-forget",
                        newMdText
                      )
                    }
                  />
                </div>
              </div>
              <Center_Section
                customQuote={getCurrentSectionTextFromLocalStorage("billboard")}
                goal={getCurrentSectionTextFromLocalStorage("goal")}
                week__md_text={getCurrentSectionTextFromLocalStorage(
                  "checkbox-list--this-week"
                )}
                updateCheckboxStateForThisWeek={(newMdText: string) =>
                  setCurrentSectionTextToLocalStorage(
                    "checkbox-list--this-week",
                    newMdText
                  )
                }
              />
              <div className="w-1/4">
                <CalendarDaily_Section
                  text={getCurrentSectionTextFromLocalStorage("today-hours")}
                  height={body_height}
                  currentDate={currentDate}
                />
              </div>
            </div>
            {/* youtube video running on background to screen not to sleep */}
            {/* <YoutubeBgPlayer /> */}
          </div>
        </div>
      </BgAnimatedGradient>
    </FullScreen>
  )
}
