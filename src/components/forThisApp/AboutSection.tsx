"use client";

import { MutableRefObject } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FullScreenHandle } from "react-full-screen";

import { Image_EnterFullScreen, Image_ExitFullScreen } from "@/assets";
import { APP_VERSION } from "@/config";

export const AboutSection = ({
  fullScreenHandle,
  ref_div,
}: {
  fullScreenHandle: FullScreenHandle;
  ref_div?: MutableRefObject<HTMLDivElement | null>;
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
        <button className="p-2" onClick={onSwitchFullScreenMode}>
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
        <div>
          <span className="text-xs text-neutral-500">
            desk-mate v{APP_VERSION}
          </span>
        </div>
        <div className="flex-1" />
        <div className="text-xs pr-4 underline">
          <button onClick={signOut}>
            <p className="text-neutral-500">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};
