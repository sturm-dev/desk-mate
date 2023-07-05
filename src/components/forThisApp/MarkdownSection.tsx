"use client";

import React from "react";

const checkboxChecked = "- [x]";
const checkboxUnchecked = "- [ ]";

export const MarkdownSection = ({
  mdText,
  title,
}: {
  mdText: string | null | undefined;
  title?: string;
}) => {
  const formatMdText = (str: string) => {
    const createObjectsFromText = () => {
      const allText: { text: string; checked: boolean }[] = [];
      const lines = str.split("\n");
      lines.forEach((line) => {
        if (!line) return;
        const checked = line.includes(checkboxChecked);
        const text = line
          .replaceAll(checkboxChecked, "")
          .replaceAll(checkboxUnchecked, "");
        allText.push({ text, checked });
      });
      return allText;
    };

    return createObjectsFromText().map(({ checked, text }, i) => (
      <div key={`${text}-${i}`} className="flex flex-row">
        <p className={`${checked ? "text-neutral-700" : ""} mr-1`}>
          {checked ? "☑" : "◻️"}
        </p>
        <p className={`${checked ? "line-through text-neutral-700" : ""}`}>
          {text}
        </p>
      </div>
    ));
  };

  return (
    <div className="flex flex-1 flex-col">
      {title ? (
        <div className="p-1 bg-black bg-opacity-40 justify-center flex text-sm">
          {title}
        </div>
      ) : null}
      <div className="p-2 pl-3 flex-col text-sm">
        {formatMdText(mdText || "")}
      </div>
    </div>
  );
};
