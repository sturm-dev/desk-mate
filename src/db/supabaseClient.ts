import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./interfaces";

export const supabaseClient = createClientComponentClient<Database>();
