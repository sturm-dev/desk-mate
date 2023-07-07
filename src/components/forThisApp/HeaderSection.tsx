"use client";

import { MutableRefObject } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FullScreenHandle } from "react-full-screen";
import dayjs from "dayjs";
import packageJson from "~/package.json";

import {
  Image_EnterFullScreen,
  Image_ExitFullScreen,
  Image_Gear,
} from "@/assets";
import { Font_Lato400 } from "@/fonts";
import { OptionsDropdown } from "./OptionsDropdown";

export const HeaderSection = ({
  fullScreenHandle,
  ref_div,
  currentDate,
}: {
  fullScreenHandle: FullScreenHandle;
  ref_div?: MutableRefObject<HTMLDivElement | null>;
  currentDate: Date;
}) => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const onSwitchFullScreenMode = () => {
    if (fullScreenHandle.active) fullScreenHandle.exit();
    else fullScreenHandle.enter();
  };

  return (
    <div ref={ref_div} className="border-b border-neutral-800">
      <div className="flex items-center justify-center">
        <div className="pl-2 flex items-center justify-center">
          <span
            className="text-2xl p-2"
            style={{ fontFamily: Font_Lato400.style.fontFamily }}
          >
            {dayjs(currentDate).format("HH:mm")}
          </span>
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
            desk-mate v{packageJson.version}
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
        <OptionsDropdown onLogout={signOut}>
          <div className="px-2">
            <Image alt="settings" src={Image_Gear} width={26} height={26} />
          </div>
        </OptionsDropdown>
      </div>
    </div>
  );
};
