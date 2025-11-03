export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
          role: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: string;
          role?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
          role?: string | null;
        };
        Relationships: [];
      };
      applications: {
        Row: {
          created_at: string | null;
          email: string;
          id: number;
          job_id: number | null;
          name: string;
          phone: number;
          resume_url: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: number;
          job_id?: number | null;
          name: string;
          phone: number;
          resume_url: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: number;
          job_id?: number | null;
          name?: string;
          phone?: number;
          resume_url?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "job_postings";
            referencedColumns: ["id"];
          }
        ];
      };
      about_timeline: {
        Row: {
          id: number;
          year: string;
          title: string;
          description: string;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          year: string;
          title: string;
          description: string;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          year?: string;
          title?: string;
          description?: string;
          image_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };

      contact_submissions: {
        Row: {
          id: string; // UUID
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          status?: "new" | string | null;
          created_at?: string | null; // timestamp
        };
        Insert: {
          id?: string; // Supabase generates UUID if omitted
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          status?: "new" | string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          status?: "new" | string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      blogs: {
        Row: {
          author: string | null;
          content: string | null;
          created_at: string | null;
          id: number;
          image_url: string | null;
          title: string;
        };
        Insert: {
          author?: string | null;
          content?: string | null;
          created_at?: string | null;
          id?: number;
          image_url?: string | null;
          title: string;
        };
        Update: {
          author?: string | null;
          content?: string | null;
          created_at?: string | null;
          id?: number;
          image_url?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      "candidates direct form": {
        Row: {
          created_at: string | null;
          email: string;
          experience: string | null;
          id: string;
          name: string;
          phone: string | null;
          resume_url: string | null;
          skills: Json | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          experience?: string | null;
          id?: string;
          name: string;
          phone?: string | null;
          resume_url?: string | null;
          skills?: Json | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          experience?: string | null;
          id?: string;
          name?: string;
          phone?: string | null;
          resume_url?: string | null;
          skills?: Json | null;
        };
        Relationships: [];
      };
      departments: {
        Row: {
          active: boolean | null;
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          active?: boolean | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          active?: boolean | null;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      gallery_categories: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      gallery_images: {
        Row: {
          category_id: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          image_name: string | null;
          image_url: string;
          title: string | null;
          uploaded_by: string | null;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image_name?: string | null;
          image_url: string;
          title?: string | null;
          uploaded_by?: string | null;
        };
        Update: {
          category_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image_name?: string | null;
          image_url?: string;
          title?: string | null;
          uploaded_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "gallery_images_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "gallery_categories";
            referencedColumns: ["id"];
          }
        ];
      };
      job_fields: {
        Row: {
          field_name: string;
          field_type: string | null;
          id: number;
          job_id: number | null;
        };
        Insert: {
          field_name: string;
          field_type?: string | null;
          id?: number;
          job_id?: number | null;
        };
        Update: {
          field_name?: string;
          field_type?: string | null;
          id?: number;
          job_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "job_fields_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "job_postings";
            referencedColumns: ["id"];
          }
        ];
      };
      job_postings: {
        Row: {
          created_at: string | null;
          department: string | null;
          description: string | null;
          id: number;
          is_active: boolean | null;
          job_type: string | null;
          location: string | null;
          perks: string[] | null;
          position: string | null;
          requirements: string[] | null;
          responsibilities: string[] | null;
          seniority_level: string | null;
          status: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          department?: string | null;
          description?: string | null;
          id?: number;
          is_active?: boolean | null;
          job_type?: string | null;
          location?: string | null;
          perks?: string[] | null;
          position?: string | null;
          requirements?: string[] | null;
          responsibilities?: string[] | null;
          seniority_level?: string | null;
          status?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          department?: string | null;
          description?: string | null;
          id?: number;
          is_active?: boolean | null;
          job_type?: string | null;
          location?: string | null;
          perks?: string[] | null;
          position?: string | null;
          requirements?: string[] | null;
          responsibilities?: string[] | null;
          seniority_level?: string | null;
          status?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          percentage: number | null;
          team_member_id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          percentage?: number | null;
          team_member_id: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          percentage?: number | null;
          team_member_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "skills_team_member_id_fkey";
            columns: ["team_member_id"];
            isOneToOne: false;
            referencedRelation: "team_members";
            referencedColumns: ["id"];
          }
        ];
      };
      team_members: {
        Row: {
          active: boolean | null;
          created_at: string | null;
          department_id: number | null;
          description: string | null;
          location?: string | null;
          id: number;
          image_url: string | null;
          linkedin_url: string | null;
          name: string;
          role: string | null;
        };
        Insert: {
          active?: boolean | null;
          created_at?: string | null;
          department_id?: number | null;
          description?: string | null;
          location?: string | null;
          id?: number;
          image_url?: string | null;
          linkedin_url?: string | null;
          name: string;
          role?: string | null;
        };
        Update: {
          active?: boolean | null;
          created_at?: string | null;
          department_id?: number | null;
          description?: string | null;
          location?: string | null;
          id?: number;
          image_url?: string | null;
          linkedin_url?: string | null;
          name?: string;
          role?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "team_members_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
