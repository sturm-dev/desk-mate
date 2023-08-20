"use client";

import { MutableRefObject } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FullScreenHandle } from "react-full-screen";
import dayjs from "dayjs";
import packageJson from "~/package.json";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  ArrowLeftOnRectangleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { Image_EnterFullScreen, Image_ExitFullScreen } from "@/assets";
import { supabaseClient } from "@/db";
import { BoldText, OptionsDropdown } from "@/components";

export const Header_Section = ({
  user,
  fullScreenHandle,
  ref_div,
  currentDate,
}: {
  user: User;
  fullScreenHandle: FullScreenHandle;
  ref_div?: MutableRefObject<HTMLDivElement | null>;
  currentDate: Date;
}) => {
  const router = useRouter();

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/login");
  };

  const onGoToEdit = () => router.push("/edit");

  const onSwitchFullScreenMode = () => {
    if (fullScreenHandle.active) fullScreenHandle.exit();
    else fullScreenHandle.enter();
  };

  return (
    <div ref={ref_div} className="border-b border-neutral-800">
      <div className="flex items-center justify-center">
        <div className="pl-2 flex items-center justify-center">
          <BoldText className="text-2xl p-2">
            {dayjs(currentDate).format("HH:mm")}
          </BoldText>
          -
          <span className="text-sm p-2">
            {dayjs(currentDate).format("dddd D of MMMM")}
          </span>
        </div>
        <div className="flex-1" />
        <div className="pr-2">
          <span className="text-2xl">🐒</span>
        </div>
        <div className="pr-1">
          <span className="text-sm text-neutral-500">
            desk-mate{" - "}
            <BoldText>v{packageJson.version}</BoldText>
          </span>
        </div>
        <button className="p-2 pr-1" onClick={onSwitchFullScreenMode}>
          <Image
            alt={`${fullScreenHandle.active ? "exit" : "enter"} fullScreen`}
            src={
              fullScreenHandle.active
                ? Image_ExitFullScreen
                : Image_EnterFullScreen
            }
            width={20}
            height={20}
          />
        </button>
        <OptionsDropdown
          userEmail={user.email!}
          items={[
            {
              title: "Edit fields",
              onClick: onGoToEdit,
              icon: PencilSquareIcon,
              showOnlyOnDesktop: true,
            },
            {
              title: "Logout",
              onClick: signOut,
              icon: ArrowLeftOnRectangleIcon,
            },
          ]}
        />
      </div>
    </div>
  );
};
