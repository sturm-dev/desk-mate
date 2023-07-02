"use client";

import { MutableRefObject } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FullScreenHandle } from "react-full-screen";
import dayjs from "dayjs";

import {
  Image_EnterFullScreen,
  Image_ExitFullScreen,
  Image_Gear,
} from "@/assets";
import { APP_VERSION } from "@/config";

export const AboutSection = ({
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
        <div className="p-2">
          <span className="text-xl p-2">
            {dayjs(currentDate).format("dddd MMMM D - h:mm a")}
          </span>
        </div>
        <div className="flex-1" />
        <div className="pr-2">
          <span className="text-2xl">🐒</span>
        </div>
        <div className="pr-1">
          <span className="text-xs text-neutral-500">
            desk-mate v{APP_VERSION}
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
        <div className="px-2">
          <Image alt="settings" src={Image_Gear} width={26} height={26} />
        </div>
      </div>
    </div>
  );
};

/* <div className="text-xs pr-4 underline">
    <button onClick={signOut}>
      <p className="text-neutral-500">Logout</p>
    </button>
  </div> */
