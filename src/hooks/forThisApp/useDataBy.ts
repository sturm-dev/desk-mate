import { useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";

import { DB_TABLE, TABLE_FIELD, TABLE_NAME, supabaseClient } from "@/db";

export const useDataBy = <T>({
  dataBy,
  user,
}: {
  dataBy: keyof DB_TABLE & `data_by_${string}`;
  user?: User;
}): {
  data?: T;
} => {
  // ─────────────────────────────────────────────────────────────────────z
  type DataByInterface = DB_TABLE[typeof dataBy]["Row"];
  // ─────────────────────────────────────────────────────────────────────

  const [data, setData] = useState<DataByInterface>();

  // ─────────────────────────────────────────────────────────────────────

  const getData = async () => {
    if (!user) return;

    let data;

    if (dataBy === "data_by_day") {
      // get data filter with actual day
      data = (
        await supabaseClient
          .from(TABLE_NAME[dataBy])
          .select("*")
          .eq(TABLE_FIELD[dataBy].user_email, user?.email)
          .eq(TABLE_FIELD[dataBy].day, dayjs().format("YYYY-MM-DD"))
          .single()
      ).data;
    } else if (dataBy === "data_by_week") {
      const mondayDate = dayjs()
        .startOf("week")
        .add(1, "day")
        .format("YYYY-MM-DD");

      // get data filter with the first monday of the week
      data = (
        await supabaseClient
          .from(TABLE_NAME[dataBy])
          .select("*")
          .eq(TABLE_FIELD[dataBy].user_email, user?.email)
          .eq(TABLE_FIELD[dataBy].monday_of_week, mondayDate)
          .single()
      ).data;
    } else if (dataBy === "data_by_user") {
      // get data filter with user email
      data = (
        await supabaseClient
          .from(TABLE_NAME[dataBy])
          .select("*")
          .eq(TABLE_FIELD[dataBy].user_email, user?.email)
          .single()
      ).data;
    }

    if (data) setData(data);
  };

  useEffect(() => {
    getData();
  }, [user]);

  // ─────────────────────────────────────────────────────────────────────

  return { data: data as T };
};
