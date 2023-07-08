import { useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";

import {
  DataByDay_Interface,
  DataByUser_Interface,
  DataByWeek_Interface,
  TABLE_FIELD,
  TABLE_NAME,
  supabaseClient,
} from "@/db";
import {
  useStore_dataByDay,
  useStore_dataByUser,
  useStore_dataByWeek,
} from "@/store";

import { useDataBy } from "./useDataBy";

export const useAllDataBy = ({ user }: { user?: User }) => {
  // 1) get all 3 dataBy
  // 2) save on zustand
  // 3) subscribe to changes
  // 3.1) changes update on zustand
  // 4) return zustand data

  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────

  const { data: _dataByDay } = useDataBy<DataByDay_Interface>({
    user,
    dataBy: "data_by_day",
  });
  const { data: _dataByUser } = useDataBy<DataByUser_Interface>({
    user,
    dataBy: "data_by_user",
  });
  const { data: _dataByWeek } = useDataBy<DataByWeek_Interface>({
    user,
    dataBy: "data_by_week",
  });

  // ─────────────────────────────────────────────────────────────────────────────

  const { dataByDay, set_dataByDay } = useStore_dataByDay();
  const { dataByUser, set_dataByUser } = useStore_dataByUser();
  const { dataByWeek, set_dataByWeek } = useStore_dataByWeek();

  // ─────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (_dataByDay) set_dataByDay(_dataByDay);
  }, [_dataByDay]);
  useEffect(() => {
    if (_dataByUser) set_dataByUser(_dataByUser);
  }, [_dataByUser]);
  useEffect(() => {
    if (_dataByWeek) set_dataByWeek(_dataByWeek);
  }, [_dataByWeek]);

  // ─────────────────────────────────────────────────────────────────────────────

  // TODO: check this filter method
  // https://isoadnkfemfhmcogmekj.supabase.co/rest/v1/data_by_day?
  // select=*&user_email=eq.sturmenta%40gmail.com

  const subscribeToChanges = () => {
    if (alreadySubscribed) return;

    console.log("subscribedToChanges!");
    setAlreadySubscribed(true);
    supabaseClient
      .channel("any")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "*",
          table: TABLE_NAME.data_by_day,
          filter: `${TABLE_FIELD.data_by_day.user_email}=eq.${user?.email}`, // TODO: test with &
        },
        (payload) => {
          console.log("Change received - data_by_day!", payload);

          const newData = payload.new as DataByDay_Interface;
          const actualDay = dayjs().format("YYYY-MM-DD");

          if (newData.day === actualDay) set_dataByDay(newData);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "*",
          table: TABLE_NAME.data_by_week,
          filter: `${TABLE_FIELD.data_by_week.user_email}=eq.${user?.email}`,
        },
        (payload) => {
          console.log("Change received - data_by_week!", payload);

          const newData = payload.new as DataByWeek_Interface;
          const mondayDate = dayjs()
            .startOf("week")
            .add(1, "day")
            .format("YYYY-MM-DD");

          if (newData.monday_of_week === mondayDate) set_dataByWeek(newData);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "*",
          table: TABLE_NAME.data_by_user,
          filter: `${TABLE_FIELD.data_by_user.user_email}=eq.${user?.email}`,
        },
        (payload) => {
          console.log("Change received - data_by_user!", payload);

          set_dataByUser(payload.new as DataByUser_Interface);
        }
      )
      .subscribe();
  };
  useEffect(() => {
    subscribeToChanges();
  }, []);

  // ─────────────────────────────────────────────────────────────────────

  return {
    dataByDay,
    dataByUser,
    dataByWeek,
  };
};
