"use client";

import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/db";

export const MarkdownSection = ({
  user,
  field,
  title,
}: {
  user: User;
  field: keyof Database["public"]["Tables"]["all_data"]["Row"];
  title?: string;
}) => {
  const [mdText, setMdText] = useState("");

  const supabase = createClientComponentClient<Database>();

  const getMdText = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("all_data")
      .select("*")
      .eq("email", user?.email)
      .single();

    if (data) setMdText(data[field]);
  }, [user]);

  useEffect(() => {
    getMdText();
  }, [user]);

  return (
    <div className="flex flex-1 border-r border-neutral-700 flex-col">
      {title ? (
        <div className="text-xl mb-2 bg-neutral-800 pb-1 p-2 justify-center flex">
          {title}
        </div>
      ) : null}
      <div className="p-4 flex-col">
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
          {mdText}
        </ReactMarkdown>
      </div>
    </div>
  );
};
