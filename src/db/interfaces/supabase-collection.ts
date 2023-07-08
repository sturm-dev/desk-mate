import { Database } from "./supabase";

// ─────────────────────────────────────────────────────────────────────────────
export type DB_TABLE = Database["public"]["Tables"];
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// APP CONFIG

// - select app_config
export type AppConfig_Interface = DB_TABLE["app_config"]["Row"];

// ─────────────────────────────────────────────────────────────────────────────
// APP DATA

// - select app_data
export type AppData_Interface = DB_TABLE["app_data"]["Row"];

// ─────────────────────────────────────────────────────────────────────────────
// DATA BY DAY

// - select data_by_day
export type DataByDay_Interface = DB_TABLE["data_by_day"]["Row"];
// - insert data_by_day
export type DataByDay_Insert_Interface = DB_TABLE["data_by_day"]["Insert"];

// ─────────────────────────────────────────────────────────────────────────────
// DATA BY USER

// - select data_by_user
export type DataByUser_Interface = DB_TABLE["data_by_user"]["Row"];
// - insert data_by_user
export type DataByUser_Insert_Interface = DB_TABLE["data_by_user"]["Insert"];

// ─────────────────────────────────────────────────────────────────────────────
// DATA BY WEEK

// - select data_by_week
export type DataByWeek_Interface = DB_TABLE["data_by_week"]["Row"];
// - insert data_by_week
export type DataByWeek_Insert_Interface = DB_TABLE["data_by_week"]["Insert"];

// ─────────────────────────────────────────────────────────────────────────────
