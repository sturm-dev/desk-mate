"use client";

import { FullLoading } from "@/components";
import { useAuthRedirect } from "@/hooks";

export default function Edit() {
  const { authLoading } = useAuthRedirect();

  if (authLoading) return <FullLoading />;

  return (
    <div>
      <p>Edit</p>
    </div>
  );
}
