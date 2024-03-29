"use client"

import React, { useEffect, useState } from "react"

const separatorMdText = "---"
const checkboxChecked = "- [x]"
const checkboxUnchecked = "- [ ]"

// NOTE: this component not handle all markdown text - only checkbox and separator

type CheckBoxList_GetTextProps = {
  getText: () => string
  title: string
  updateCheckboxState?: (newMdText: string) => void
  // ────────────
  mdText?: never
}

type CheckBoxList_MdTextProps = {
  mdText: string
  // ────────────
  getText?: never
  updateCheckboxState?: never
  title?: never
}

export const CheckBoxList_Section = ({
  mdText,
  getText,
  updateCheckboxState,
  title
}: CheckBoxList_GetTextProps | CheckBoxList_MdTextProps) => {
  const [currentText, setCurrentText] = useState("")

  useEffect(() => {
    const text = mdText ? mdText : (getText && getText()) || ""
    setCurrentText(text)
  }, [mdText])

  const onCheckboxClick = (text: string) => {
    if (!updateCheckboxState) return

    const newMdText = currentText
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

    updateCheckboxState(newMdText)
    setCurrentText(getText())
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
        {formatMdText(currentText || "")}
      </div>
    </div>
  )
}
