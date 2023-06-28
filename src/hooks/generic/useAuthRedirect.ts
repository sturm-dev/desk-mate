/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const useAuthRedirect = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const checkUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) router.replace("/");
    else router.replace("/login");

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [router, supabase.auth]);

  useEffect(() => {
    checkUser();
  }, []);

  return { authLoading: loading };
};
