export type Json =
  | string
  | number
  | boolean
  | null
  | { [ key: string ]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      feedback: {
        Row: {
          id: string;
          subject: string;
          category: string;
          description: string;
          attachment_url: string | null;
          user_id: string;
          created_at: string | null;
        };
        Insert: {
          subject: string;
          category: string;
          description: string;
          attachment_url?: string | null;
          user_id: string;
        };
        Update: {
          subject?: string;
          category?: string;
          description?: string;
          attachment_url?: string | null;
          user_id?: string;
        };
      };
      agenda: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string | null
          event_id: string
          host_or_artist: string | null
          id: string
          start_time: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_id: string
          host_or_artist?: string | null
          id?: string
          start_time?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_id?: string
          host_or_artist?: string | null
          id?: string
          start_time?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agenda_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
        ]
      }
      attendees: {
        Row: {
          check_in_time: string | null
          created_at: string | null
          email: string
          event_id: string
          id: string
          name: string
          notes: string | null
          org_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          check_in_time?: string | null
          created_at?: string | null
          email: string
          event_id: string
          id?: string
          name: string
          notes?: string | null
          org_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          check_in_time?: string | null
          created_at?: string | null
          email?: string
          event_id?: string
          id?: string
          name?: string
          notes?: string | null
          org_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendees_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "attendees_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      audience_segments: {
        Row: {
          created_at: string | null
          criteria: Json
          id: string
          name: string
          org_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          criteria: Json
          id?: string
          name: string
          org_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          criteria?: Json
          id?: string
          name?: string
          org_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audience_segments_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      authors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: number
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: number
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: number
          is_published: boolean | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          tags: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: number
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: number
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          tags?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: number
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: number
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          tags?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: [ "author_id" ]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: [ "id" ]
          },
        ]
      }
      cal_event_attendees: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          notes: string | null
          response_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          notes?: string | null
          response_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          notes?: string | null
          response_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cal_event_attendees_event_id_calendar_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "calendar_events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "cal_event_attendees_user_id_user_profiles_id_fk"
            columns: [ "user_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      calendar_event_reminders: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          message: string | null
          remind_at: string
          reminder_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          message?: string | null
          remind_at: string
          reminder_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          message?: string | null
          remind_at?: string
          reminder_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_event_reminders_event_id_calendar_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "calendar_events"
            referencedColumns: [ "id" ]
          },
        ]
      }
      calendar_events: {
        Row: {
          all_day: boolean | null
          calendar_id: string
          created_at: string | null
          description: string | null
          end_date: string | null
          event_type: string | null
          id: string
          is_recurring: boolean | null
          location: string | null
          notification_settings: Json | null
          organizer_id: string | null
          recurrence_rule: string | null
          start_date: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          all_day?: boolean | null
          calendar_id: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          notification_settings?: Json | null
          organizer_id?: string | null
          recurrence_rule?: string | null
          start_date: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          all_day?: boolean | null
          calendar_id?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          event_type?: string | null
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          notification_settings?: Json | null
          organizer_id?: string | null
          recurrence_rule?: string | null
          start_date?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_calendar_id_calendars_id_fk"
            columns: [ "calendar_id" ]
            isOneToOne: false
            referencedRelation: "calendars"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "calendar_events_organizer_id_user_profiles_id_fk"
            columns: [ "organizer_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      calendar_tasks: {
        Row: {
          assigned_to: string | null
          calendar_id: string
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          is_completed: boolean | null
          notification_settings: Json | null
          priority: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          calendar_id: string
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          notification_settings?: Json | null
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          calendar_id?: string
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_completed?: boolean | null
          notification_settings?: Json | null
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_tasks_assigned_to_user_profiles_id_fk"
            columns: [ "assigned_to" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "calendar_tasks_calendar_id_calendars_id_fk"
            columns: [ "calendar_id" ]
            isOneToOne: false
            referencedRelation: "calendars"
            referencedColumns: [ "id" ]
          },
        ]
      }
      calendars: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          org_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          org_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          org_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendars_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "calendars_user_id_user_profiles_id_fk"
            columns: [ "user_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      communication_logs: {
        Row: {
          communication_type: string
          contact_id: string
          contact_type: string
          content: string | null
          created_at: string | null
          date: string | null
          event_id: string | null
          follow_up_date: string | null
          follow_up_needed: boolean | null
          id: string
          org_id: string
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          communication_type: string
          contact_id: string
          contact_type: string
          content?: string | null
          created_at?: string | null
          date?: string | null
          event_id?: string | null
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          org_id: string
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          communication_type?: string
          contact_id?: string
          contact_type?: string
          content?: string | null
          created_at?: string | null
          date?: string | null
          event_id?: string | null
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          org_id?: string
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_logs_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "communication_logs_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      customer_feedback: {
        Row: {
          created_at: string | null
          customer_id: string
          event_id: string | null
          feedback: string | null
          id: string
          rating: number | null
          session_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          event_id?: string | null
          feedback?: string | null
          id?: string
          rating?: number | null
          session_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          event_id?: string | null
          feedback?: string | null
          id?: string
          rating?: number | null
          session_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_feedback_customer_id_org_customers_id_fk"
            columns: [ "customer_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "customer_feedback_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "customer_feedback_session_id_event_sessions_id_fk"
            columns: [ "session_id" ]
            isOneToOne: false
            referencedRelation: "event_sessions"
            referencedColumns: [ "id" ]
          },
        ]
      }
      customer_interactions: {
        Row: {
          created_at: string | null
          customer_id: string
          id: string
          interaction_date: string
          interaction_type: string
          notes: string | null
          org_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          id?: string
          interaction_date?: string
          interaction_type: string
          notes?: string | null
          org_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          id?: string
          interaction_date?: string
          interaction_type?: string
          notes?: string | null
          org_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_interactions_customer_id_org_customers_id_fk"
            columns: [ "customer_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "customer_interactions_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      donors: {
        Row: {
          acknowledgment_sent: boolean | null
          created_at: string | null
          donation_amount: number | null
          donation_date: string | null
          donation_type: string | null
          email: string
          id: string
          name: string
          notes: string | null
          org_id: string
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          acknowledgment_sent?: boolean | null
          created_at?: string | null
          donation_amount?: number | null
          donation_date?: string | null
          donation_type?: string | null
          email: string
          id?: string
          name: string
          notes?: string | null
          org_id: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          acknowledgment_sent?: boolean | null
          created_at?: string | null
          donation_amount?: number | null
          donation_date?: string | null
          donation_type?: string | null
          email?: string
          id?: string
          name?: string
          notes?: string | null
          org_id?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donors_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      email_campaigns: {
        Row: {
          body: string
          created_at: string | null
          id: string
          name: string
          org_id: string
          scheduled_at: string | null
          segment_id: string | null
          sent_at: string | null
          status: string | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          name: string
          org_id: string
          scheduled_at?: string | null
          segment_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          name?: string
          org_id?: string
          scheduled_at?: string | null
          segment_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "email_campaigns_segment_id_audience_segments_id_fk"
            columns: [ "segment_id" ]
            isOneToOne: false
            referencedRelation: "audience_segments"
            referencedColumns: [ "id" ]
          },
        ]
      }
      email_recipients: {
        Row: {
          campaign_id: string
          clicked_at: string | null
          created_at: string | null
          customer_id: string
          id: string
          opened_at: string | null
          sent_at: string | null
          updated_at: string | null
        }
        Insert: {
          campaign_id: string
          clicked_at?: string | null
          created_at?: string | null
          customer_id: string
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string
          clicked_at?: string | null
          created_at?: string | null
          customer_id?: string
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_recipients_campaign_id_email_campaigns_id_fk"
            columns: [ "campaign_id" ]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "email_recipients_customer_id_org_customers_id_fk"
            columns: [ "customer_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
        ]
      }
      email_templates: {
        Row: {
          body: string
          created_at: string | null
          id: string
          name: string
          org_id: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          name: string
          org_id: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          name?: string
          org_id?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      event_locations: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          event_id: string
          id: string
          latitude: number | null
          longitude: number | null
          name: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          event_id: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          event_id?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_locations_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
        ]
      }
      event_media: {
        Row: {
          created_at: string | null
          description: string | null
          event_id: string
          id: string
          org_id: string
          type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_id: string
          id?: string
          org_id: string
          type: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_id?: string
          id?: string
          org_id?: string
          type?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_media_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "event_media_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      event_schedules: {
        Row: {
          created_at: string | null
          customer_id: string
          description: string | null
          end_time: string | null
          event_id: string
          id: string
          location: string | null
          notes: string | null
          org_id: string
          session_id: string
          speaker: string | null
          start_time: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          description?: string | null
          end_time?: string | null
          event_id: string
          id?: string
          location?: string | null
          notes?: string | null
          org_id: string
          session_id: string
          speaker?: string | null
          start_time?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          description?: string | null
          end_time?: string | null
          event_id?: string
          id?: string
          location?: string | null
          notes?: string | null
          org_id?: string
          session_id?: string
          speaker?: string | null
          start_time?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_schedules_customer_id_org_customers_id_fk"
            columns: [ "customer_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "event_schedules_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "event_schedules_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "event_schedules_session_id_event_sessions_id_fk"
            columns: [ "session_id" ]
            isOneToOne: false
            referencedRelation: "event_sessions"
            referencedColumns: [ "id" ]
          },
        ]
      }
      event_sections: {
        Row: {
          content: string
          created_at: string | null
          event_id: string
          id: string
          org_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          event_id: string
          id?: string
          org_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          event_id?: string
          id?: string
          org_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_sections_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "event_sections_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      event_sessions: {
        Row: {
          capacity: number | null
          created_at: string | null
          description: string | null
          end_time: string
          event_id: string
          id: string
          is_free: boolean | null
          latitude: number | null
          location: string | null
          longitude: number | null
          name: string
          notes: string | null
          performer_id: string | null
          recording_url: string | null
          resources: string[] | null
          session_date: string
          speaker_id: string | null
          start_time: string
          status: string
          tags: string[] | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          end_time: string
          event_id: string
          id?: string
          is_free?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          name: string
          notes?: string | null
          performer_id?: string | null
          recording_url?: string | null
          resources?: string[] | null
          session_date: string
          speaker_id?: string | null
          start_time: string
          status?: string
          tags?: string[] | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          end_time?: string
          event_id?: string
          id?: string
          is_free?: boolean | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          name?: string
          notes?: string | null
          performer_id?: string | null
          recording_url?: string | null
          resources?: string[] | null
          session_date?: string
          speaker_id?: string | null
          start_time?: string
          status?: string
          tags?: string[] | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_sessions_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "event_sessions_performer_id_org_performers_id_fk"
            columns: [ "performer_id" ]
            isOneToOne: false
            referencedRelation: "org_performers"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "event_sessions_speaker_id_event_speakers_id_fk"
            columns: [ "speaker_id" ]
            isOneToOne: false
            referencedRelation: "event_speakers"
            referencedColumns: [ "id" ]
          },
        ]
      }
      event_speakers: {
        Row: {
          bio: string | null
          contact_frequency: string | null
          contract_details: Json | null
          created_at: string | null
          email: string
          email_group: string | null
          event_id: string | null
          id: string
          last_contacted: string | null
          name: string
          next_follow_up: string | null
          notes: string | null
          org_id: string
          phone: string | null
          profile_image_url: string | null
          social_links: Json | null
          status: string | null
          tags: Json | null
          talk_description: string | null
          talk_time: string | null
          talk_title: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          contact_frequency?: string | null
          contract_details?: Json | null
          created_at?: string | null
          email: string
          email_group?: string | null
          event_id?: string | null
          id?: string
          last_contacted?: string | null
          name: string
          next_follow_up?: string | null
          notes?: string | null
          org_id: string
          phone?: string | null
          profile_image_url?: string | null
          social_links?: Json | null
          status?: string | null
          tags?: Json | null
          talk_description?: string | null
          talk_time?: string | null
          talk_title?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          contact_frequency?: string | null
          contract_details?: Json | null
          created_at?: string | null
          email?: string
          email_group?: string | null
          event_id?: string | null
          id?: string
          last_contacted?: string | null
          name?: string
          next_follow_up?: string | null
          notes?: string | null
          org_id?: string
          phone?: string | null
          profile_image_url?: string | null
          social_links?: Json | null
          status?: string | null
          tags?: Json | null
          talk_description?: string | null
          talk_time?: string | null
          talk_title?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_speakers_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "event_speakers_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      event_tags: {
        Row: {
          created_at: string | null
          event_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          tag_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_tags_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "event_tags_tag_id_tags_id_fk"
            columns: [ "tag_id" ]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: [ "id" ]
          },
        ]
      }
      events: {
        Row: {
          address: string | null
          age_restriction: string | null
          banner_image: string | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          end_date: string
          event_end_time: string | null
          event_start_time: string | null
          faqs: Json | null
          featured_image: string | null
          featured_image_gallary: string[] | null
          gallery_images: Json | null
          highlights: string[] | null
          id: string
          latitude: number | null
          longitude: number | null
          max_attendees: number | null
          name: string
          notes: string | null
          org_id: string
          organizer_contact: string | null
          parking_options: string | null
          refund_policy: string | null
          schedule_details: string | null
          slug: string
          start_date: string
          state: string | null
          status: string
          tags: string[] | null
          timezone: string | null
          updated_at: string | null
          venue: string | null
          venue_description: string | null
          venue_image: string | null
          video_links: string[] | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          age_restriction?: string | null
          banner_image?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          end_date: string
          event_end_time?: string | null
          event_start_time?: string | null
          faqs?: Json | null
          featured_image?: string | null
          featured_image_gallary?: string[] | null
          gallery_images?: Json | null
          highlights?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          max_attendees?: number | null
          name: string
          notes?: string | null
          org_id: string
          organizer_contact?: string | null
          parking_options?: string | null
          refund_policy?: string | null
          schedule_details?: string | null
          slug: string
          start_date: string
          state?: string | null
          status?: string
          tags?: string[] | null
          timezone?: string | null
          updated_at?: string | null
          venue?: string | null
          venue_description?: string | null
          venue_image?: string | null
          video_links?: string[] | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          age_restriction?: string | null
          banner_image?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string
          event_end_time?: string | null
          event_start_time?: string | null
          faqs?: Json | null
          featured_image?: string | null
          featured_image_gallary?: string[] | null
          gallery_images?: Json | null
          highlights?: string[] | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          max_attendees?: number | null
          name?: string
          notes?: string | null
          org_id?: string
          organizer_contact?: string | null
          parking_options?: string | null
          refund_policy?: string | null
          schedule_details?: string | null
          slug?: string
          start_date?: string
          state?: string | null
          status?: string
          tags?: string[] | null
          timezone?: string | null
          updated_at?: string | null
          venue?: string | null
          venue_description?: string | null
          venue_image?: string | null
          video_links?: string[] | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      favorite_events: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_events_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "favorite_events_user_id_user_profiles_id_fk"
            columns: [ "user_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      favorite_performers: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          performer_id: string
          updated_at: string | null
          visitor_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          performer_id: string
          updated_at?: string | null
          visitor_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          performer_id?: string
          updated_at?: string | null
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_performers_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "favorite_performers_performer_id_org_performers_id_fk"
            columns: [ "performer_id" ]
            isOneToOne: false
            referencedRelation: "org_performers"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "favorite_performers_visitor_id_org_customers_id_fk"
            columns: [ "visitor_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
        ]
      }
      favorite_sessions: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          session_id: string
          updated_at: string | null
          visitor_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          session_id: string
          updated_at?: string | null
          visitor_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          session_id?: string
          updated_at?: string | null
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_sessions_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "favorite_sessions_session_id_event_sessions_id_fk"
            columns: [ "session_id" ]
            isOneToOne: false
            referencedRelation: "event_sessions"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "favorite_sessions_visitor_id_org_customers_id_fk"
            columns: [ "visitor_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
        ]
      }
      feedback_surveys: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          org_id: string
          respondent_id: string
          respondent_type: string
          survey_data: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          org_id: string
          respondent_id: string
          respondent_type: string
          survey_data?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          org_id?: string
          respondent_id?: string
          respondent_type?: string
          survey_data?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_surveys_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "feedback_surveys_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      festival_map_locations: {
        Row: {
          coordinates: Json
          created_at: string | null
          description: string | null
          event_id: string
          id: string
          name: string
          org_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          coordinates: Json
          created_at?: string | null
          description?: string | null
          event_id: string
          id?: string
          name: string
          org_id: string
          type: string
          updated_at?: string | null
        }
        Update: {
          coordinates?: Json
          created_at?: string | null
          description?: string | null
          event_id?: string
          id?: string
          name?: string
          org_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "festival_map_locations_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "festival_map_locations_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      form_fields: {
        Row: {
          created_at: string
          field_name: string
          field_type: string
          form_id: string
          id: string
          is_required: boolean | null
          options: Json | null
          order: number
          placeholder: string | null
        }
        Insert: {
          created_at?: string
          field_name: string
          field_type: string
          form_id: string
          id?: string
          is_required?: boolean | null
          options?: Json | null
          order: number
          placeholder?: string | null
        }
        Update: {
          created_at?: string
          field_name?: string
          field_type?: string
          form_id?: string
          id?: string
          is_required?: boolean | null
          options?: Json | null
          order?: number
          placeholder?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_form_id_forms_id_fk"
            columns: [ "form_id" ]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: [ "id" ]
          },
        ]
      }
      form_response_details: {
        Row: {
          created_at: string
          field_value: Json
          form_field_id: string
          form_response_id: string
          id: string
        }
        Insert: {
          created_at?: string
          field_value: Json
          form_field_id: string
          form_response_id: string
          id?: string
        }
        Update: {
          created_at?: string
          field_value?: Json
          form_field_id?: string
          form_response_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_response_details_form_field_id_form_fields_id_fk"
            columns: [ "form_field_id" ]
            isOneToOne: false
            referencedRelation: "form_fields"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "form_response_details_form_response_id_form_responses_id_fk"
            columns: [ "form_response_id" ]
            isOneToOne: false
            referencedRelation: "form_responses"
            referencedColumns: [ "id" ]
          },
        ]
      }
      form_responses: {
        Row: {
          form_id: string
          id: string
          org_id: string
          responder_id: string | null
          response_data: Json
          submitted_at: string
        }
        Insert: {
          form_id: string
          id?: string
          org_id: string
          responder_id?: string | null
          response_data: Json
          submitted_at?: string
        }
        Update: {
          form_id?: string
          id?: string
          org_id?: string
          responder_id?: string | null
          response_data?: Json
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_responses_form_id_forms_id_fk"
            columns: [ "form_id" ]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "form_responses_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      forms: {
        Row: {
          created_at: string | null
          creator_id: string
          description: string | null
          form_name: string
          header_media_type: string | null
          header_media_url: string | null
          id: string
          is_archived: boolean | null
          is_deleted: boolean | null
          is_draft: boolean | null
          org_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          description?: string | null
          form_name: string
          header_media_type?: string | null
          header_media_url?: string | null
          id?: string
          is_archived?: boolean | null
          is_deleted?: boolean | null
          is_draft?: boolean | null
          org_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          description?: string | null
          form_name?: string
          header_media_type?: string | null
          header_media_url?: string | null
          id?: string
          is_archived?: boolean | null
          is_deleted?: boolean | null
          is_draft?: boolean | null
          org_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_creator_id_user_profiles_user_id_fk"
            columns: [ "creator_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "user_id" ]
          },
          {
            foreignKeyName: "forms_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      grant_reminders: {
        Row: {
          created_at: string | null
          email_sent: boolean | null
          grant_id: string
          id: string
          message: string
          reminder_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email_sent?: boolean | null
          grant_id: string
          id?: string
          message: string
          reminder_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email_sent?: boolean | null
          grant_id?: string
          id?: string
          message?: string
          reminder_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grant_reminders_grant_id_grants_id_fk"
            columns: [ "grant_id" ]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: [ "id" ]
          },
        ]
      }
      grant_reports: {
        Row: {
          attachments: Json | null
          created_at: string | null
          grant_id: string
          id: string
          report_date: string
          report_details: string | null
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          grant_id: string
          id?: string
          report_date?: string
          report_details?: string | null
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          grant_id?: string
          id?: string
          report_date?: string
          report_details?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grant_reports_grant_id_grants_id_fk"
            columns: [ "grant_id" ]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: [ "id" ]
          },
        ]
      }
      grant_reviews: {
        Row: {
          comments: string | null
          created_at: string | null
          grant_id: string
          id: string
          rating: number | null
          review_date: string
          reviewer_id: string
          status_change: string | null
          updated_at: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          grant_id: string
          id?: string
          rating?: number | null
          review_date?: string
          reviewer_id: string
          status_change?: string | null
          updated_at?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          grant_id?: string
          id?: string
          rating?: number | null
          review_date?: string
          reviewer_id?: string
          status_change?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grant_reviews_grant_id_grants_id_fk"
            columns: [ "grant_id" ]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "grant_reviews_reviewer_id_user_profiles_id_fk"
            columns: [ "reviewer_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      grant_touchpoints: {
        Row: {
          contact_person: string | null
          created_at: string | null
          date: string
          grant_id: string
          id: string
          next_touchpoint_date: string | null
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          contact_person?: string | null
          created_at?: string | null
          date: string
          grant_id: string
          id?: string
          next_touchpoint_date?: string | null
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          contact_person?: string | null
          created_at?: string | null
          date?: string
          grant_id?: string
          id?: string
          next_touchpoint_date?: string | null
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grant_touchpoints_grant_id_grants_id_fk"
            columns: [ "grant_id" ]
            isOneToOne: false
            referencedRelation: "grants"
            referencedColumns: [ "id" ]
          },
        ]
      }
      grants: {
        Row: {
          amount_approved: number | null
          amount_requested: number | null
          applicant_organization: string
          application_date: string
          created_at: string | null
          deadline: string
          deliverables: string | null
          grant_name: string
          id: string
          notes: string | null
          org_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount_approved?: number | null
          amount_requested?: number | null
          applicant_organization: string
          application_date: string
          created_at?: string | null
          deadline: string
          deliverables?: string | null
          grant_name: string
          id?: string
          notes?: string | null
          org_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount_approved?: number | null
          amount_requested?: number | null
          applicant_organization?: string
          application_date?: string
          created_at?: string | null
          deadline?: string
          deliverables?: string | null
          grant_name?: string
          id?: string
          notes?: string | null
          org_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grants_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      group_members: {
        Row: {
          created_at: string
          group_id: string
          id: string
          is_group_leader: boolean
          participant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          is_group_leader?: boolean
          participant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          is_group_leader?: boolean
          participant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_signup_sheet_groups_id_fk"
            columns: [ "group_id" ]
            isOneToOne: false
            referencedRelation: "signup_sheet_groups"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "group_members_participant_id_participants_id_fk"
            columns: [ "participant_id" ]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: [ "id" ]
          },
        ]
      }
      guilds: {
        Row: {
          contact_frequency: string | null
          contract_details: Json | null
          created_at: string | null
          description: string | null
          email_group: string | null
          event_id: string | null
          guild_type: string | null
          id: string
          last_contacted: string | null
          leader_contact: string | null
          leader_email: string | null
          leader_name: string | null
          name: string
          next_follow_up: string | null
          notes: string | null
          org_id: string
          profile_image_url: string | null
          status: string | null
          tags: Json | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          contact_frequency?: string | null
          contract_details?: Json | null
          created_at?: string | null
          description?: string | null
          email_group?: string | null
          event_id?: string | null
          guild_type?: string | null
          id?: string
          last_contacted?: string | null
          leader_contact?: string | null
          leader_email?: string | null
          leader_name?: string | null
          name: string
          next_follow_up?: string | null
          notes?: string | null
          org_id: string
          profile_image_url?: string | null
          status?: string | null
          tags?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          contact_frequency?: string | null
          contract_details?: Json | null
          created_at?: string | null
          description?: string | null
          email_group?: string | null
          event_id?: string | null
          guild_type?: string | null
          id?: string
          last_contacted?: string | null
          leader_contact?: string | null
          leader_email?: string | null
          leader_name?: string | null
          name?: string
          next_follow_up?: string | null
          notes?: string | null
          org_id?: string
          profile_image_url?: string | null
          status?: string | null
          tags?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guilds_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "guilds_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      kanban_boards: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          name: string
          org_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          name: string
          org_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          org_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kanban_boards_created_by_user_profiles_id_fk"
            columns: [ "created_by" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "kanban_boards_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      kanban_card_activities: {
        Row: {
          activity_type: string
          card_id: string
          created_at: string | null
          description: string | null
          id: string
          performed_by: string
        }
        Insert: {
          activity_type: string
          card_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          performed_by: string
        }
        Update: {
          activity_type?: string
          card_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          performed_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "kanban_card_activities_card_id_kanban_cards_id_fk"
            columns: [ "card_id" ]
            isOneToOne: false
            referencedRelation: "kanban_cards"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "kanban_card_activities_performed_by_user_profiles_id_fk"
            columns: [ "performed_by" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      kanban_card_comments: {
        Row: {
          card_id: string
          comment: string
          created_at: string | null
          created_by: string
          id: string
          updated_at: string | null
        }
        Insert: {
          card_id: string
          comment: string
          created_at?: string | null
          created_by: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          card_id?: string
          comment?: string
          created_at?: string | null
          created_by?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kanban_card_comments_card_id_kanban_cards_id_fk"
            columns: [ "card_id" ]
            isOneToOne: false
            referencedRelation: "kanban_cards"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "kanban_card_comments_created_by_user_profiles_id_fk"
            columns: [ "created_by" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      kanban_cards: {
        Row: {
          assigned_to: string | null
          board_id: string
          column_id: string
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          position: number
          priority: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          board_id: string
          column_id: string
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          position: number
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          board_id?: string
          column_id?: string
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          position?: number
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kanban_cards_assigned_to_user_profiles_id_fk"
            columns: [ "assigned_to" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "kanban_cards_board_id_kanban_boards_id_fk"
            columns: [ "board_id" ]
            isOneToOne: false
            referencedRelation: "kanban_boards"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "kanban_cards_column_id_kanban_columns_id_fk"
            columns: [ "column_id" ]
            isOneToOne: false
            referencedRelation: "kanban_columns"
            referencedColumns: [ "id" ]
          },
        ]
      }
      kanban_columns: {
        Row: {
          board_id: string
          created_at: string | null
          id: string
          name: string
          position: number
          updated_at: string | null
        }
        Insert: {
          board_id: string
          created_at?: string | null
          id?: string
          name: string
          position: number
          updated_at?: string | null
        }
        Update: {
          board_id?: string
          created_at?: string | null
          id?: string
          name?: string
          position?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kanban_columns_board_id_kanban_boards_id_fk"
            columns: [ "board_id" ]
            isOneToOne: false
            referencedRelation: "kanban_boards"
            referencedColumns: [ "id" ]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          notes: string | null
          org_id: string
          phone: string | null
          stage_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          notes?: string | null
          org_id: string
          phone?: string | null
          stage_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          notes?: string | null
          org_id?: string
          phone?: string | null
          stage_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "leads_stage_id_sales_stages_id_fk"
            columns: [ "stage_id" ]
            isOneToOne: false
            referencedRelation: "sales_stages"
            referencedColumns: [ "id" ]
          },
        ]
      }
      message_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachment_urls: Json | null
          content: string
          created_at: string
          delivery_method: string
          group_id: string | null
          id: string
          message_template_id: string | null
          participant_id: string | null
          sent_at: string
          status: string
          updated_at: string
        }
        Insert: {
          attachment_urls?: Json | null
          content: string
          created_at?: string
          delivery_method: string
          group_id?: string | null
          id?: string
          message_template_id?: string | null
          participant_id?: string | null
          sent_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          attachment_urls?: Json | null
          content?: string
          created_at?: string
          delivery_method?: string
          group_id?: string | null
          id?: string
          message_template_id?: string | null
          participant_id?: string | null
          sent_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_group_id_signup_sheet_groups_id_fk"
            columns: [ "group_id" ]
            isOneToOne: false
            referencedRelation: "signup_sheet_groups"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "messages_message_template_id_message_templates_id_fk"
            columns: [ "message_template_id" ]
            isOneToOne: false
            referencedRelation: "message_templates"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "messages_participant_id_participants_id_fk"
            columns: [ "participant_id" ]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: [ "id" ]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message_content: string
          notification_type: string
          read_at: string | null
          recipient_id: string | null
          scheduled_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_content: string
          notification_type: string
          read_at?: string | null
          recipient_id?: string | null
          scheduled_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message_content?: string
          notification_type?: string
          read_at?: string | null
          recipient_id?: string | null
          scheduled_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_recipient_id_participants_id_fk"
            columns: [ "recipient_id" ]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_customers: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string
          favorite_event_id: string | null
          favorite_performer_id: string | null
          first_name: string | null
          id: string
          last_name: string | null
          metadata: Json | null
          notes: string | null
          org_id: string
          phone: string | null
          profile_image_url: string | null
          state: string | null
          status: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          favorite_event_id?: string | null
          favorite_performer_id?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          metadata?: Json | null
          notes?: string | null
          org_id: string
          phone?: string | null
          profile_image_url?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          favorite_event_id?: string | null
          favorite_performer_id?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          metadata?: Json | null
          notes?: string | null
          org_id?: string
          phone?: string | null
          profile_image_url?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_customers_favorite_event_id_events_id_fk"
            columns: [ "favorite_event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_customers_favorite_performer_id_org_performers_id_fk"
            columns: [ "favorite_performer_id" ]
            isOneToOne: false
            referencedRelation: "org_performers"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_customers_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_event_attendance: {
        Row: {
          additional_notes: string | null
          attendance_status: string | null
          attended_at: string | null
          check_in_method: string | null
          checked_in_by: string | null
          created_at: string | null
          customer_id: string
          duration: number | null
          event_id: string
          feedback_score: number | null
          id: string
          org_id: string
          ticket_id: string | null
          updated_at: string | null
        }
        Insert: {
          additional_notes?: string | null
          attendance_status?: string | null
          attended_at?: string | null
          check_in_method?: string | null
          checked_in_by?: string | null
          created_at?: string | null
          customer_id: string
          duration?: number | null
          event_id: string
          feedback_score?: number | null
          id?: string
          org_id: string
          ticket_id?: string | null
          updated_at?: string | null
        }
        Update: {
          additional_notes?: string | null
          attendance_status?: string | null
          attended_at?: string | null
          check_in_method?: string | null
          checked_in_by?: string | null
          created_at?: string | null
          customer_id?: string
          duration?: number | null
          event_id?: string
          feedback_score?: number | null
          id?: string
          org_id?: string
          ticket_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_event_attendance_checked_in_by_user_profiles_id_fk"
            columns: [ "checked_in_by" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_event_attendance_customer_id_org_customers_id_fk"
            columns: [ "customer_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_event_attendance_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_event_attendance_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_event_attendance_ticket_id_org_event_tickets_id_fk"
            columns: [ "ticket_id" ]
            isOneToOne: false
            referencedRelation: "org_event_tickets"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_event_tickets: {
        Row: {
          access_level: string | null
          barcode: string | null
          check_in_status: boolean | null
          created_at: string | null
          currency: string
          customer_id: string | null
          discount_amount: number | null
          event_id: string
          exchange_rate: number | null
          final_price: number | null
          id: string
          insurance_policy_number: string | null
          insurance_provider: string | null
          is_digital_only: boolean | null
          is_insured: boolean | null
          is_refunded: boolean | null
          is_transferred: boolean | null
          is_vip: boolean | null
          loyalty_points_earned: number | null
          loyalty_points_redeemed: number | null
          name: string
          notes: string | null
          org_id: string
          permissions: Json | null
          physical_ticket_status: string | null
          price: number
          promotion_code: string | null
          promotion_name: string | null
          purchase_date: string | null
          qr_code: string | null
          refund_date: string | null
          sales_channel: string | null
          sales_channel_details: Json | null
          seat_number: string | null
          status: string
          stripe_session_id: string | null
          ticket_type_id: string
          transfer_date: string | null
          transferred_to_user_id: string | null
          updated_at: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          access_level?: string | null
          barcode?: string | null
          check_in_status?: boolean | null
          created_at?: string | null
          currency: string
          customer_id?: string | null
          discount_amount?: number | null
          event_id: string
          exchange_rate?: number | null
          final_price?: number | null
          id?: string
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          is_digital_only?: boolean | null
          is_insured?: boolean | null
          is_refunded?: boolean | null
          is_transferred?: boolean | null
          is_vip?: boolean | null
          loyalty_points_earned?: number | null
          loyalty_points_redeemed?: number | null
          name: string
          notes?: string | null
          org_id: string
          permissions?: Json | null
          physical_ticket_status?: string | null
          price: number
          promotion_code?: string | null
          promotion_name?: string | null
          purchase_date?: string | null
          qr_code?: string | null
          refund_date?: string | null
          sales_channel?: string | null
          sales_channel_details?: Json | null
          seat_number?: string | null
          status?: string
          stripe_session_id?: string | null
          ticket_type_id: string
          transfer_date?: string | null
          transferred_to_user_id?: string | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          access_level?: string | null
          barcode?: string | null
          check_in_status?: boolean | null
          created_at?: string | null
          currency?: string
          customer_id?: string | null
          discount_amount?: number | null
          event_id?: string
          exchange_rate?: number | null
          final_price?: number | null
          id?: string
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          is_digital_only?: boolean | null
          is_insured?: boolean | null
          is_refunded?: boolean | null
          is_transferred?: boolean | null
          is_vip?: boolean | null
          loyalty_points_earned?: number | null
          loyalty_points_redeemed?: number | null
          name?: string
          notes?: string | null
          org_id?: string
          permissions?: Json | null
          physical_ticket_status?: string | null
          price?: number
          promotion_code?: string | null
          promotion_name?: string | null
          purchase_date?: string | null
          qr_code?: string | null
          refund_date?: string | null
          sales_channel?: string | null
          sales_channel_details?: Json | null
          seat_number?: string | null
          status?: string
          stripe_session_id?: string | null
          ticket_type_id?: string
          transfer_date?: string | null
          transferred_to_user_id?: string | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_event_tickets_customer_id_org_customers_id_fk"
            columns: [ "customer_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_event_tickets_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_event_tickets_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_event_tickets_ticket_type_id_org_ticket_types_id_fk"
            columns: [ "ticket_type_id" ]
            isOneToOne: false
            referencedRelation: "org_ticket_types"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_invites: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          email: string
          expires_at: string | null
          id: string
          inviter_id: string | null
          is_resent: boolean | null
          is_revoked: boolean | null
          org_id: string
          role: string | null
          status: string
          token: string
          updated_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          email: string
          expires_at?: string | null
          id?: string
          inviter_id?: string | null
          is_resent?: boolean | null
          is_revoked?: boolean | null
          org_id: string
          role?: string | null
          status: string
          token: string
          updated_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          inviter_id?: string | null
          is_resent?: boolean | null
          is_revoked?: boolean | null
          org_id?: string
          role?: string | null
          status?: string
          token?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_invites_inviter_id_user_profiles_id_fk"
            columns: [ "inviter_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_invites_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_members: {
        Row: {
          created_at: string | null
          departed_at: string | null
          department: string | null
          email: string
          event_id: string | null
          id: string
          is_active: boolean | null
          is_admin: boolean | null
          is_verified: boolean | null
          joined_date: string
          last_login: string | null
          name: string
          notes: string | null
          org_id: string
          permissions: Json | null
          phone_number: string | null
          profile_image_url: string | null
          role: string
          tags: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          departed_at?: string | null
          department?: string | null
          email: string
          event_id?: string | null
          id?: string
          is_active?: boolean | null
          is_admin?: boolean | null
          is_verified?: boolean | null
          joined_date: string
          last_login?: string | null
          name: string
          notes?: string | null
          org_id: string
          permissions?: Json | null
          phone_number?: string | null
          profile_image_url?: string | null
          role: string
          tags?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          departed_at?: string | null
          department?: string | null
          email?: string
          event_id?: string | null
          id?: string
          is_active?: boolean | null
          is_admin?: boolean | null
          is_verified?: boolean | null
          joined_date?: string
          last_login?: string | null
          name?: string
          notes?: string | null
          org_id?: string
          permissions?: Json | null
          phone_number?: string | null
          profile_image_url?: string | null
          role?: string
          tags?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_members_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_members_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_payments: {
        Row: {
          account_type: string
          available_balance: number | null
          country: string | null
          created_at: string | null
          id: string
          last_payout_date: string | null
          last_transaction_date: string | null
          notes: string | null
          org_id: string
          pending_balance: number | null
          status: string
          stripe_account_id: string
          total_fees_paid: number | null
          total_payouts: number | null
          updated_at: string | null
        }
        Insert: {
          account_type?: string
          available_balance?: number | null
          country?: string | null
          created_at?: string | null
          id?: string
          last_payout_date?: string | null
          last_transaction_date?: string | null
          notes?: string | null
          org_id: string
          pending_balance?: number | null
          status?: string
          stripe_account_id: string
          total_fees_paid?: number | null
          total_payouts?: number | null
          updated_at?: string | null
        }
        Update: {
          account_type?: string
          available_balance?: number | null
          country?: string | null
          created_at?: string | null
          id?: string
          last_payout_date?: string | null
          last_transaction_date?: string | null
          notes?: string | null
          org_id?: string
          pending_balance?: number | null
          status?: string
          stripe_account_id?: string
          total_fees_paid?: number | null
          total_payouts?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_payments_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_performers: {
        Row: {
          contact_frequency: string | null
          contract_details: Json | null
          created_at: string | null
          email: string
          email_group: string | null
          event_id: string | null
          genre: string | null
          id: string
          last_contacted: string | null
          name: string
          next_follow_up: string | null
          notes: string | null
          org_id: string
          performance_time: string | null
          phone: string | null
          profile_image_url: string | null
          social_links: Json | null
          stage_name: string
          status: string | null
          tags: Json | null
          updated_at: string | null
        }
        Insert: {
          contact_frequency?: string | null
          contract_details?: Json | null
          created_at?: string | null
          email: string
          email_group?: string | null
          event_id?: string | null
          genre?: string | null
          id?: string
          last_contacted?: string | null
          name: string
          next_follow_up?: string | null
          notes?: string | null
          org_id: string
          performance_time?: string | null
          phone?: string | null
          profile_image_url?: string | null
          social_links?: Json | null
          stage_name: string
          status?: string | null
          tags?: Json | null
          updated_at?: string | null
        }
        Update: {
          contact_frequency?: string | null
          contract_details?: Json | null
          created_at?: string | null
          email?: string
          email_group?: string | null
          event_id?: string | null
          genre?: string | null
          id?: string
          last_contacted?: string | null
          name?: string
          next_follow_up?: string | null
          notes?: string | null
          org_id?: string
          performance_time?: string | null
          phone?: string | null
          profile_image_url?: string | null
          social_links?: Json | null
          stage_name?: string
          status?: string | null
          tags?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_performers_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_performers_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_referral_programs: {
        Row: {
          created_at: string | null
          id: string
          name: string
          org_id: string
          reward: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          org_id: string
          reward: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          org_id?: string
          reward?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_referral_programs_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_ticket_types: {
        Row: {
          available_online: boolean | null
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          event_date: string
          event_end_time: string | null
          event_id: string
          event_start_time: string | null
          gate_open_time: string | null
          group_discount_available: boolean | null
          id: string
          is_early_bird: boolean | null
          is_free: boolean | null
          max_per_customer: number | null
          name: string
          org_id: string
          price: number
          promo_code_required: boolean | null
          quantity: number
          refundable: boolean | null
          sale_end_date: string
          sale_start_date: string
          sales_limit_per_day: number | null
          updated_at: string | null
        }
        Insert: {
          available_online?: boolean | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          event_date: string
          event_end_time?: string | null
          event_id: string
          event_start_time?: string | null
          gate_open_time?: string | null
          group_discount_available?: boolean | null
          id?: string
          is_early_bird?: boolean | null
          is_free?: boolean | null
          max_per_customer?: number | null
          name: string
          org_id: string
          price: number
          promo_code_required?: boolean | null
          quantity: number
          refundable?: boolean | null
          sale_end_date: string
          sale_start_date: string
          sales_limit_per_day?: number | null
          updated_at?: string | null
        }
        Update: {
          available_online?: boolean | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          event_date?: string
          event_end_time?: string | null
          event_id?: string
          event_start_time?: string | null
          gate_open_time?: string | null
          group_discount_available?: boolean | null
          id?: string
          is_early_bird?: boolean | null
          is_free?: boolean | null
          max_per_customer?: number | null
          name?: string
          org_id?: string
          price?: number
          promo_code_required?: boolean | null
          quantity?: number
          refundable?: boolean | null
          sale_end_date?: string
          sale_start_date?: string
          sales_limit_per_day?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_ticket_types_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_ticket_types_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_transaction_items: {
        Row: {
          created_at: string | null
          currency: string
          discount_amount: number | null
          id: string
          is_refundable: boolean | null
          item_type: string
          notes: string | null
          order_id: string
          promotion_code_used: string | null
          quantity: number
          tax_amount: number | null
          ticket_id: string
          total_price: number
          transaction_source: string
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string
          discount_amount?: number | null
          id?: string
          is_refundable?: boolean | null
          item_type?: string
          notes?: string | null
          order_id: string
          promotion_code_used?: string | null
          quantity: number
          tax_amount?: number | null
          ticket_id: string
          total_price: number
          transaction_source?: string
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          discount_amount?: number | null
          id?: string
          is_refundable?: boolean | null
          item_type?: string
          notes?: string | null
          order_id?: string
          promotion_code_used?: string | null
          quantity?: number
          tax_amount?: number | null
          ticket_id?: string
          total_price?: number
          transaction_source?: string
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_transaction_items_order_id_org_transactions_id_fk"
            columns: [ "order_id" ]
            isOneToOne: false
            referencedRelation: "org_transactions"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_transaction_items_ticket_id_org_event_tickets_id_fk"
            columns: [ "ticket_id" ]
            isOneToOne: false
            referencedRelation: "org_event_tickets"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_transactions: {
        Row: {
          application_fee_amount: number
          created_at: string | null
          currency: string | null
          customer_id: string
          description: string | null
          id: string
          invoice_id: string | null
          metadata: Json | null
          net_amount: number | null
          org_id: string
          payment_method: string | null
          refund_status: string | null
          related_entity_id: string | null
          status: string | null
          stripe_connect_account_id: string | null
          stripe_fee_amount: number
          stripe_payment_id: string | null
          stripe_transfer_amount: number | null
          stripe_transfer_id: string | null
          stripe_transfer_status: string | null
          total_amount: number
          transaction_type: string
          updated_at: string | null
        }
        Insert: {
          application_fee_amount?: number
          created_at?: string | null
          currency?: string | null
          customer_id: string
          description?: string | null
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          net_amount?: number | null
          org_id: string
          payment_method?: string | null
          refund_status?: string | null
          related_entity_id?: string | null
          status?: string | null
          stripe_connect_account_id?: string | null
          stripe_fee_amount: number
          stripe_payment_id?: string | null
          stripe_transfer_amount?: number | null
          stripe_transfer_id?: string | null
          stripe_transfer_status?: string | null
          total_amount: number
          transaction_type: string
          updated_at?: string | null
        }
        Update: {
          application_fee_amount?: number
          created_at?: string | null
          currency?: string | null
          customer_id?: string
          description?: string | null
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          net_amount?: number | null
          org_id?: string
          payment_method?: string | null
          refund_status?: string | null
          related_entity_id?: string | null
          status?: string | null
          stripe_connect_account_id?: string | null
          stripe_fee_amount?: number
          stripe_payment_id?: string | null
          stripe_transfer_amount?: number | null
          stripe_transfer_id?: string | null
          stripe_transfer_status?: string | null
          total_amount?: number
          transaction_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_transactions_customer_id_org_customers_id_fk"
            columns: [ "customer_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_transactions_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      org_vendors: {
        Row: {
          address: string | null
          business_name: string
          city: string | null
          contact_frequency: string | null
          contract_details: Json | null
          country: string | null
          created_at: string | null
          email: string
          email_group: string | null
          event_id: string | null
          id: string
          last_contacted: string | null
          name: string
          next_follow_up: string | null
          notes: string | null
          org_id: string
          phone: string | null
          profile_image_url: string | null
          state: string | null
          status: string | null
          tags: Json | null
          updated_at: string | null
          vendor_type: string | null
          website: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          city?: string | null
          contact_frequency?: string | null
          contract_details?: Json | null
          country?: string | null
          created_at?: string | null
          email: string
          email_group?: string | null
          event_id?: string | null
          id?: string
          last_contacted?: string | null
          name: string
          next_follow_up?: string | null
          notes?: string | null
          org_id: string
          phone?: string | null
          profile_image_url?: string | null
          state?: string | null
          status?: string | null
          tags?: Json | null
          updated_at?: string | null
          vendor_type?: string | null
          website?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          city?: string | null
          contact_frequency?: string | null
          contract_details?: Json | null
          country?: string | null
          created_at?: string | null
          email?: string
          email_group?: string | null
          event_id?: string | null
          id?: string
          last_contacted?: string | null
          name?: string
          next_follow_up?: string | null
          notes?: string | null
          org_id?: string
          phone?: string | null
          profile_image_url?: string | null
          state?: string | null
          status?: string | null
          tags?: Json | null
          updated_at?: string | null
          vendor_type?: string | null
          website?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_vendors_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "org_vendors_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          affiliated_organizations: Json | null
          annual_revenue: number | null
          city: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          founded_date: string | null
          id: string
          industry: string | null
          is_verified: boolean | null
          last_activity: string | null
          logo_url: string | null
          metadata: Json | null
          name: string
          number_of_employees: number | null
          org_type: string | null
          social_media_links: Json | null
          state: string | null
          status: string | null
          stripe_account_created: string | null
          stripe_account_id: string | null
          stripe_connect_linked: boolean | null
          subscription_status: string | null
          updated_at: string | null
          website: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          affiliated_organizations?: Json | null
          annual_revenue?: number | null
          city?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          founded_date?: string | null
          id?: string
          industry?: string | null
          is_verified?: boolean | null
          last_activity?: string | null
          logo_url?: string | null
          metadata?: Json | null
          name: string
          number_of_employees?: number | null
          org_type?: string | null
          social_media_links?: Json | null
          state?: string | null
          status?: string | null
          stripe_account_created?: string | null
          stripe_account_id?: string | null
          stripe_connect_linked?: boolean | null
          subscription_status?: string | null
          updated_at?: string | null
          website?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          affiliated_organizations?: Json | null
          annual_revenue?: number | null
          city?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          founded_date?: string | null
          id?: string
          industry?: string | null
          is_verified?: boolean | null
          last_activity?: string | null
          logo_url?: string | null
          metadata?: Json | null
          name?: string
          number_of_employees?: number | null
          org_type?: string | null
          social_media_links?: Json | null
          state?: string | null
          status?: string | null
          stripe_account_created?: string | null
          stripe_account_id?: string | null
          stripe_connect_linked?: boolean | null
          subscription_status?: string | null
          updated_at?: string | null
          website?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      participant_events: {
        Row: {
          created_at: string | null
          event_id: string
          event_role: string | null
          id: string
          participant_id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          event_id: string
          event_role?: string | null
          id?: string
          participant_id: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          event_role?: string | null
          id?: string
          participant_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_events_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "participant_events_participant_id_org_performers_id_fk"
            columns: [ "participant_id" ]
            isOneToOne: false
            referencedRelation: "org_performers"
            referencedColumns: [ "id" ]
          },
        ]
      }
      participants: {
        Row: {
          created_at: string
          email: string
          id: string
          participant_name: string
          participant_role: string
          phone: string | null
          preferred_method_of_contact: string | null
          profile_pic_url: string | null
          signup_sheet_id: string
          time_zone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          participant_name: string
          participant_role?: string
          phone?: string | null
          preferred_method_of_contact?: string | null
          profile_pic_url?: string | null
          signup_sheet_id: string
          time_zone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          participant_name?: string
          participant_role?: string
          phone?: string | null
          preferred_method_of_contact?: string | null
          profile_pic_url?: string | null
          signup_sheet_id?: string
          time_zone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "participants_signup_sheet_id_signup_sheets_id_fk"
            columns: [ "signup_sheet_id" ]
            isOneToOne: false
            referencedRelation: "signup_sheets"
            referencedColumns: [ "id" ]
          },
        ]
      }
      payments_invoices: {
        Row: {
          amount: number
          contact_id: string
          contact_type: string
          created_at: string | null
          currency: string | null
          due_date: string | null
          event_id: string | null
          id: string
          invoice_number: string
          notes: string | null
          org_id: string
          paid_date: string | null
          payment_status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          contact_id: string
          contact_type: string
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          event_id?: string | null
          id?: string
          invoice_number: string
          notes?: string | null
          org_id: string
          paid_date?: string | null
          payment_status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          contact_id?: string
          contact_type?: string
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          event_id?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          org_id?: string
          paid_date?: string | null
          payment_status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoices_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "payments_invoices_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      performers: {
        Row: {
          contract_details: Json | null
          created_at: string | null
          email: string
          event_id: string
          genre: string | null
          id: string
          name: string
          notes: string | null
          org_id: string
          performance_time: string | null
          phone: string | null
          requirements: string | null
          social_links: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          contract_details?: Json | null
          created_at?: string | null
          email: string
          event_id: string
          genre?: string | null
          id?: string
          name: string
          notes?: string | null
          org_id: string
          performance_time?: string | null
          phone?: string | null
          requirements?: string | null
          social_links?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          contract_details?: Json | null
          created_at?: string | null
          email?: string
          event_id?: string
          genre?: string | null
          id?: string
          name?: string
          notes?: string | null
          org_id?: string
          performance_time?: string | null
          phone?: string | null
          requirements?: string | null
          social_links?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performers_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "performers_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      recurring_event_instances: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          occurrence_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          occurrence_date: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          occurrence_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recurring_event_instances_event_id_calendar_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "calendar_events"
            referencedColumns: [ "id" ]
          },
        ]
      }
      sales_pipelines: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          org_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          org_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          org_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_pipelines_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      sales_stages: {
        Row: {
          created_at: string | null
          id: string
          pipeline_id: string
          probability: number | null
          stage_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          pipeline_id: string
          probability?: number | null
          stage_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pipeline_id?: string
          probability?: number | null
          stage_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_stages_pipeline_id_sales_pipelines_id_fk"
            columns: [ "pipeline_id" ]
            isOneToOne: false
            referencedRelation: "sales_pipelines"
            referencedColumns: [ "id" ]
          },
        ]
      }
      signup_sheet_custom_questions: {
        Row: {
          created_at: string
          field_type: string
          id: string
          is_required: boolean
          options: Json | null
          order: number
          question_text: string
          signup_sheet_id: string
          updated_at: string
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string
          field_type: string
          id?: string
          is_required?: boolean
          options?: Json | null
          order?: number
          question_text: string
          signup_sheet_id: string
          updated_at?: string
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string
          field_type?: string
          id?: string
          is_required?: boolean
          options?: Json | null
          order?: number
          question_text?: string
          signup_sheet_id?: string
          updated_at?: string
          validation_rules?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "signup_sheet_custom_questions_signup_sheet_id_signup_sheets_id_"
            columns: [ "signup_sheet_id" ]
            isOneToOne: false
            referencedRelation: "signup_sheets"
            referencedColumns: [ "id" ]
          },
        ]
      }
      signup_sheet_groups: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          org_id: string
          settings: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          org_id: string
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          org_id?: string
          settings?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "signup_sheet_groups_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      signup_sheet_responses: {
        Row: {
          created_at: string
          id: string
          last_updated_by: string | null
          participant_id: string | null
          preferred_contact_method: string | null
          responder_email: string | null
          responder_name: string | null
          response_data: Json | null
          signup_sheet_id: string
          slot_id: string
          updated_at: string
          waitlist_status: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          last_updated_by?: string | null
          participant_id?: string | null
          preferred_contact_method?: string | null
          responder_email?: string | null
          responder_name?: string | null
          response_data?: Json | null
          signup_sheet_id: string
          slot_id: string
          updated_at?: string
          waitlist_status?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          last_updated_by?: string | null
          participant_id?: string | null
          preferred_contact_method?: string | null
          responder_email?: string | null
          responder_name?: string | null
          response_data?: Json | null
          signup_sheet_id?: string
          slot_id?: string
          updated_at?: string
          waitlist_status?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "signup_sheet_responses_last_updated_by_user_profiles_id_fk"
            columns: [ "last_updated_by" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "signup_sheet_responses_participant_id_participants_id_fk"
            columns: [ "participant_id" ]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "signup_sheet_responses_signup_sheet_id_signup_sheets_id_fk"
            columns: [ "signup_sheet_id" ]
            isOneToOne: false
            referencedRelation: "signup_sheets"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "signup_sheet_responses_slot_id_signup_sheet_slots_id_fk"
            columns: [ "slot_id" ]
            isOneToOne: false
            referencedRelation: "signup_sheet_slots"
            referencedColumns: [ "id" ]
          },
        ]
      }
      signup_sheet_slots: {
        Row: {
          collect_money: boolean
          created_at: string
          currency: string | null
          description: string | null
          end_timestamp: string | null
          filled_quantity: number
          group_id: string | null
          hide_number_wanted: boolean
          id: string
          price: number | null
          quantity: number
          signup_sheet_id: string
          start_timestamp: string | null
          title: string
          updated_at: string
          waitlist_capacity: number
        }
        Insert: {
          collect_money?: boolean
          created_at?: string
          currency?: string | null
          description?: string | null
          end_timestamp?: string | null
          filled_quantity?: number
          group_id?: string | null
          hide_number_wanted?: boolean
          id?: string
          price?: number | null
          quantity?: number
          signup_sheet_id: string
          start_timestamp?: string | null
          title: string
          updated_at?: string
          waitlist_capacity?: number
        }
        Update: {
          collect_money?: boolean
          created_at?: string
          currency?: string | null
          description?: string | null
          end_timestamp?: string | null
          filled_quantity?: number
          group_id?: string | null
          hide_number_wanted?: boolean
          id?: string
          price?: number | null
          quantity?: number
          signup_sheet_id?: string
          start_timestamp?: string | null
          title?: string
          updated_at?: string
          waitlist_capacity?: number
        }
        Relationships: [
          {
            foreignKeyName: "signup_sheet_slots_group_id_signup_sheet_groups_id_fk"
            columns: [ "group_id" ]
            isOneToOne: false
            referencedRelation: "signup_sheet_groups"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "signup_sheet_slots_signup_sheet_id_signup_sheets_id_fk"
            columns: [ "signup_sheet_id" ]
            isOneToOne: false
            referencedRelation: "signup_sheets"
            referencedColumns: [ "id" ]
          },
        ]
      }
      signup_sheets: {
        Row: {
          attachment_urls: Json | null
          created_at: string
          creator_id: string
          description: string | null
          end_date: string | null
          event_id: string | null
          group_id: string | null
          id: string
          is_archived: boolean
          is_published: boolean
          org_id: string
          slug: string
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          attachment_urls?: Json | null
          created_at?: string
          creator_id: string
          description?: string | null
          end_date?: string | null
          event_id?: string | null
          group_id?: string | null
          id?: string
          is_archived?: boolean
          is_published?: boolean
          org_id: string
          slug: string
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          attachment_urls?: Json | null
          created_at?: string
          creator_id?: string
          description?: string | null
          end_date?: string | null
          event_id?: string | null
          group_id?: string | null
          id?: string
          is_archived?: boolean
          is_published?: boolean
          org_id?: string
          slug?: string
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "signup_sheets_creator_id_user_profiles_id_fk"
            columns: [ "creator_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "signup_sheets_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "signup_sheets_group_id_signup_sheet_groups_id_fk"
            columns: [ "group_id" ]
            isOneToOne: false
            referencedRelation: "signup_sheet_groups"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "signup_sheets_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      sponsors: {
        Row: {
          benefits: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contract_details: Json | null
          contribution: number | null
          created_at: string | null
          event_id: string
          id: string
          name: string
          notes: string | null
          org_id: string
          sponsorship_level: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          benefits?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_details?: Json | null
          contribution?: number | null
          created_at?: string | null
          event_id: string
          id?: string
          name: string
          notes?: string | null
          org_id: string
          sponsorship_level?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          benefits?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_details?: Json | null
          contribution?: number | null
          created_at?: string | null
          event_id?: string
          id?: string
          name?: string
          notes?: string | null
          org_id?: string
          sponsorship_level?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "sponsors_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      stripe_connect_onboarding: {
        Row: {
          created_at: string | null
          id: string
          onboarding_completed_at: string | null
          onboarding_started_at: string | null
          onboarding_status: string
          onboarding_url: string | null
          stripe_account_id: string
          updated_at: string | null
          user_profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          onboarding_completed_at?: string | null
          onboarding_started_at?: string | null
          onboarding_status: string
          onboarding_url?: string | null
          stripe_account_id: string
          updated_at?: string | null
          user_profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          onboarding_completed_at?: string | null
          onboarding_started_at?: string | null
          onboarding_status?: string
          onboarding_url?: string | null
          stripe_account_id?: string
          updated_at?: string | null
          user_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_connect_onboarding_user_profile_id_user_profiles_id_fk"
            columns: [ "user_profile_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      stripe_connect_payouts: {
        Row: {
          amount: number
          arrival_date: string | null
          created_at: string | null
          currency: string
          id: string
          payout_method: string
          status: string
          stripe_payout_id: string
          updated_at: string | null
          user_profile_id: string
        }
        Insert: {
          amount: number
          arrival_date?: string | null
          created_at?: string | null
          currency: string
          id?: string
          payout_method: string
          status: string
          stripe_payout_id: string
          updated_at?: string | null
          user_profile_id: string
        }
        Update: {
          amount?: number
          arrival_date?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          payout_method?: string
          status?: string
          stripe_payout_id?: string
          updated_at?: string | null
          user_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_connect_payouts_user_profile_id_user_profiles_id_fk"
            columns: [ "user_profile_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      subscription_products: {
        Row: {
          billing_interval: string
          created_at: string | null
          description: string | null
          feature_set: Json | null
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          price: number
          promotion_details: Json | null
          sales_count: number | null
          stripe_price_id: string
          stripe_product_id: string
          target_audience: string | null
          trial_period_days: number | null
          updated_at: string | null
        }
        Insert: {
          billing_interval: string
          created_at?: string | null
          description?: string | null
          feature_set?: Json | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          price: number
          promotion_details?: Json | null
          sales_count?: number | null
          stripe_price_id: string
          stripe_product_id: string
          target_audience?: string | null
          trial_period_days?: number | null
          updated_at?: string | null
        }
        Update: {
          billing_interval?: string
          created_at?: string | null
          description?: string | null
          feature_set?: Json | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          price?: number
          promotion_details?: Json | null
          sales_count?: number | null
          stripe_price_id?: string
          stripe_product_id?: string
          target_audience?: string | null
          trial_period_days?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          billing_interval: string
          cancel_at_period_end: boolean | null
          cancellation_date: string | null
          created_at: string | null
          id: string
          is_stripe_connect_account: boolean | null
          last_payment_date: string | null
          next_billing_date: string | null
          notes: string | null
          org_id: string
          product_id: string
          renewal_count: number | null
          revenue_generated: number | null
          stripe_customer_id: string
          stripe_subscription_id: string
          subscription_end_date: string | null
          subscription_start_date: string
          subscription_status: string
          trial_end_date: string | null
          updated_at: string | null
          user_profile_id: string
        }
        Insert: {
          billing_interval: string
          cancel_at_period_end?: boolean | null
          cancellation_date?: string | null
          created_at?: string | null
          id?: string
          is_stripe_connect_account?: boolean | null
          last_payment_date?: string | null
          next_billing_date?: string | null
          notes?: string | null
          org_id: string
          product_id: string
          renewal_count?: number | null
          revenue_generated?: number | null
          stripe_customer_id: string
          stripe_subscription_id: string
          subscription_end_date?: string | null
          subscription_start_date: string
          subscription_status: string
          trial_end_date?: string | null
          updated_at?: string | null
          user_profile_id: string
        }
        Update: {
          billing_interval?: string
          cancel_at_period_end?: boolean | null
          cancellation_date?: string | null
          created_at?: string | null
          id?: string
          is_stripe_connect_account?: boolean | null
          last_payment_date?: string | null
          next_billing_date?: string | null
          notes?: string | null
          org_id?: string
          product_id?: string
          renewal_count?: number | null
          revenue_generated?: number | null
          stripe_customer_id?: string
          stripe_subscription_id?: string
          subscription_end_date?: string | null
          subscription_start_date?: string
          subscription_status?: string
          trial_end_date?: string | null
          updated_at?: string | null
          user_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "subscriptions_product_id_subscription_products_id_fk"
            columns: [ "product_id" ]
            isOneToOne: false
            referencedRelation: "subscription_products"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "subscriptions_user_profile_id_user_profiles_id_fk"
            columns: [ "user_profile_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string
          created_at: string | null
          description: string | null
          due_date: string | null
          event_id: string | null
          id: string
          org_id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to: string
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          event_id?: string | null
          id?: string
          org_id: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          event_id?: string | null
          id?: string
          org_id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "tasks_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      ticket_analytics: {
        Row: {
          clicks: number | null
          created_at: string | null
          id: string
          purchases: number | null
          ticket_page_id: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          purchases?: number | null
          ticket_page_id: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          purchases?: number | null
          ticket_page_id?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_analytics_ticket_page_id_ticket_pages_id_fk"
            columns: [ "ticket_page_id" ]
            isOneToOne: false
            referencedRelation: "ticket_pages"
            referencedColumns: [ "id" ]
          },
        ]
      }
      ticket_buyer_profiles: {
        Row: {
          bio: string | null
          contact_number: string | null
          created_at: string | null
          favorite_event_id: string | null
          favorite_performer_id: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          metadata: Json | null
          notes: string | null
          preferences: Json | null
          profile_image_url: string | null
          social_links: Json | null
          stripe_customer_id: string | null
          stripe_default_currency: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          contact_number?: string | null
          created_at?: string | null
          favorite_event_id?: string | null
          favorite_performer_id?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          metadata?: Json | null
          notes?: string | null
          preferences?: Json | null
          profile_image_url?: string | null
          social_links?: Json | null
          stripe_customer_id?: string | null
          stripe_default_currency?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          contact_number?: string | null
          created_at?: string | null
          favorite_event_id?: string | null
          favorite_performer_id?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          metadata?: Json | null
          notes?: string | null
          preferences?: Json | null
          profile_image_url?: string | null
          social_links?: Json | null
          stripe_customer_id?: string | null
          stripe_default_currency?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_buyer_profiles_favorite_event_id_events_id_fk"
            columns: [ "favorite_event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "ticket_buyer_profiles_favorite_performer_id_org_performers_id_f"
            columns: [ "favorite_performer_id" ]
            isOneToOne: false
            referencedRelation: "org_performers"
            referencedColumns: [ "id" ]
          },
        ]
      }
      ticket_pages: {
        Row: {
          average_time_on_page: number | null
          bounce_rate: number | null
          conversion_rate: number | null
          created_at: string | null
          description: string | null
          device_type: string | null
          entry_page: boolean | null
          event_id: string
          exit_page: boolean | null
          id: string
          org_id: string
          page_title: string
          referral_source: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          average_time_on_page?: number | null
          bounce_rate?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          description?: string | null
          device_type?: string | null
          entry_page?: boolean | null
          event_id: string
          exit_page?: boolean | null
          id?: string
          org_id: string
          page_title: string
          referral_source?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          average_time_on_page?: number | null
          bounce_rate?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          description?: string | null
          device_type?: string | null
          entry_page?: boolean | null
          event_id?: string
          exit_page?: boolean | null
          id?: string
          org_id?: string
          page_title?: string
          referral_source?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_pages_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "ticket_pages_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      user_event_reminders: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          is_sent: boolean | null
          reminder_method: string | null
          reminder_time: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          is_sent?: boolean | null
          reminder_method?: string | null
          reminder_time: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          is_sent?: boolean | null
          reminder_method?: string | null
          reminder_time?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_event_reminders_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "user_event_reminders_user_id_user_profiles_id_fk"
            columns: [ "user_id" ]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: [ "id" ]
          },
        ]
      }
      user_profiles: {
        Row: {
          bio: string | null
          contact_number: string | null
          created_at: string | null
          department: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          org_id: string
          organization_name: string
          permissions: Json | null
          preferences: Json | null
          profile_image_url: string | null
          role: string
          social_links: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          contact_number?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          org_id: string
          organization_name: string
          permissions?: Json | null
          preferences?: Json | null
          profile_image_url?: string | null
          role?: string
          social_links?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          contact_number?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          org_id?: string
          organization_name?: string
          permissions?: Json | null
          preferences?: Json | null
          profile_image_url?: string | null
          role?: string
          social_links?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      vendors: {
        Row: {
          booth_location: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contract_details: Json | null
          created_at: string | null
          event_id: string
          id: string
          name: string
          notes: string | null
          org_id: string
          payment_status: string | null
          products_or_services: string | null
          status: string | null
          updated_at: string | null
          vendor_type: string
        }
        Insert: {
          booth_location?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_details?: Json | null
          created_at?: string | null
          event_id: string
          id?: string
          name: string
          notes?: string | null
          org_id: string
          payment_status?: string | null
          products_or_services?: string | null
          status?: string | null
          updated_at?: string | null
          vendor_type: string
        }
        Update: {
          booth_location?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_details?: Json | null
          created_at?: string | null
          event_id?: string
          id?: string
          name?: string
          notes?: string | null
          org_id?: string
          payment_status?: string | null
          products_or_services?: string | null
          status?: string | null
          updated_at?: string | null
          vendor_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendors_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "vendors_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
      visitor_schedules: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          org_id: string
          session_id: string | null
          updated_at: string | null
          visitor_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          org_id: string
          session_id?: string | null
          updated_at?: string | null
          visitor_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          org_id?: string
          session_id?: string | null
          updated_at?: string | null
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visitor_schedules_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "visitor_schedules_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "visitor_schedules_session_id_event_sessions_id_fk"
            columns: [ "session_id" ]
            isOneToOne: false
            referencedRelation: "event_sessions"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "visitor_schedules_visitor_id_org_customers_id_fk"
            columns: [ "visitor_id" ]
            isOneToOne: false
            referencedRelation: "org_customers"
            referencedColumns: [ "id" ]
          },
        ]
      }
      volunteers: {
        Row: {
          availability: string | null
          created_at: string | null
          email: string
          emergency_contact: string | null
          event_id: string
          id: string
          name: string
          notes: string | null
          org_id: string
          phone: string | null
          role: string
          shift: string | null
          status: string | null
          tshirt_size: string | null
          updated_at: string | null
          waiver_signed: boolean | null
        }
        Insert: {
          availability?: string | null
          created_at?: string | null
          email: string
          emergency_contact?: string | null
          event_id: string
          id?: string
          name: string
          notes?: string | null
          org_id: string
          phone?: string | null
          role: string
          shift?: string | null
          status?: string | null
          tshirt_size?: string | null
          updated_at?: string | null
          waiver_signed?: boolean | null
        }
        Update: {
          availability?: string | null
          created_at?: string | null
          email?: string
          emergency_contact?: string | null
          event_id?: string
          id?: string
          name?: string
          notes?: string | null
          org_id?: string
          phone?: string | null
          role?: string
          shift?: string | null
          status?: string | null
          tshirt_size?: string | null
          updated_at?: string | null
          waiver_signed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteers_event_id_events_id_fk"
            columns: [ "event_id" ]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: [ "id" ]
          },
          {
            foreignKeyName: "volunteers_org_id_organizations_id_fk"
            columns: [ "org_id" ]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: [ "id" ]
          },
        ]
      }
    }
    Views: {
      [ _ in never ]: never
    }
    Functions: {
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
      custom_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      custom_claims_hook: {
        Args: {
          claims: Json
          user_org_id: string
          user_role: string
        }
        Returns: Json
      }
    }
    Enums: {
      [ _ in never ]: never
    }
    CompositeTypes: {
      [ _ in never ]: never
    }
  }
}

type PublicSchema = Database[ Extract<keyof Database, "public"> ]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof ( PublicSchema[ "Tables" ] & PublicSchema[ "Views" ] )
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof ( Database[ PublicTableNameOrOptions[ "schema" ] ][ "Tables" ] &
    Database[ PublicTableNameOrOptions[ "schema" ] ][ "Views" ] )
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? ( Database[ PublicTableNameOrOptions[ "schema" ] ][ "Tables" ] &
    Database[ PublicTableNameOrOptions[ "schema" ] ][ "Views" ] )[ TableName ] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof ( PublicSchema[ "Tables" ] &
    PublicSchema[ "Views" ] )
  ? ( PublicSchema[ "Tables" ] &
    PublicSchema[ "Views" ] )[ PublicTableNameOrOptions ] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema[ "Tables" ]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[ PublicTableNameOrOptions[ "schema" ] ][ "Tables" ]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[ PublicTableNameOrOptions[ "schema" ] ][ "Tables" ][ TableName ] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema[ "Tables" ]
  ? PublicSchema[ "Tables" ][ PublicTableNameOrOptions ] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema[ "Tables" ]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[ PublicTableNameOrOptions[ "schema" ] ][ "Tables" ]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[ PublicTableNameOrOptions[ "schema" ] ][ "Tables" ][ TableName ] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema[ "Tables" ]
  ? PublicSchema[ "Tables" ][ PublicTableNameOrOptions ] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema[ "Enums" ]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[ PublicEnumNameOrOptions[ "schema" ] ][ "Enums" ]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[ PublicEnumNameOrOptions[ "schema" ] ][ "Enums" ][ EnumName ]
  : PublicEnumNameOrOptions extends keyof PublicSchema[ "Enums" ]
  ? PublicSchema[ "Enums" ][ PublicEnumNameOrOptions ]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof PublicSchema[ "CompositeTypes" ]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[ PublicCompositeTypeNameOrOptions[ "schema" ] ][ "CompositeTypes" ]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[ PublicCompositeTypeNameOrOptions[ "schema" ] ][ "CompositeTypes" ][ CompositeTypeName ]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema[ "CompositeTypes" ]
  ? PublicSchema[ "CompositeTypes" ][ PublicCompositeTypeNameOrOptions ]
  : never
