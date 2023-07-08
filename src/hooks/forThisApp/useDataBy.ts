import { useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";

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

    const { data } = await supabaseClient
      .from(TABLE_NAME[dataBy])
      .select("*")
      .eq(TABLE_FIELD[dataBy].user_email, user?.email)
      .single();
    // console.log(`getDataByUser - data`, data);

    if (data) setData(data);
  };

  useEffect(() => {
    getData();
  }, [user]);

  // ─────────────────────────────────────────────────────────────────────

  return { data: data as T };
};
