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
      <div className="flex border-b py-3 text-sm text-neutral-100 pr-10 bg-neutral-800">
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

      <div className="flex h-screen w-screen bg-neutral-900">
        <MarkdownSection user={user} />
        <CalendarSection user={user} />
      </div>
    </div>
  );
}
