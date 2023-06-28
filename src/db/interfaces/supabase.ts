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
      md_text: {
        Row: {
          email: string
          md_text: string
          owner_id: string
        }
        Insert: {
          email: string
          md_text: string
          owner_id: string
        }
        Update: {
          email?: string
          md_text?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "md_text_owner_id_fkey"
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
