import { useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";

import { AppData_Interface, TABLE_NAME, supabaseClient } from "@/db";

export const useAppData = ({ user }: { user?: User }) => {
  const [appData, set_appData] = useState<AppData_Interface>();

  // ─────────────────────────────────────────────────────────────────────

  const getAppData = async () => {
    if (!user) return;

    const { data } = await supabaseClient
      .from(TABLE_NAME.app_data)
      .select("*")
      .single();
    // console.log(`getAppData - data`, data);

    if (data) set_appData(data);
  };

  useEffect(() => {
    getAppData();
  }, [user]);

  // ─────────────────────────────────────────────────────────────────────

  return { appData };
};
