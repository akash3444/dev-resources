export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: string
          slug: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          slug: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          resource_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          resource_id?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          resource_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id: string
        }
        Update: {
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      resource_categories: {
        Row: {
          category_slug: string
          created_at: string
          id: number
          resource_id: string
        }
        Insert: {
          category_slug: string
          created_at?: string
          id?: number
          resource_id?: string
        }
        Update: {
          category_slug?: string
          created_at?: string
          id?: number
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_categories_category_slug_fkey"
            columns: ["category_slug"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "resource_categories_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          created_at: string
          description: string
          docs_url: string | null
          github_url: string | null
          id: string
          image_url: string | null
          npm_url: string | null
          title: string
          twitter_url: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description: string
          docs_url?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          npm_url?: string | null
          title: string
          twitter_url?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          docs_url?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          npm_url?: string | null
          title?: string
          twitter_url?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_resources: {
        Args: {
          category?: string
          order_by?: string
          search_query?: string
          page?: number
          page_size?: number
        }
        Returns: {
          id: string
          title: string
          description: string
          github_url: string
          website_url: string
          npm_url: string
          docs_url: string
          image_url: string
          twitter_url: string
          categories: Json
          likes_count: number
          liked_by_me: boolean
          has_more: boolean
        }[]
      }
      get_resources_by_category: {
        Args: {
          category: string
          order_by: string
        }
        Returns: {
          resource_id: string
          resource_title: string
          resource_description: string
          github_url: string
          website_url: string
          npm_url: string
          docs_url: string
          image_url: string
          twitter_url: string
          categories: Json
        }[]
      }
      get_resources_with_likes: {
        Args: {
          category?: string
          order_by?: string
        }
        Returns: {
          id: string
          title: string
          description: string
          github_url: string
          website_url: string
          npm_url: string
          docs_url: string
          image_url: string
          twitter_url: string
          categories: Json
          likes_count: number
          liked_by_me: boolean
        }[]
      }
      get_resources_with_pagination: {
        Args: {
          category?: string
          order_by?: string
          search_query?: string
          page?: number
          page_size?: number
        }
        Returns: {
          id: string
          title: string
          description: string
          github_url: string
          website_url: string
          npm_url: string
          docs_url: string
          image_url: string
          twitter_url: string
          categories: Json
          likes_count: number
          liked_by_me: boolean
          has_more: boolean
        }[]
      }
      get_resources_with_search: {
        Args: {
          category?: string
          order_by?: string
          search_query?: string
        }
        Returns: {
          id: string
          title: string
          description: string
          github_url: string
          website_url: string
          npm_url: string
          docs_url: string
          image_url: string
          twitter_url: string
          categories: Json
          likes_count: number
          liked_by_me: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
