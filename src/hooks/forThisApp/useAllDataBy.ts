import { useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";

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
          filter: `${TABLE_FIELD.data_by_day.user_email}=eq.${user?.email}`,
          // TODO: add day/week on filter
          // DOCS:
          // You can listen to individual rows using the format
          // {table}:{col}=eq.{val} - where {col} is the column name,
          // and {val} is the value which you want to match.
        },
        (payload) => {
          console.log("Change received!", payload);

          if (payload.table === TABLE_NAME.data_by_day) {
            set_dataByDay(payload.new as DataByDay_Interface);
          } else if (payload.table === TABLE_NAME.data_by_user) {
            set_dataByUser(payload.new as DataByUser_Interface);
          } else if (payload.table === TABLE_NAME.data_by_week) {
            set_dataByWeek(payload.new as DataByWeek_Interface);
          }
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
