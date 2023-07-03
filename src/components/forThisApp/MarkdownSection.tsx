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
            hr: ({ node, ...props }) => <hr className="mb-5 mt-6" {...props} />,
          }}
        >
          {mdText || ""}
        </ReactMarkdown>
      </div>
    </div>
  );
};
