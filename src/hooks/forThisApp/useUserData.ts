import { useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/db";

type UserData = Database["public"]["Tables"]["all_data"]["Row"];

export const useUserData = ({ authLoading }: { authLoading: boolean }) => {
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useState<UserData>();

  const supabase = createClientComponentClient<Database>();

  // ─────────────────────────────────────────────────────────────────────

  const subscribeToChanges = () =>
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "all_data",
          filter: `email=eq.${user?.email}`,
        },
        (payload) => {
          // console.log("data updated", payload);

          const newData = payload.new as UserData;
          if (payload) setUserData({ ...userData, ...newData });
        }
      )
      .subscribe();

  // ─────────────────────────────────────────────────────────────────────

  const getUser = async () => {
    if (authLoading) return;

    const { data } = await supabase.auth.getUser();
    // console.log(`getUser - data.user`, data.user);

    if (data.user) setUser(data.user);
  };

  useEffect(() => {
    getUser();
  }, [authLoading]);

  // ─────────────────────────────────────────────────────────────────────

  const getUserData = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("all_data")
      .select("*")
      .eq("email", user?.email)
      .single();
    // console.log(`getUserData - data`, data);

    if (data) {
      setUserData(data);
      subscribeToChanges();
    }
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  // ─────────────────────────────────────────────────────────────────────

  return {
    user,
    userData,
  };
};
