/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
// import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Database } from "@/db";
import { FullLoading } from "@/components";
import { useAuthRedirect } from "@/hooks";

import LogoutButton from "./logout-button";

export default function Index() {
  const [mdText, setMdText] = useState("");
  const [user, setUser] = useState<User>();

  const supabase = createClientComponentClient<Database>();
  const { authLoading } = useAuthRedirect();

  // ─────────────────────────────────────────────────────────────────────

  const getUser = async () => {
    if (user || authLoading) return;

    const { data } = await supabase.auth.getUser();

    if (data.user) setUser(data.user);
  };

  const getMdText = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("md_text")
      .select("*")
      .eq("email", user?.email)
      .single();

    if (data) setMdText(data.md_text);
  }, [user]);

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    getUser();
    getMdText();
  }, [authLoading, user]);

  // ─────────────────────────────────────────────────────────────────────

  if (authLoading || !user) return <FullLoading />;

  return (
    <div className="flex-1">
      <h1 className="text-2xl mb-2 flex justify-between">
        <span className="sr-only">Supabase and Next.js Starter Template</span>
      </h1>

      <div className="flex border-b py-3 text-sm text-neutral-100 pr-10">
        <span className="ml-auto">
          {user ? (
            <span className="flex gap-4">
              Hey, {user.email}! <span className="border-r"></span>{" "}
              <LogoutButton />
            </span>
          ) : (
            <Link href="/login" className="text-neutral-100 hover:underline">
              Login
            </Link>
          )}
        </span>
      </div>

      <div className="p-3">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdText}</ReactMarkdown>
      </div>
    </div>
  );
}
