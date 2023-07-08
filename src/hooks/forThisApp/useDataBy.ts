import { useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { DB_TABLE, Database, TABLE_FIELD, TABLE_NAME } from "@/db";

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

  const supabase = createClientComponentClient<Database>();

  // ─────────────────────────────────────────────────────────────────────

  // TODO: check subscription not working
  const subscribeToChanges = () =>
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TABLE_NAME[dataBy],
          filter: `${TABLE_FIELD[dataBy].user_email}=eq.${user?.email}`,
        },
        (payload) => {
          // console.log("data updated", payload);

          const newData = payload.new as DataByInterface;
          if (payload) setData({ ...data, ...newData });
        }
      )
      .subscribe();

  // ─────────────────────────────────────────────────────────────────────

  const getData = async () => {
    if (!user) return;

    const { data } = await supabase
      .from(TABLE_NAME[dataBy])
      .select("*")
      .eq(TABLE_FIELD[dataBy].user_email, user?.email)
      .single();
    // console.log(`getDataByUser - data`, data);

    if (data) {
      setData(data);
      subscribeToChanges();
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  // ─────────────────────────────────────────────────────────────────────

  return { data: data as T };
};
