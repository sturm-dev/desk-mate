"use client";

import { MutableRefObject } from "react";
import { useRouter } from "next/navigation";
import packageJson from "~/package.json";
import { User } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

import { supabaseClient } from "@/db";
import { BoldText, OptionsDropdown } from "@/components/generic";

export const Header_Section = ({
  user,
  ref_div,
  currentDate,
}: {
  user: User;
  ref_div?: MutableRefObject<HTMLDivElement | null>;
  currentDate: Date;
}) => {
  const router = useRouter();

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/login");
  };

  console.log(`currentDate`, currentDate);

  return (
    <div ref={ref_div} className="border-b border-neutral-800">
      <div className="flex items-center justify-center">
        <div className="flex-1" />
        <OptionsDropdown
          userEmail={user.email!}
          items={[
            {
              title: "Logout",
              onClick: signOut,
              icon: ArrowLeftOnRectangleIcon,
            },
          ]}
          footerComponent={<AppVersion />}
        />
      </div>
    </div>
  );
};

const AppVersion = () => (
  <div className="flex flex-row p-2 py-4 items-center justify-center">
    <div className="pr-2">
      <span>🐒</span>
    </div>
    <div className="pr-1">
      <p className="text-sm text-neutral-500">
        desk-mate{" - "}
        <BoldText>v{packageJson.version}</BoldText>
      </p>
    </div>
  </div>
);
