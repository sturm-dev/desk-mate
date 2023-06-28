import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import LogoutButton from "./logout-button";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const markdownText = `
  - [ ] asd
  `;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-1">
      <h1 className="text-2xl mb-2 flex justify-between">
        <span className="sr-only">Supabase and Next.js Starter Template</span>
      </h1>

      <div className="flex border-b py-3 text-sm text-neutral-100 pr-10">
        <span className="ml-auto">
          {user ? (
            <span className="flex gap-4">
              Hey, {user.email}! <span className="border-r"></span>{" "}
              <LogoutButton />
            </span>
          ) : (
            <Link href="/login" className="text-neutral-100 hover:underline">
              Login
            </Link>
          )}
        </span>
      </div>

      <div className="p-3">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownText}
        </ReactMarkdown>
      </div>
    </div>
  );
}
