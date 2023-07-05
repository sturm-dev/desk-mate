"use client";

import React from "react";

export const MarkdownSection = ({
  mdText,
  title,
}: {
  mdText: string | null | undefined;
  title?: string;
}) => {
  const formatMdText = (str: string) => {
    return formatCheckboxes(str)
      .split("\n")
      .map((text, i) => (
        <React.Fragment key={`${text}-${i}`}>
          {text.includes("☑") ? (
            <p className="line-through text-neutral-700">{text}</p>
          ) : (
            <p>{text}</p>
          )}
        </React.Fragment>
      ));
  };

  const formatCheckboxes = (str: string) => {
    str = str?.replaceAll("- [x]", "☑");
    str = str?.replaceAll("- [ ]", "◻️");
    return str;
  };

  return (
    <div className="flex flex-1 border-r border-neutral-800 flex-col">
      {title ? (
        <div className="p-1 bg-black bg-opacity-40 justify-center flex">
          {title}
        </div>
      ) : null}
      <div className="p-2 pl-3 flex-col text-sm">
        {formatMdText(mdText || "")}
      </div>
    </div>
  );
};
