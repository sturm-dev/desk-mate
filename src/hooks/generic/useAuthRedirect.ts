/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/db";

export const useAuthRedirect = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const checkUser = useCallback(async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data.user) router.replace("/");
    else router.replace("/login");

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [router, supabaseClient.auth]);

  useEffect(() => {
    checkUser();
  }, []);

  return { authLoading: loading };
};
