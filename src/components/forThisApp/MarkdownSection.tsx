"use client";

import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/db";

// TODO: check md not working good (when using # the text is not big)

export const MarkdownSection = ({ user }: { user: User }) => {
  const [mdText, setMdText] = useState("");

  const supabase = createClientComponentClient<Database>();

  const getMdText = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("all_data")
      .select("*")
      .eq("email", user?.email)
      .single();

    if (data) setMdText(data.md_text);
  }, [user]);

  useEffect(() => {
    getMdText();
  }, [user]);

  return (
    <div className="flex flex-1 border-r border-neutral-700 p-4 flex-col">
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
      <h2>asd</h2>
    </div>
  );
};
