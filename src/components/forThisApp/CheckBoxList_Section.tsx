"use client";

import React from "react";

const separatorMdText = "---";
const checkboxChecked = "- [x]";
const checkboxUnchecked = "- [ ]";

// NOTE: this component not handle all markdown text - only checkbox and separator

export const CheckBoxList_Section = ({
  mdText,
  title,
}: {
  mdText: string | null | undefined;
  title?: string;
}) => {
  const formatMdText = (str: string) => {
    const createObjectsFromText = () => {
      const allText: {
        text?: string;
        checked?: boolean;
        separator?: boolean;
      }[] = [];

      str.split("\n").forEach((line) => {
        if (!line) return;

        const separator = line.includes(separatorMdText);
        if (separator) {
          allText.push({ separator });
          return;
        }

        const checked = line.includes(checkboxChecked);
        const text = line
          .replaceAll(checkboxChecked, "")
          .replaceAll(checkboxUnchecked, "");
        allText.push({ text, checked });
      });
      return allText;
    };

    return createObjectsFromText().map(({ separator, checked, text }, i) => (
      <div key={i} className="flex flex-row">
        {separator ? (
          <div className="bg-neutral-700 w-full my-1.5" style={{ height: 1 }} />
        ) : (
          <>
            <p className={`${checked ? "text-neutral-700" : ""} mr-1`}>
              {checked ? "☑" : "◻️"}
            </p>
            <p className={`${checked ? "line-through text-neutral-700" : ""}`}>
              {text}
            </p>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-1 flex-col">
      {title ? (
        <div className="p-1 bg-black bg-opacity-40 justify-center flex text-sm border-b border-t border-neutral-800">
          {title}
        </div>
      ) : null}
      <div className="p-2 pl-3 flex-col text-sm">
        {formatMdText(mdText || "")}
      </div>
    </div>
  );
};
