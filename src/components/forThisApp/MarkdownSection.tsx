"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownSection = ({
  mdText,
  title,
}: {
  mdText: string | null | undefined;
  title?: string;
}) => {
  const parseMdText = () => {
    // complete checkboxes to green & text from complete tasks to strikeout text
    mdText = mdText?.replace(/- \[x\] (.*)/g, "\n✅ ~~$1~~");
    return mdText;
  };

  return (
    <div className="flex flex-1 border-r border-neutral-800 flex-col">
      {title ? (
        <div className="p-1 bg-black bg-opacity-40 justify-center flex">
          {title}
        </div>
      ) : null}
      <div className="p-2 pl-3 flex-col">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mb-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-bold" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-lg font-bold" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className="text-base font-bold" {...props} />
            ),
            hr: ({ node, ...props }) => (
              <div
                className="mb-2 mt-3 bg-neutral-700"
                style={{ height: "1px" }}
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="text-neutral-700 opacity-70" {...props} />
            ),
          }}
        >
          {parseMdText() || ""}
        </ReactMarkdown>
      </div>
    </div>
  );
};
