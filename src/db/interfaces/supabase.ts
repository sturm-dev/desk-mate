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
      all_data: {
        Row: {
          calendar_text: string | null
          daily__md_text: string | null
          email: string
          not_forget__md_text: string | null
          owner_id: string
          week__md_text: string | null
        }
        Insert: {
          calendar_text?: string | null
          daily__md_text?: string | null
          email: string
          not_forget__md_text?: string | null
          owner_id: string
          week__md_text?: string | null
        }
        Update: {
          calendar_text?: string | null
          daily__md_text?: string | null
          email?: string
          not_forget__md_text?: string | null
          owner_id?: string
          week__md_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "all_data_owner_id_fkey"
            columns: ["owner_id"]
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
