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
          calendar_text: string
          email: string
          md_text: string
          owner_id: string
        }
        Insert: {
          calendar_text: string
          email: string
          md_text: string
          owner_id: string
        }
        Update: {
          calendar_text?: string
          email?: string
          md_text?: string
          owner_id?: string
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