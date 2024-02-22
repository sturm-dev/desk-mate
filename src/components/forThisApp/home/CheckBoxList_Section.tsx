"use client"

import React from "react"

const separatorMdText = "---"
const checkboxChecked = "- [x]"
const checkboxUnchecked = "- [ ]"

// NOTE: this component not handle all markdown text - only checkbox and separator

export const CheckBoxList_Section = ({
  mdText,
  title,
  updateCheckboxState
}: {
  mdText: string | null | undefined
  title?: string
  updateCheckboxState?: (newMdText: string) => void
}) => {
  const onCheckboxClick = (text: string) => {
    if (!text || !updateCheckboxState) return

    const newMdText = mdText
      ?.split("\n")
      .map((line) => {
        if (line.includes(text)) {
          return line.includes(checkboxChecked)
            ? line.replaceAll(checkboxChecked, checkboxUnchecked)
            : line.replaceAll(checkboxUnchecked, checkboxChecked)
        }
        return line
      })
      .join("\n")

    updateCheckboxState(newMdText || "")
  }

  const formatMdText = (str: string) => {
    const createObjectsFromText = () => {
      const allText: {
        text?: string
        haveCheckbox?: boolean
        checked?: boolean
        separator?: boolean
      }[] = []

      str.split("\n").forEach((line) => {
        if (!line) return

        const separator = line.includes(separatorMdText)
        if (separator) {
          allText.push({ separator })
          return
        }

        const checked = line.includes(checkboxChecked)
        const haveCheckbox =
          line.includes(checkboxChecked) || line.includes(checkboxUnchecked)

        const text = line
          .replaceAll(checkboxChecked, "")
          .replaceAll(checkboxUnchecked, "")
        allText.push({ text, checked, haveCheckbox })
      })
      return allText
    }

    return createObjectsFromText().map(
      ({ separator, checked, haveCheckbox, text }, i) => (
        <div key={i} className="flex flex-row">
          {separator ? (
            <div
              className="my-1.5 w-full bg-neutral-700"
              style={{ height: 1 }}
            />
          ) : haveCheckbox ? (
            <>
              <p
                className={`${checked ? "text-neutral-700" : ""} mr-1 ${updateCheckboxState ? "cursor-pointer" : ""}`}
                onClick={() => onCheckboxClick(text || "")}>
                {checked ? "☑" : "◻️"}
              </p>
              <p
                className={`${checked ? "text-neutral-700 line-through" : ""}`}>
                {text}
              </p>
            </>
          ) : null}
        </div>
      )
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      {title ? (
        <div className="flex justify-center border-b border-t border-neutral-800 bg-black bg-opacity-40 p-1 text-sm">
          {title}
        </div>
      ) : null}
      <div className="flex-col p-2 pl-3 text-sm">
        {formatMdText(mdText || "")}
      </div>
    </div>
  )
}
