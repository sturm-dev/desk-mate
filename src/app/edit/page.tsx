"use client";

import { BgAnimatedGradient, FullLoading } from "@/components";
import {
  Header_Section,
  Left_Section,
  Right_Section,
} from "@/components/forThisApp/edit";
import { useUser } from "@/db";
import { useAuthRedirect, useGetDateEveryMinute } from "@/hooks";

export default function Edit() {
  const { authLoading } = useAuthRedirect();
  const { user } = useUser({ authLoading });

  const { currentDate } = useGetDateEveryMinute();

  if (authLoading || !user) return <FullLoading />;

  return (
    <BgAnimatedGradient>
      <div className="w-full flex flex-1 flex-col">
        <Header_Section user={user} currentDate={currentDate} />
        <div className="flex flex-1">
          <Left_Section />
          <Right_Section />
        </div>
      </div>
    </BgAnimatedGradient>
  );
}
