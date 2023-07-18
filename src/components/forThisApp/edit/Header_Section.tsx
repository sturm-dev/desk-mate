"use client";

import { MutableRefObject } from "react";
import { useRouter } from "next/navigation";
import packageJson from "~/package.json";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";

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

  return (
    <div ref={ref_div} className="border-b border-neutral-800">
      <div className="flex items-center justify-center">
        <Touchable>
          <CalendarDaysIcon className={IconStyleClassNames} />
        </Touchable>
        <div className="flex-1 items-center justify-center flex flex-row">
          <Touchable>
            <ChevronDoubleLeftIcon className={IconStyleClassNames} />
          </Touchable>
          <Touchable>
            <ChevronLeftIcon className={IconStyleClassNames} />
          </Touchable>
          <Touchable>
            <p className="text-sm p-1 px-3 m-1 text-center bg-cyan-600 rounded-sm">
              {dayjs(currentDate).format("dddd D of MMMM")}
            </p>
          </Touchable>
          <Touchable>
            <ChevronRightIcon className={IconStyleClassNames} />
          </Touchable>
          <Touchable>
            <ChevronDoubleRightIcon className={IconStyleClassNames} />
          </Touchable>
        </div>
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

const IconStyleClassNames = "ml-2 h-6 w-6 mr-2";

// TODO: add onHover and touchable opacity effect
const Touchable = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => <div onClick={onClick}>{children}</div>;

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
