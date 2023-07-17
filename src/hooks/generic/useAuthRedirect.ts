/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { supabaseClient } from "@/db";

export const useAuthRedirect = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathName = usePathname();

  const checkUser = useCallback(async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data.user) router.replace(pathName);
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
