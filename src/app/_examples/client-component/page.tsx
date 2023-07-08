"use client";

import { supabaseClient } from "@/db";
// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { useEffect, useState } from "react";

export default function ClientComponent() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      // This assumes you have a `todos` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      const { data } = await supabaseClient.from("todos").select();
      if (data) {
        setTodos(data);
      }
    };

    getTodos();
  }, [supabaseClient, setTodos]);

  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
}
