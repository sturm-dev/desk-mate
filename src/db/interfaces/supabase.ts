export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      app_config: {
        Row: {
          app_version: string | null
          id: number
        }
        Insert: {
          app_version?: string | null
          id?: number
        }
        Update: {
          app_version?: string | null
          id?: number
        }
        Relationships: []
      }
      app_data: {
        Row: {
          daily_quote__md_text: string
          id: number
        }
        Insert: {
          daily_quote__md_text: string
          id?: number
        }
        Update: {
          daily_quote__md_text?: string
          id?: number
        }
        Relationships: []
      }
      data_by_day: {
        Row: {
          calendar_text: string | null
          created_at: string
          day: string
          id: number
          md_text: string | null
          user_email: string
          user_id: string
        }
        Insert: {
          calendar_text?: string | null
          created_at?: string
          day: string
          id?: number
          md_text?: string | null
          user_email: string
          user_id: string
        }
        Update: {
          calendar_text?: string | null
          created_at?: string
          day?: string
          id?: number
          md_text?: string | null
          user_email?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_by_day_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      data_by_user: {
        Row: {
          created_at: string
          custom_quote__md_text: string | null
          do_not_forget__md_text: string | null
          goal: string | null
          user_email: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_quote__md_text?: string | null
          do_not_forget__md_text?: string | null
          goal?: string | null
          user_email: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_quote__md_text?: string | null
          do_not_forget__md_text?: string | null
          goal?: string | null
          user_email?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_by_user_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      data_by_week: {
        Row: {
          created_at: string
          id: number
          md_text: string | null
          monday_of_week: string
          user_email: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          md_text?: string | null
          monday_of_week: string
          user_email: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          md_text?: string | null
          monday_of_week?: string
          user_email?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_by_week_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
