"use client";

import { useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

import { Database } from "@/db";
import { CalendarSection, FullLoading, MarkdownSection } from "@/components";
import { useAuthRedirect } from "@/hooks";

import LogoutButton from "./logout-button";

export default function Index() {
  const [user, setUser] = useState<User>();

  const supabase = createClientComponentClient<Database>();
  const { authLoading } = useAuthRedirect();

  // ─────────────────────────────────────────────────────────────────────

  const getUser = async () => {
    if (user || authLoading) return;

    const { data } = await supabase.auth.getUser();
    if (data.user) setUser(data.user);
  };

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    getUser();
  }, [authLoading, user]);

  // ─────────────────────────────────────────────────────────────────────

  if (authLoading || !user) return <FullLoading />;

  return (
    <div className="flex-1">
      <div className="flex h-screen w-screen bg-neutral-900">
        <div className="flex flex-1 flex-col">
          <MarkdownSection title="daily:" user={user} field="daily__md_text" />
          <div className="flex flex-1 flex-col">
            <MarkdownSection
              title="weekly:"
              user={user}
              field="week__md_text"
            />
            <MarkdownSection
              title="not forget:"
              user={user}
              field="not_forget__md_text"
            />
          </div>
        </div>
        <CalendarSection user={user} />
      </div>
      {/* ───────────────────────────────────────────────────── */}
      <div className="flex py-3 pr-10 bg-neutral-900 border-t border-neutral-800">
        <span className="ml-auto">
          <span className="flex gap-4">
            {user.email} <span className="border-r"></span> <LogoutButton />
          </span>
        </span>
      </div>
    </div>
  );
}
