"use client";

import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/db";

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
    <div className="flex flex-1 border-r p-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdText}</ReactMarkdown>
    </div>
  );
};
