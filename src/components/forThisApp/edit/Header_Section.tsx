"use client";

import { MutableRefObject, useState } from "react";
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
import { BoldText, OptionsDropdown, Touchable } from "@/components/generic";

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

  const [selectedDate, setSelectedDate] = useState(currentDate);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    router.push("/login");
  };

  const dateEdit = (editType: "plus" | "minus", dateType: "day" | "week") => {
    let newDate = dayjs(selectedDate);
    if (editType === "plus") newDate = newDate.add(1, dateType);
    else newDate = newDate.subtract(1, dateType);

    setSelectedDate(newDate.toDate());

    // TODO: after 3 seconds of no change date -> ask to db to data about that day
  };

  return (
    <div ref={ref_div} className="border-b border-neutral-800">
      <div className="flex items-center justify-center px-1">
        {/* TODO: later implement the calendar selection */}
        <Touchable style={{ opacity: 0 }}>
          <CalendarDaysIcon className={IconStyleClassNames} />
        </Touchable>
        <div className="flex-1 items-center justify-center flex flex-row">
          <Touchable onClick={() => dateEdit("minus", "week")}>
            <ChevronDoubleLeftIcon
              color="gray"
              className={IconStyleClassNames}
            />
          </Touchable>
          <Touchable onClick={() => dateEdit("minus", "day")}>
            <ChevronLeftIcon color="gray" className={IconStyleClassNames} />
          </Touchable>
          <Touchable>
            <p className="w-60 text-sm p-1 px-3 m-3 text-center bg-cyan-600 rounded-sm">
              {dayjs(selectedDate).format("dddd D of MMMM")}
            </p>
          </Touchable>
          <Touchable onClick={() => dateEdit("plus", "day")}>
            <ChevronRightIcon color="gray" className={IconStyleClassNames} />
          </Touchable>
          <Touchable onClick={() => dateEdit("plus", "week")}>
            <ChevronDoubleRightIcon
              color="gray"
              className={IconStyleClassNames}
            />
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
