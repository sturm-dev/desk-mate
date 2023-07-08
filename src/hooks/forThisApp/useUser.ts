import { useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";

import { supabaseClient } from "@/db";

export const useUser = ({ authLoading }: { authLoading: boolean }) => {
  const [user, setUser] = useState<User>();

  const getUser = async () => {
    if (authLoading) return;

    const { data } = await supabaseClient.auth.getUser();
    // console.log(`getUser - data.user`, data.user);

    if (data.user) setUser(data.user);
  };

  useEffect(() => {
    getUser();
  }, [authLoading]);

  return { user };
};
