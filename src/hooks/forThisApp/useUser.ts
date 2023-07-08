import { useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/db";

export const useUser = ({ authLoading }: { authLoading: boolean }) => {
  const [user, setUser] = useState<User>();

  const supabase = createClientComponentClient<Database>();

  const getUser = async () => {
    if (authLoading) return;

    const { data } = await supabase.auth.getUser();
    // console.log(`getUser - data.user`, data.user);

    if (data.user) setUser(data.user);
  };

  useEffect(() => {
    getUser();
  }, [authLoading]);

  return { user };
};
