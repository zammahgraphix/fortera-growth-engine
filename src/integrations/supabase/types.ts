export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          page: string | null
          section: string | null
          time_spent: number | null
          visitor_id: string | null
          visitor_location: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          page?: string | null
          section?: string | null
          time_spent?: number | null
          visitor_id?: string | null
          visitor_location?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          page?: string | null
          section?: string | null
          time_spent?: number | null
          visitor_id?: string | null
          visitor_location?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          budget_range: string | null
          business_type: Database["public"]["Enums"]["contact_type"]
          company: string | null
          created_at: string | null
          email: string
          goals: string | null
          id: string
          is_read: boolean | null
          name: string
          timeline: string | null
        }
        Insert: {
          budget_range?: string | null
          business_type: Database["public"]["Enums"]["contact_type"]
          company?: string | null
          created_at?: string | null
          email: string
          goals?: string | null
          id?: string
          is_read?: boolean | null
          name: string
          timeline?: string | null
        }
        Update: {
          budget_range?: string | null
          business_type?: Database["public"]["Enums"]["contact_type"]
          company?: string | null
          created_at?: string | null
          email?: string
          goals?: string | null
          id?: string
          is_read?: boolean | null
          name?: string
          timeline?: string | null
        }
        Relationships: []
      }
      email_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          subscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          after_metrics: string | null
          before_metrics: string | null
          client_name: string
          created_at: string | null
          description: string
          display_order: number | null
          id: string
          image_url: string | null
          industry: string
          is_visible: boolean | null
          status: Database["public"]["Enums"]["project_status"] | null
          testimonial: string | null
          testimonial_author: string | null
          testimonial_company: string | null
          updated_at: string | null
        }
        Insert: {
          after_metrics?: string | null
          before_metrics?: string | null
          client_name: string
          created_at?: string | null
          description: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          industry: string
          is_visible?: boolean | null
          status?: Database["public"]["Enums"]["project_status"] | null
          testimonial?: string | null
          testimonial_author?: string | null
          testimonial_company?: string | null
          updated_at?: string | null
        }
        Update: {
          after_metrics?: string | null
          before_metrics?: string | null
          client_name?: string
          created_at?: string | null
          description?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          industry?: string
          is_visible?: boolean | null
          status?: Database["public"]["Enums"]["project_status"] | null
          testimonial?: string | null
          testimonial_author?: string | null
          testimonial_company?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing_tiers: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          features: Json | null
          id: string
          is_visible: boolean | null
          name: string
          price: string | null
          target_audience: string | null
          tier: Database["public"]["Enums"]["pricing_tier"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          features?: Json | null
          id?: string
          is_visible?: boolean | null
          name: string
          price?: string | null
          target_audience?: string | null
          tier: Database["public"]["Enums"]["pricing_tier"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          features?: Json | null
          id?: string
          is_visible?: boolean | null
          name?: string
          price?: string | null
          target_audience?: string | null
          tier?: Database["public"]["Enums"]["pricing_tier"]
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          icon: string | null
          id: string
          is_visible: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subsidiaries: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          icon: string | null
          id: string
          is_visible: boolean | null
          name: string
          status: Database["public"]["Enums"]["subsidiary_status"] | null
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          name: string
          status?: Database["public"]["Enums"]["subsidiary_status"] | null
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          name?: string
          status?: Database["public"]["Enums"]["subsidiary_status"] | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string
          company: string
          content: string
          country: string | null
          created_at: string | null
          display_order: number | null
          id: string
          is_approved: boolean | null
        }
        Insert: {
          client_name: string
          company: string
          content: string
          country?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_approved?: boolean | null
        }
        Update: {
          client_name?: string
          company?: string
          content?: string
          country?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_approved?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      contact_type: "startup" | "established" | "idea"
      pricing_tier: "foundation" | "growth" | "partnership"
      project_status: "active" | "upcoming" | "completed"
      subsidiary_status: "active" | "upcoming" | "planned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      contact_type: ["startup", "established", "idea"],
      pricing_tier: ["foundation", "growth", "partnership"],
      project_status: ["active", "upcoming", "completed"],
      subsidiary_status: ["active", "upcoming", "planned"],
    },
  },
} as const
