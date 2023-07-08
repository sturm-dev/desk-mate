import { Database } from "./supabase";

// ─────────────────────────────────────────────────────────────────────────────
type DB_TABLE = Database["public"]["Tables"];
// ─────────────────────────────────────────────────────────────────────────────

// TABLE_NAME.app_config;
// TABLE_FIELD.app_config.app_version

export const TABLE_NAME: {
  [key in keyof DB_TABLE]: key;
} = {
  app_config: "app_config",
  app_data: "app_data",
  data_by_day: "data_by_day",
  data_by_user: "data_by_user",
  data_by_week: "data_by_week",
};

export const TABLE_FIELD: {
  [key_1 in keyof DB_TABLE]: { [key_2 in keyof DB_TABLE[key_1]["Row"]]: key_2 };
} = {
  app_config: {
    id: "id",
    app_version: "app_version",
  },
  app_data: {
    id: "id",
    daily_quote__md_text: "daily_quote__md_text",
  },
  data_by_day: {
    id: "id",
    calendar_text: "calendar_text",
    created_at: "created_at",
    day: "day",
    md_text: "md_text",
    user_email: "user_email",
    user_id: "user_id",
  },
  data_by_user: {
    created_at: "created_at",
    custom_quote__md_text: "custom_quote__md_text",
    do_not_forget__md_text: "do_not_forget__md_text",
    goal: "goal",
    user_email: "user_email",
    user_id: "user_id",
  },
  data_by_week: {
    created_at: "created_at",
    id: "id",
    md_text: "md_text",
    monday_of_week: "monday_of_week",
    user_email: "user_email",
    user_id: "user_id",
  },
};
