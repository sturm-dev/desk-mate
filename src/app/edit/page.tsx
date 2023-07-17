"use client";

import { FullLoading } from "@/components";
import { Header_Section } from "@/components/forThisApp/edit";
import { useUser } from "@/db";
import { useAuthRedirect, useGetDateEveryMinute } from "@/hooks";

export default function Edit() {
  const { authLoading } = useAuthRedirect();
  const { user } = useUser({ authLoading });

  const { currentDate } = useGetDateEveryMinute();

  if (authLoading || !user) return <FullLoading />;

  return (
    <div className="w-full">
      <Header_Section user={user} currentDate={currentDate} />
    </div>
  );
}
